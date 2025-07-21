// src/components/PlantSearchList.tsx
"use client";

import { useState } from "react";
import PlantCard from "./PlantCard";

interface Plant {
  id: string;
  name: string;
}

interface Props {
  plants: Plant[];
}

export default function PlantSearchList({ plants }: Props) {
  const [query, setQuery] = useState("");

  const filtered = plants.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Buscar planta..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 16, padding: 8, width: "100%" }}
      />
      <div>
        {filtered.map((p) => (
          <PlantCard key={p.id} id={p.id} name={p.name} />
        ))}
      </div>
    </>
  );
}
