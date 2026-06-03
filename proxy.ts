import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const justSignedUp = request.cookies.get("just_signed_up")?.value;
  const guestToken = request.cookies.get("guest_token")?.value;
  const { pathname } = request.nextUrl;

  const isLoggedIn = Boolean(token);
  const isGuest = Boolean(guestToken);
  const authRoutes = ["/login", "/signup"];
  const protectedRoutes = ["/dashboard", "/tasks", "/pomodoro"];

  if (isLoggedIn && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isLoggedIn && !isGuest && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/signup/success") {
    if (!justSignedUp) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = NextResponse.next();
    response.cookies.delete("just_signed_up");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
