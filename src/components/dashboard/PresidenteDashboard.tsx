// src/components/dashboard/PresidenteDashboard.tsx
"use client";

import { useSession } from "next-auth/react";
import styles from "./PresidenteDashboard.module.css";

export default function PresidenteDashboard() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard del Presidente</h1>
      <p className={styles.subtitle}>
        Bienvenido al panel de supervisión general de las plantas.
      </p>

      {session?.user && (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Hola, {session.user.name}</div>
          <div className={styles.cardValue}>Rol: {session.user.role}</div>
        </div>
      )}
    </div>
  );
}
