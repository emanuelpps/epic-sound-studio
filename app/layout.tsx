import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Epic Sound Studio",
  description:
    "Epic Sound Studio: plataforma musical Web3 para explorar un universo sonoro descentralizado.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
