// lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  // 👉 Sesiones guardadas sólo en el JWT, sin tabla Session
  session: { strategy: "jwt" },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Si más adelante usas credenciales propias, añádelas aquí
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;       // propaga el rol al token
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role as "USER" | "ADMIN";
      return session;
    },
  },
};
