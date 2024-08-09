import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
  "/sms": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/products", request.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/((?!github|api|_next/static|_next/image|favicon.ico).*)"],
  //   missing: [
  //     { type: "header", key: "nxt-router-prefetch" },
  //     { type: "header", key: "purpose", value: "prefetch" },
  //   ],
};
