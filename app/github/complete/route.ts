import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    notFound();
  }

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID || "client_id",
    client_secret: process.env.GITHUB_CLIENT_SECRET || "client_secret",
    code,
  });

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams.toString()}`;

  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const { error, access_token } = await accessTokenResponse.json();

  if (error) {
    return NextResponse.json(null, { status: 400 });
  }

  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      cache: "no-cache",
    },
  });

  const { id, avatar_url, login } = await userProfileResponse.json();

  const user = await db.user.findUnique({
    where: {
      github_id: `${id}`,
    },
    select: {
      id: true,
    },
  });

  if (user) {
    const session = await getSession();
    session.id = user.id;
    session.token = "token";
    await session.save();
    return redirect("/profile");
  }

  const newUser = await db.user.create({
    data: {
      username: `${id}_${login}`,
      github_id: `${id}`,
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.id = newUser.id;
  session.token = "token";
  await session.save();
  return redirect("/profile");
}
