import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";

import SessionProviders from "@/components/SessionProviders";
import MainNav from "@/components/MainNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ptapp_rural",
  description: "Plataforma rural de monitoreo de plantas de agua potable",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionProviders>
          <Theme>
            <header className="p-4 border-b">
              <MainNav />
            </header>

            <main className="p-6">{children}</main>
          </Theme>
        </SessionProviders>
      </body>
    </html>
  );
}

