import type { Metadata } from "next";
import { Quicksand, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "The Ceramics | Playful & Handcrafted Artisan Ceramics Boutique",
  description: "A playful, nostalgic, and handcrafted ceramics boutique showcase page featuring unique, quirky character clay sculptures and artisan designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${quicksand.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body className="clay-noise min-h-full flex flex-col bg-ceramic-cream text-ceramic-dark antialiased">
        {children}
      </body>
    </html>
  );
}
