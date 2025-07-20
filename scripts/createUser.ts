import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // hash de "Contraseña123"
  const hash = "$2b$10$2ldC62fDAvFsi1WbZwJOO.8fi2fzLeOWMiQIuAdijadWtBaM8/Y6m";

  await prisma.user.create({
    data: {
      name: "Ana Operaria",
      email: "ana@planta1.com",
      password: hash,
      role: "OPERARIO",
      // plantId: "planta1-id"   // ponlo si ya tienes plantas
    },
  });

  console.log("✅ Usuario creado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
