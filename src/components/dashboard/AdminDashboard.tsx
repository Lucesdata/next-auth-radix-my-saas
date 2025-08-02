// src/components/dashboard/AdminDashboard.tsx
"use client";

import { useSession } from "next-auth/react";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard del Administrador</h1>
      <p className={styles.subtitle}>
        Este es el panel de control para tareas administrativas.
      </p>

      {session?.user && (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Bienvenido, {session.user.name}</div>
          <div className={styles.cardValue}>Rol: {session.user.role}</div>
        </div>
      )}
    </div>
  );
}
