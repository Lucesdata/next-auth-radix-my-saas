// src/app/presidente/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PresidenteDashboard() {
  const session = await getServerSession(authOptions);

  // Sólo PRESIDENTE_JAA entra
  if (session?.user.role !== "PRESIDENTE_JAA") {
    redirect("/");             // o redirect("/403") cuando la crees
  }

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-4">Panel Presidente JAA</h1>
      <p>Bienvenido, {session?.user.name ?? "presidente"}.</p>

      {/* Aquí irán reportes globales, estado de todas las plantas, etc. */}
    </section>
  );
}
