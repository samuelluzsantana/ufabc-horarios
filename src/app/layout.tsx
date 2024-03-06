import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/contexts/provider";
// estilo global
import "../styles/globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Listagem de disciplinas",
  description: "Monte sua grade com a aplicação - Developed by @sxmuell",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/branco-logo.svg" sizes="any" />
      </head>
      <body className={spaceGrotesk.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
