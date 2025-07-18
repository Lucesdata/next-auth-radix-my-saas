import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Faltan campos requeridos", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return new NextResponse("Usuario no encontrado", { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new NextResponse("Contraseña incorrecta", { status: 401 });
    }

    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return new NextResponse("Error en el servidor", { status: 500 });
  }
}

export async function GET() {
  return new Response("Método GET no permitido en este endpoint", {
    status: 405,
  });
}

