// src/components/dashboard/OperarioDashboard.tsx
"use client";

import styles from './OperarioDashboard.module.css';

export default function OperarioDashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard del Operario</h1>
      <p className={styles.subtitle}>Resumen general de la planta asignada.</p>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Lecturas registradas</div>
          <div className={styles.cardValue}>12 lecturas</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Última turbidez</div>
          <div className={styles.cardValue}>1.4 NTU</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Nivel del tanque</div>
          <div className={styles.cardValue}>3.2 m</div>
        </div>
      </div>
    </div>
  );
}
