// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const role = session?.user?.role;

  return (
    <nav className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
      <div className="space-x-4">
        <Link href="/">Home</Link>

        {session && (
          <>
            {(role === "ADMIN" || role === "OPERARIO") && (
              <Link href="/operario">Operario</Link>
            )}
            {(role === "ADMIN" || role === "PRESIDENTE_JAA") && (
              <Link href="/presidente">Presidente</Link>
            )}
            {role === "ADMIN" && (
              <Link href="/admin">Admin</Link>
            )}
            {(role === "ADMIN" || role === "USUARIO") && (
              <Link href="/usuario">Usuario</Link>
            )}
            <Link href="/plantas">Plantas</Link>
          </>
        )}
      </div>

      <div className="space-x-4">
        {session ? (
          <>
            <span>Hola, {session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="text-sm text-red-600 hover:underline"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link href="/auth/login">Iniciar sesión</Link>
        )}
      </div>
    </nav>
  );
}
