import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface Session {
  id?: number;
  token?: string;
}

interface CookieOptions {
  sameSite?: boolean;
  secure?: boolean;
  httpOnly?: boolean;
  maxAge?: number;
}

export default async function getSession(options?: CookieOptions) {
  return await getIronSession<Session>(cookies(), {
    cookieName: "delicious-carrot",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production", // HTTPS
      maxAge: 60 * 60 * 24 * 1, // 1일 (단위: 초)
      httpOnly: true, // 클라이언트에서 쿠키 접근을 차단
      sameSite: "strict", // CSRF 보호
    },
  });
}
