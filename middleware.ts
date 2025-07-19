import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Lee el JWT generado por NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1) Rutas públicas o estáticas → deja pasar
  if (pathname.startsWith("/api") || pathname === "/") {
    return NextResponse.next();
  }

  // 2) Si no hay sesión → redirige a login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 3) Si hay sesión pero NO es admin y pide /admin → redirige a home
  if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 4) Caso feliz → continúa
  return NextResponse.next();
}

// El matcher indica a qué rutas se aplica el middleware
export const config = {
  matcher: ["/admin/:path*"],
};
