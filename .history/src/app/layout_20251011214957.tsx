import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/contexts/provider";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/contexts/theme-provider";

// estilo global
import "../styles/globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Listagem de disciplinas",
  description:
    "Monte a sua grade do seu quadrimestre com essa aplicação - desenvolvido por @sxwuell",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/branco-logo.svg" sizes="any" />
      </head>

      <body className={spaceGrotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
