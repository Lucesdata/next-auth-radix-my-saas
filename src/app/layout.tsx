// src/app/layout.tsx
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "ptapp_rural",
  description: "Monitoreo de plantas de agua potable",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* SessionProvider y Hooks pasan a un componente cliente */}
        <Providers>
          <Navbar />
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
