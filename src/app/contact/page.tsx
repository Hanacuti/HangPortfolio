"use client";

import React from "react";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col gap-12 py-4 md:py-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="border-b border-ceramic-pink/15 pb-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ceramic-pink">Get in touch</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">
          Kết Nối / Liên Hệ
        </h1>
      </div>

      {/* Centered Direct Contact Tile */}
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bento-card max-w-xl w-full p-8 md:p-10 flex flex-col items-center text-center gap-6">
          {/* Sealed Envelope / Mail Icon Graphic */}
          <div className="w-20 h-20 rounded-full bg-ceramic-pink-light border-2 border-ceramic-pink/20 flex items-center justify-center relative group ceramic-shadow">
            <div className="absolute inset-0 rounded-full bg-ceramic-pink/5 blur-md group-hover:bg-ceramic-pink/10 transition-colors" />
            <Mail className="h-8 w-8 text-ceramic-pink relative" />
          </div>
          
          <div>
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Email học thuật chính thức
            </h3>
            <a
              href="mailto:hanacuti0507@gmail.com"
              className="inline-block text-xl md:text-2xl font-serif font-extrabold text-ceramic-pink mt-2 hover:text-white transition-colors duration-300 border-b-2 border-dashed border-ceramic-pink/30 hover:border-white/30 pb-1"
            >
              hanacuti0507@gmail.com
            </a>
          </div>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-md font-sans">
            Tôi rất hân hạnh được đón nhận các ý kiến thảo luận khoa học, cơ hội tham gia dự án nghiên cứu ngôn ngữ, EdTech, hoặc các thư mời hợp tác học thuật. Hãy liên hệ với tôi qua địa chỉ email trên.
          </p>

          <div className="w-full border-t border-white/5 pt-6 mt-2 text-[10px] text-slate-400 font-mono">
            Mọi phản hồi sẽ được gửi trong vòng 24 giờ làm việc.
          </div>
        </div>
      </div>
    </div>
  );
}
