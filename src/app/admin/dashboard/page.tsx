// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  // Sesión del lado servidor
  const session = await getServerSession(authOptions);

  // Si no es admin → fuera
  if (session?.user.role !== "ADMIN") {
    redirect("/"); // o "/403" si creas una página de no‑autorizado
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Panel de administración</h1>
      <p>Bienvenido, {session?.user.name ?? "admin"}.</p>
      {/* Aquí irán tus métricas, tablas, etc. */}
    </div>
  );
}
