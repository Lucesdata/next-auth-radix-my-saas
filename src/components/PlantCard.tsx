// src/components/PlantCard.tsx
"use client";

import Link from "next/link";
import { Card } from "@radix-ui/themes";

interface Props {
  id: string;
  name: string;
}

export default function PlantCard({ id, name }: Props) {
  return (
    <Card asChild>
      {/* Link ya es un <a>, no pongas otro <a> dentro */}
      <Link
        href={`/plantas/${id}`}
        className="block px-4 py-3 hover:bg-slate-100"
      >
        {name}
      </Link>
    </Card>
  );
}

