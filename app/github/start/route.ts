import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID || "client_id",
    scope: "read:user,user:email",
    allow_signup: "true",
  };

  const formattedParams = new URLSearchParams(params);

  const finalUrl = `${baseUrl}?${formattedParams.toString()}`;
  return Response.redirect(finalUrl);
}
