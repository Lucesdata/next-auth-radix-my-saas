import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

type RegisterBody = {
  name?: string;
  email?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body: RegisterBody = await req.json();
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase(); // normaliza email
    const password = body.password;

    // Validación mínima
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos.' },
        { status: 400 }
      );
    }

    // ¿Ya existe el email?
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado.' },
        { status: 409 } // 409 Conflict (puedes dejar 400 si prefieres)
      );
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Respuesta de éxito
    return NextResponse.json(
      { message: 'Usuario creado', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al registrar:', error);
    return NextResponse.json(
      { error: 'Error en el servidor.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Útil si alguien abre la URL en el navegador
  return NextResponse.json(
    { error: 'Método no permitido. Usa POST.' },
    { status: 405 }
  );
}
