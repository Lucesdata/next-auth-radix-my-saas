import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Encuentra una planta existente (puedes cambiar el ID o buscar por nombre)
  const plant = await prisma.plant.findFirst({ where: { name: "Campoalegre" } });

  if (!plant) {
    console.error("❌ Planta no encontrada. Asegúrate de que existan plantas en la DB.");
    return;
  }

  await prisma.reading.createMany({
    data: [
      {
        plantId: plant.id,
        timestamp: new Date(),
        turbidity: 1.5,
        chlorine: 0.6,
        ph: 7.2,
        flowIn: 8.1,
        flowOut: 7.8,
        tankLevel: 3.2,
      },
      {
        plantId: plant.id,
        timestamp: new Date(Date.now() - 3600_000), // hace 1 hora
        turbidity: 1.7,
        chlorine: 0.5,
        ph: 7.0,
        flowIn: 8.0,
        flowOut: 7.9,
        tankLevel: 3.1,
      },
    ],
  });

  console.log("✅ Lecturas insertadas correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
