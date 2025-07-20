// src/app/operario/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OperarioDashboard() {
  const session = await getServerSession(authOptions);

  // solo OPERARIO entra aquí
  if (session?.user.role !== "OPERARIO") {
    redirect("/");          // o redirect("/403") si creas esa página
  }

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-4">Panel del Operario</h1>
      <p>Bienvenido, {session?.user.name ?? "operario"}.</p>

      {/* Aquí irán alertas, lecturas, gráficas de la planta, etc. */}
    </section>
  );
}
