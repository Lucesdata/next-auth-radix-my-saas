// src/app/page.tsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button, Text } from '@radix-ui/themes';
import styles from './Home.module.css';          // ← el módulo está junto a este archivo

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;        // evita parpadeos

  return (
    <div className={styles.page}>
      {/* --- Navbar muy simple --- */}
      <nav style={{ padding: '0.75rem 1rem' }}>
        <Link href="/">Home</Link>{' | '}
        <Link href="/plantas">Plantas</Link>{' | '}
        {!session && <Link href="/auth/login">Iniciar sesión</Link>}
      </nav>

      {/* --- Contenido centrado --- */}
      <div className={styles.centerWrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>Monitoreo de Plantas</h1>
          <p className={styles.subtitle}>
            Plataforma para visualizar y controlar las lecturas de 13 plantas de
            agua potable.
          </p>

          {session ? (
            <>
              <Text as="p" size="4" weight="bold" align="center">
                ¡Hola, {session.user?.name ?? session.user?.email}!
              </Text>
              <Button
                className={styles.btn}
                variant="solid"
                color="red"
                mt="4"
                onClick={() => signOut()}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button
              className={styles.btn}
              variant="solid"
              color="indigo"
              onClick={() => signIn()}
            >
              Iniciar sesión
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
