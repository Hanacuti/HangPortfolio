import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CeramicBackground from "@/components/CeramicBackground";

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
      <body className="min-h-full flex flex-col bg-ceramic-cream text-foreground relative">
        <CeramicBackground />
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 sm:px-8 relative z-10">
          {children}
        </main>
        
        {/* Playful Handcrafted Deep Pink Scalloped Footer */}
        <footer className="w-full scalloped-top bg-ceramic-pink py-12 text-center text-xs text-white/90 mt-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
            {/* Social media bubbles */}
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.facebook.com/dmcuocdoi.vn" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-ceramic-blue hover:bg-ceramic-blue/90 flex items-center justify-center ceramic-shadow transition-transform duration-300 hover:scale-105"
              >
                <span className="font-mono font-bold text-xs text-white">FB</span>
              </a>
              <a 
                href="mailto:hanacuti0507@gmail.com" 
                className="w-12 h-12 rounded-full bg-[#E54D7E] hover:bg-[#E54D7E]/90 flex items-center justify-center ceramic-shadow transition-transform duration-300 hover:scale-105 border-2 border-white/20"
              >
                <span className="font-mono font-bold text-xs text-white">Mail</span>
              </a>
              <a 
                href="tel:0335448265" 
                className="w-12 h-12 rounded-full bg-ceramic-yellow hover:bg-ceramic-yellow/90 flex items-center justify-center ceramic-shadow transition-transform duration-300 hover:scale-105"
              >
                <span className="font-mono font-bold text-xs text-slate-800">Call</span>
              </a>
            </div>
            
            <div className="text-center font-sans space-y-2">
              <p className="font-medium text-sm text-white">
                Nguyễn Minh Hằng &bull; English Linguistics & Legal Tech Researcher
              </p>
              <p className="text-[11px] text-white/70">
                Trường Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội (ULIS - VNU)
              </p>
              <p className="mt-4 font-mono text-[9px] text-white/40">
                Handcrafted Ceramic Theme &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
