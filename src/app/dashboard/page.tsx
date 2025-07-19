import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Hola, {session?.user.email ?? "visitante"}.</p>
    </div>
  );
}
