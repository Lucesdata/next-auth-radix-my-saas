import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "USUARIO" | "OPERARIO" | "PRESIDENTE_JAA" | "ADMIN";
    };
  }
  interface User {
    role: "USUARIO" | "OPERARIO" | "PRESIDENTE_JAA" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "USUARIO" | "OPERARIO" | "PRESIDENTE_JAA" | "ADMIN";
  }
}
