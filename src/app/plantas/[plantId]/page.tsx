// src/app/plantas/[plantId]/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface Props {
  params: {
    plantId: string;
  };
}

export default async function PlantDetail({ params }: Props) {
  // 1. Extraemos plantId de params
  const { plantId } = params;

  // 2. Hacemos la consulta a la base de datos
  const plant = await prisma.plant.findUnique({
    where: { id: plantId },
  });

  // 3. Si no existe, mostramos mensaje
  if (!plant) {
    return (
      <div className="p-4">
        <p className="text-red-600">🚫 Planta no encontrada</p>
        <Link href="/plantas" className="underline text-blue-600">
          Volver al listado
        </Link>
      </div>
    );
  }

  // 4. Renderizamos detalle
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{plant.name}</h1>
      <p className="mt-2 text-sm text-gray-600">
        ID: <code>{plant.id}</code>
      </p>
      <p className="mt-4">Aquí podrás ver los sensores, controles y reportes históricos de esta planta...</p>
      <Link href="/plantas" className="mt-6 inline-block underline text-blue-600">
        ← Volver al listado de plantas
      </Link>
    </div>
  );
}
