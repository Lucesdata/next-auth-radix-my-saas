import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Lista sin duplicados y en un orden legible
const plants = [
  "Montebello",
  "Campoalegre",
  "Km18",
  "Pichindé",
  "Las Palmas",
  "La Luisa",
  "Soledad",
  "Carbonero",
  "La Sirena",
  "La Fonda",
  "La Vorágine",
  "Cascajal",
  "La Elvira",       // planta #13
];

async function main() {
  for (const name of plants) {
    await prisma.plant.upsert({
      where:  { name },
      update: {},           // no cambia nada si ya existe
      create: { name },
    });
  }
  console.log("✅ Plantas sembradas");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

