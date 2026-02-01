import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();

}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};