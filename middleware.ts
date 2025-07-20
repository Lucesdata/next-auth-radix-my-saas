import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  // Público o estático
  if (pathname.startsWith("/api") || pathname === "/") {
    return NextResponse.next();
  }

  // Sin sesión → login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ADMIN (global)
  if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // OPERARIO
  if (pathname.startsWith("/operario") && token.role !== "OPERARIO") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // PRESIDENTE_JAA
  if (pathname.startsWith("/presidente") && token.role !== "PRESIDENTE_JAA") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // USUARIO
  if (pathname.startsWith("/usuario") && token.role !== "USUARIO") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Autorizado
  return NextResponse.next();
}

// Rutas protegidas
export const config = {
  matcher: [
    "/admin/:path*",
    "/operario/:path*",
    "/presidente/:path*",
    "/usuario/:path*",
  ],
};
