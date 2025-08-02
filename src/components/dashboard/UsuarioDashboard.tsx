// src/components/dashboard/UsuarioDashboard.tsx
"use client";

import { useSession } from "next-auth/react";
import styles from "./UsuarioDashboard.module.css";

export default function UsuarioDashboard() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard del Usuario</h1>
      <p className={styles.subtitle}>
        Consulta aquí el estado de tu planta asignada.
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
