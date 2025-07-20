import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  const plain = "Presidente123";                // ← contraseña en texto plano
  const hash  = await bcrypt.hash(plain, 10);   // genera hash con el mismo salt‑round

  await prisma.user.update({
    where:  { email: "presidente@planta1.com" },
    data:   { password: hash },
  });

  console.log("✔ Password actualizado con:", hash);
  await prisma.$disconnect();
})();
