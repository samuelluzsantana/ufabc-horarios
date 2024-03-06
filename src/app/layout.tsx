import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/contexts/provider";
// estilo global
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Listagem de disciplinas",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
          <Providers>
            {children}
          </Providers>
      </body>
    </html>

  );
}