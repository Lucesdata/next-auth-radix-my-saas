import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define qué roles pueden acceder a cada segmento de ruta
const ROLE_PERMISSIONS: Record<string, string[]> = {
  "/operario":   ["OPERARIO", "ADMIN"],
  "/presidente": ["PRESIDENTE_JAA", "ADMIN"],
  "/admin":      ["ADMIN"],
  "/usuario":    ["USUARIO", "ADMIN"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas públicas (saltamos protección)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Intenta extraer JWT de sesión
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Si no hay sesión → redirige a login
  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Comprueba si la ruta pertenece a un segmento protegido por rol
  const protectedSegment = Object.keys(ROLE_PERMISSIONS).find((seg) =>
    pathname.startsWith(seg)
  );

  // Si la ruta está en ROLE_PERMISSIONS, valida el rol
  if (protectedSegment) {
    const allowed = ROLE_PERMISSIONS[protectedSegment];
    const userRole = (token as any).role as string;
    if (!allowed.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Si pasó todos los filtros, continúa
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/operario/:path*",
    "/presidente/:path*",
    "/admin/:path*",
    "/usuario/:path*",
    "/plantas/:path*",
  ],
};
