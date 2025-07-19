'use client';                       // 👈 requerido: es un componente de cliente
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function MainNav() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex gap-4 items-center">
      <Link href="/dashboard">Dashboard</Link>

      {/* Sólo admins ven este enlace */}
      {session?.user.role === 'ADMIN' && (
        <Link href="/admin/dashboard">Admin</Link>
      )}

      {/* Placeholder de estado de carga (opcional) */}
      {status === 'loading' && <span className="text-sm opacity-60">…</span>}
    </nav>
  );
}
