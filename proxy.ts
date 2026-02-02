import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicRoutes = ["/login",
    "/register",
    "/api/auth",
    "/favicon.ico",
    "/_next"];

  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  const session = await auth();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }
  if (!session) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", req.url)
    return NextResponse.redirect(loginUrl)
  }

  const role = session.user?.role
  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }
  if (pathname.startsWith("/delivery") && role !== "deliveryBoy") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }


  return NextResponse.next();

}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};