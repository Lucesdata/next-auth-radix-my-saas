'use client';

import React from 'react';
import { Button } from '@radix-ui/themes';
import { signOut } from 'next-auth/react';

/**
 * Botón para cerrar sesión.
 * Llama a signOut() de NextAuth y redirige a /auth/login.
 */
export default function SignoutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/login' }); // Cambia la URL si quieres otro destino
  };

  return (
    <Button
      type="button"
      variant="soft"
      color="red"
      onClick={handleSignOut}
    >
      Cerrar sesión
    </Button>
  );
}
