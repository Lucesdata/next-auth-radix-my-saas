import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const plants = await prisma.plant.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
  console.log("🌱 Plantas registradas:");
  plants.forEach((p) => console.log(`${p.name}: ${p.id}`));
}
main().finally(() => prisma.$disconnect());
