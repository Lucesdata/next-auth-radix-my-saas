'use client';

import React, { useState } from 'react';
import { Flex, TextField, Button, Text, Link } from '@radix-ui/themes';
import { Label } from '@radix-ui/react-label';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type FormData = {
  name: string;
  email: string;
  password: string;
};

// Cambia a false si NO quieres hacer auto‑login luego de crear la cuenta.
const AUTO_LOGIN_AFTER_REGISTER = true;

function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    // Limpia mensajes previos
    setSuccessMessage(null);
    setServerError(null);

    try {
      console.log('[Signup] POST /api/auth/register', data);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      console.log('[Signup] status', res.status);

      // La respuesta puede ser JSON o texto en bruto (errores)
      let result: any;
      try {
        result = await res.json();
      } catch {
        const txt = await res.text();
        result = { message: txt };
      }
      console.log('[Signup] result', result);

      if (!res.ok) {
        const msg = result?.message || 'Error al registrar.';
        setServerError(msg);

        // Marca error en email si parece un conflicto de email/usuario existente
        if (msg.toLowerCase().includes('email') || msg.toLowerCase().includes('usuario')) {
          setError('email', { type: 'server', message: msg });
        }
        return;
      }

      // Registro ok
      setSuccessMessage('✅ Registro exitoso');
      console.log('[Signup] registro exitoso');

      // Guarda los datos originales para auto‑login antes de resetear
      const { email, password } = data;
      reset();

      if (AUTO_LOGIN_AFTER_REGISTER) {
        console.log('[Signup] intentando auto‑login...');
        const loginResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
        console.log('[Signup] resultado auto‑login', loginResult);

        if (loginResult?.ok) {
          router.push('/');
          return;
        } else {
          setServerError(
            'Cuenta creada, pero hubo un problema al iniciar sesión automáticamente. Por favor, inicia sesión manualmente.'
          );
        }
      } else {
        // Redirigir manualmente después de breve delay
        setTimeout(() => {
          router.push('/auth/login');
        }, 1200);
      }
    } catch (err) {
      console.error('❌ Error de red al registrar:', err);
      setServerError('❌ Error de red. Inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="4" maxWidth="300px">
        <Text as="p" weight="bold" size="5" align="center">
          Crear cuenta
        </Text>

        {/* Nombre */}
        <Flex direction="column" gap="1">
          <Label htmlFor="name">Nombre completo</Label>
          <TextField.Root
            id="name"
            placeholder="Tu nombre completo"
            variant="surface"
            {...register('name', {
              required: 'Nombre requerido',
              minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
            })}
          />
          {errors.name && (
            <Text size="1" color="red">
              {errors.name.message}
            </Text>
          )}
        </Flex>

        {/* Email */}
        <Flex direction="column" gap="1">
          <Label htmlFor="email">Correo electrónico</Label>
          <TextField.Root
            id="email"
            placeholder="email@dominio.com"
            variant="surface"
            {...register('email', {
              required: 'Email requerido',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Formato de email inválido',
              },
            })}
          />
          {errors.email && (
            <Text size="1" color="red">
              {errors.email.message}
            </Text>
          )}
        </Flex>

        {/* Password */}
        <Flex direction="column" gap="1">
          <Label htmlFor="password">Contraseña</Label>
          <TextField.Root
            id="password"
            type="password"
            placeholder="********"
            variant="surface"
            {...register('password', {
              required: 'Contraseña requerida',
              minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' },
            })}
          />
          {errors.password && (
            <Text size="1" color="red">
              {errors.password.message}
            </Text>
          )}
        </Flex>

        <Button
          type="submit"
          variant="solid"
          color="indigo"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creando...' : 'Crear cuenta'}
        </Button>

        {/* Mensajes */}
        {successMessage && (
          <Text size="2" color="green" align="center">
            {successMessage}
          </Text>
        )}
        {serverError && (
          <Text size="2" color="red" align="center">
            {serverError}
          </Text>
        )}

        <Text size="2" align="center">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/auth/login" weight="bold" color="indigo">
            Iniciar sesión
          </Link>
        </Text>
      </Flex>
    </form>
  );
}

export default SignupForm;
