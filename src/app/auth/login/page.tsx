'use client';

import React from 'react';
import { Container, Card, Heading, Flex } from '@radix-ui/themes';
import SigninForm from '@/components/auth/SigninForm';
import styles from '@/components/auth/Login.module.css';

export default function LoginPage() {
  return (
    <Container className={styles.pageContainer}>
      <Flex className={styles.wrapper}>
        <Card className={styles.card}>
          <Heading as="h1" size="5" mb="4">
            Iniciar sesión
          </Heading>
          <SigninForm />
        </Card>
      </Flex>
    </Container>
  );
}

