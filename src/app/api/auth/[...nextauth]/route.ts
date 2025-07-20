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

      // ---------- AUTHORIZATION ----------
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";

        console.log("[authorize] → email:", email);
        console.log("[authorize] → password:", password);

        if (!email || !password) {
          console.log("[authorize] → missing email or password");
          return null;
        }

        // 1) Busca al usuario por email exacto
        const user = await prisma.user.findUnique({ where: { email } });
        console.log("[authorize] → user found?:", !!user);

        if (!user) {
          throw new Error("Usuario no encontrado");
        }

        // 2) Compara la contraseña recibida con el hash
        const ok = await bcrypt.compare(password, user.password);
        console.log("[authorize] → compare result:", ok);

        if (!ok) {
          throw new Error("Contraseña incorrecta");
        }

        // 3) Devuelve un objeto serializable **con el rol**
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // ← clave para callbacks
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      // cuando authorize devuelve user añadimos el rol al JWT
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      // propagamos el rol al cliente
      if (session.user)
        session.user.role = token.role as
          | "USUARIO"
          | "OPERARIO"
          | "PRESIDENTE_JAA"
          | "ADMIN";
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
