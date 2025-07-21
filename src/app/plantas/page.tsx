// src/app/plantas/page.tsx
import { prisma } from "@/lib/prisma";
import PlantSearchList from "@/components/PlantSearchList";

export const metadata = {
  title: "Plantas de agua potable",
};

export default async function Page() {
  // fetch serveless
  const plants = await prisma.plant.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <main>
      <h1>Plantas de agua potable</h1>
      <PlantSearchList plants={plants} />
    </main>
  );
}
