import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const plants = [
  "Montebello",
  "Campoalegre",
  "Km18",
  "Pichindé",
  "Las Palmas",
  "La Luisa",
  "Buitrera - Soledad",
  "Buitrera - Carbonero",
  "La Sirena",
  "La Fonda",
  "La Vorágine",
  "Cascajal",
  "La Elvira",        // planta #13 (ajusta nombre si corresponde)
];

async function main() {
  for (const name of plants) {
    await prisma.plant.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log("✅ Plantas sembradas");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
