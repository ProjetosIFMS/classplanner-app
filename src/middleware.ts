import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/auth/callback") {
    try {
      const access_token = request.nextUrl.searchParams.get("access_token");

      if (!access_token) {
        throw new Error("Access token not found");
      }

      const response = NextResponse.redirect(
        new URL("/dashboard-professor", request.url),
      );

      response.cookies.set("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      return response;
    } catch (error) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.headers.set(
        "X-Error-Message",
        encodeURIComponent(String(error)),
      );
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/auth/callback",
};
