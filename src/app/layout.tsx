import type { Metadata } from "next";
import "@fontsource/inter";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Silver-Soul | Where words gather weight.",
  description: "A calm, text-first literary platform for readers and writers.",
  openGraph: {
    title: "Silver-Soul",
    description: "Where words gather weight.",
    url: "https://silver-soul.com",
    siteName: "Silver-Soul",
    images: [
      {
        url: "/og-image.jpg", // Ensure this exists or use a placeholdler
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silver-Soul",
    description: "Where words gather weight.",
    // images: ['/twitter-image.jpg'],
  },
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
