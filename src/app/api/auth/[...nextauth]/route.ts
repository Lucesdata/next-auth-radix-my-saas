// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo electrónico",
          type: "text",
          placeholder: "tu@correo.com",
        },
          password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(">>> [authorize] credenciales recibidas:", credentials);

        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";

        if (!email || !password) {
          console.warn("[authorize] Falta email o password.");
          return null;
        }

        // Buscar usuario EXACTO por email normalizado
        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log("[authorize] Usuario encontrado en DB?:", !!user);

        if (!user) {
          console.warn("[authorize] Usuario no encontrado:", email);
          throw new Error("Usuario no encontrado");
        }

        // Validar password (hash está en user.password)
        console.log("[authorize] Comparando contraseña...");
        const ok = await bcrypt.compare(password, user.password);
        console.log("[authorize] Resultado compare:", ok);

        if (!ok) {
          console.warn("[authorize] Contraseña incorrecta para:", email);
          throw new Error("Contraseña incorrecta");
        }

        // Usuario válido: devolvemos objeto serializable SIN password
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // error: "/auth/login", // opcional, si quieres manejar errores en la misma página
  },
  session: {
    strategy: "jwt", // mantengamos JWT simple
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
