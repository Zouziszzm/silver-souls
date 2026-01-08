import type { Metadata } from "next";
import "@fontsource/inter";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Silver-Soul | Where words gather weight.",
  description: "A calm, text-first literary platform for readers and writers.",
};

import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-snow-blue">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
