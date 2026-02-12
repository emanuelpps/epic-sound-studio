import type { Metadata } from "next";
import "./globals.css";

import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Epic Sound Studio",
  description:
    "Epic Sound Studio: plataforma musical Web3 para explorar un universo sonoro descentralizado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${space.variable} antialiased`}>{children}</body>
    </html>
  );
}
