import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ConectaVida AI - Tu asistente inteligente",
  description:
    "Asistente personal con IA para resolver tus problemas cotidianos en Colombia y Latinoamérica. Guía en la ciudad, ayuda médica, trámites y emergencias.",
  keywords: [
    "asistente IA",
    "Colombia",
    "trámites",
    "salud",
    "emergencias",
    "ayuda cotidiana",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans min-h-screen flex flex-col bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 antialiased transition-colors duration-300">
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Saltar al contenido principal
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
