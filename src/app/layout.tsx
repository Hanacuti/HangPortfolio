import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NightSkyBackground from "@/components/NightSkyBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
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

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nguyễn Minh Hằng | English Linguistics & Legal Tech Researcher",
  description: "Portfolio cá nhân của Nguyễn Minh Hằng - Sinh viên khoa Ngôn ngữ Anh & Nghiên cứu Công nghệ Pháp luật tại Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội (ULIS - VNU).",
  keywords: ["Nguyễn Minh Hằng", "ULIS", "Linguistics", "Legal Tech", "English Linguistics", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05070C] text-white">
        <NightSkyBackground />
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 sm:px-8">
          {children}
        </main>
        <footer className="w-full border-t border-white/5 py-8 text-center text-xs text-slate-500 bg-[#05070C]/80 backdrop-blur-sm mt-12">
          <div className="max-w-7xl mx-auto px-6">
            <p className="font-sans">
              Nguyễn Minh Hằng - Trường Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội (ULIS - VNU)
            </p>
            <p className="mt-2 font-mono text-[10px] text-slate-600">
              Designed with Academic Nocturne Theme &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
