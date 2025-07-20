"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

type Item = {
  href: string;
  label: string;
};

export default function MainNav() {
  const { data: session } = useSession();
  const role = session?.user?.role;               // "USUARIO" | "OPERARIO" | ...

  // items comunes a todos
  const base: Item[] = [{ href: "/", label: "Home" }];

  // items según rol
  let roleItems: Item[] = [];
  switch (role) {
    case "ADMIN":
      roleItems = [{ href: "/admin/dashboard", label: "Admin" }];
      break;
    case "OPERARIO":
      roleItems = [{ href: "/operario/dashboard", label: "Operario" }];
      break;
    case "PRESIDENTE_JAA":
      roleItems = [{ href: "/presidente/dashboard", label: "Presidente JAA" }];
      break;
    case "USUARIO":
      roleItems = [{ href: "/usuario/dashboard", label: "Mi Planta" }];
      break;
  }

  const items = [...base, ...roleItems];

  return (
    <nav className="flex gap-4 p-4">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="text-blue-600 underline">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
