// src/app/page.tsx
'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Flex, Text, Button } from '@radix-ui/themes';
import NextLink from 'next/link';
import SignoutButton from '@/components/auth/SignoutButton';

export default function HomePage() {
  const { data: session, status } = useSession();

  // Mientras NextAuth determina el estado de la sesión
  if (status === 'loading') {
    return (
      <Flex p="4">
        <Text>Cargando sesión...</Text>
      </Flex>
    );
  }

  const userEmail = session?.user?.email ?? 'Invitado';

  return (
    <Flex direction="column" gap="4" p="4" align="start">
      <Text as="p" size="6" weight="bold">
        Home
      </Text>

      {session ? (
        <>
          <Text>Bienvenido, {userEmail}</Text>
          <SignoutButton />
        </>
      ) : (
        <>
          <Text>No has iniciado sesión.</Text>
          <NextLink href="/auth/login">
            <Button variant="solid" color="indigo">
              Iniciar sesión
            </Button>
          </NextLink>
        </>
      )}
    </Flex>
  );
}
