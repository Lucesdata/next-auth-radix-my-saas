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
          console.warn(">>> [authorize] Falta email o password.");
          throw new Error("Debes ingresar email y contraseña");
        }

        // Buscar usuario EXACTO por email normalizado
        const user = await prisma.user.findUnique({
          where: { email },
        });
        console.log(">>> [authorize] Usuario en DB:", user ? {
          id: user.id,
          email: user.email,
          role: user.role,
          pwHashPrefix: user.password.slice(0, 10) + "…",
        } : null);

        if (!user) {
          console.warn(`>>> [authorize] Usuario NO encontrado: ${email}`);
          throw new Error("Usuario no encontrado");
        }

        // Validar password (hash está en user.password)
        console.log(">>> [authorize] Comparando contraseña…");
        const isValid = await bcrypt.compare(password, user.password);
        console.log(">>> [authorize] Resultado compare:", isValid);

        if (!isValid) {
          console.warn(`>>> [authorize] Contraseña incorrecta para ${email}`);
          throw new Error("Contraseña incorrecta");
        }

        // Todo OK: devolvemos sólo los datos necesarios
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    // error: "/auth/login", // opcional: muestra error en la misma página
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Incluir el role en el JWT y en la session
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user!,
        role: token.role as string,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

