// prisma/seedUsers.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * 1)  Define los usuarios que quieras crear.
 *    - password → en texto plano; se hashea antes de insertar.
 *    - plant    → nombre EXACTO de la planta o null (usuarios “libres”).
 */
const users = [
  {
    name: 'Ana Operaria',
    email: 'ana@planta1.com',
    password: 'Operaria123',
    role: 'OPERARIO',
    plant: 'Km18',           // vincula con esa planta
  },
  {
    name: 'Pedro Presidente',
    email: 'presidente@planta1.com',
    password: 'Presidente123',
    role: 'PRESIDENTE_JAA',
    plant: 'Km18',
  },
  {
    name: 'Luciano Guevara',
    email: 'luci@gmail.com',
    password: 'Usuario123',
    role: 'USUARIO',
    plant: null,             // puede consultar todas
  },
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: 'Admin123',
    role: 'ADMIN',
    plant: null,
  },
] as const;

async function main() {
  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);

    // si hay planta, búscala; si no, plantId = null
    const plantRecord = u.plant
      ? await prisma.plant.findUnique({ where: { name: u.plant } })
      : null;

    await prisma.user.upsert({
      where: { email: u.email },
      update: {},                // si ya existe no lo toca
      create: {
        name: u.name,
        email: u.email,
        password: hash,
        role: u.role as any,      // enum Role
        plantId: plantRecord?.id ?? null,
      },
    });
  }

  console.log('✅  Usuarios sembrados');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
