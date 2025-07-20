import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// pega aquí el hash generado en el paso 1
const HASH = "$2b$10$zNGRYopgjOguZA3oSqkSEuSGm1wle7Ld7dP8cugtXGAzASSvi8dI";

async function main() {
  await prisma.user.create({
    data: {
      name: "Pedro Presidente",
      email: "presidente@planta1.com",
      password: HASH,
      role: "PRESIDENTE_JAA",
      // plantId: "planta1-id"   // conéctalo si ya tienes la planta creada
    },
  });
  console.log("✅ Usuario PRESIDENTE_JAA creado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
