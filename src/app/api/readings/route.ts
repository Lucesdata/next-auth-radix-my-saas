import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/readings
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      plantId,
      turbidity,
      chlorine,
      ph,
      flowIn,
      flowOut,
      tankLevel
    } = body;

    if (
      !plantId || turbidity == null || chlorine == null || ph == null ||
      flowIn == null || flowOut == null || tankLevel == null
    ) {
      return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });
    }

    const reading = await prisma.reading.create({
      data: {
        plantId,
        turbidity,
        chlorine,
        ph,
        flowIn,
        flowOut,
        tankLevel,
      },
    });

    return NextResponse.json(reading);
  } catch (error) {
    console.error("Error al crear lectura:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

// GET /api/readings
export async function GET() {
  try {
    const readings = await prisma.reading.findMany({
      orderBy: { timestamp: "desc" },
      include: {
        plant: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json(readings);
  } catch (error) {
    console.error("Error al obtener lecturas:", error);
    return NextResponse.json({ error: "Error al obtener lecturas." }, { status: 500 });
  }
}
