export const metadata = {
  title: "🚫 No autorizado",
};

export default function UnauthorizedPage() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🚫 Acceso denegado</h1>
      <p>No tienes permisos para ver esta página.</p>
      <a href="/" style={{ color: "#0070f3" }}>Volver al inicio</a>
    </main>
  );
}
