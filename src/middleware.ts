import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { setSession } from "./lib/setSession";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  if (request.nextUrl.pathname === "/auth/callback") {
    try {
      const access_token = request.nextUrl.searchParams.get("access_token");

      if (!access_token) {
        throw new Error("Access token not found");
      }

      const response = NextResponse.redirect(
        new URL("/professor/dashboard", request.url),
      );

      setSession(response, access_token);

      return response;
    } catch (error) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url),
      );
      response.headers.set(
        "X-Error-Message",
        encodeURIComponent(String(error)),
      );
      return response;
    }
  }

  if (pathname.startsWith("/auth/login")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)"],
};
