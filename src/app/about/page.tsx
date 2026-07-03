"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  Compass
} from "lucide-react";

export default function About() {
  const basePath = process.env.NODE_ENV === "production" ? "/HangPortfolio" : "";

  return (
    <div className="flex flex-col gap-12 py-4 md:py-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-ceramic-pink/15 pb-6"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-ceramic-pink">Introduce</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">
          Giới Thiệu Bản Thân
        </h1>
      </motion.div>

      {/* Main Biography Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left column - Quick Profile Info Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 bento-card p-6 md:p-8 flex flex-col justify-between"
        >
          <div className="flex flex-col items-center text-center">
            {/* Sealed Avatar Graphic (Ceramic Framed circular image) */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/10 outline outline-1 outline-ceramic-pink/30 flex items-center justify-center mb-6 relative group ceramic-shadow">
              <img 
                src={`${basePath}/anhAVT.png`} 
                alt="Nguyễn Minh Hằng Avatar" 
                className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-white">Nguyễn Minh Hằng</h2>
            <p className="text-xs text-ceramic-pink font-mono mt-1 uppercase tracking-wider">Linguistics Student</p>
            
            <div className="w-full border-t border-white/10 my-6" />
            
            <div className="w-full text-left space-y-4 text-xs text-slate-300 font-sans">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400 font-mono text-[10px]">ĐẠI HỌC:</span>
                <span className="text-white font-medium text-right">ĐH Ngoại ngữ - ĐHQGHN (ULIS)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400 font-mono text-[10px]">CHUYÊN NGÀNH:</span>
                <span className="text-white font-medium text-right">Ngôn ngữ Anh</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-400 font-mono text-[10px]">ĐỊNH HƯỚNG:</span>
                <span className="text-ceramic-mint font-semibold text-right">Ứng dụng CNTT</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center text-[10px] text-slate-400 font-mono">
            ULIS VNU Student • Academic Portfolio
          </div>
        </motion.div>

        {/* Right column - Academic Statements */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Tuyên ngôn mục tiêu */}
          <div className="bento-card p-6 md:p-8">
            <div className="flex items-center gap-2 text-ceramic-pink mb-4">
              <Target className="h-5 w-5" />
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-ceramic-pink">Tuyên ngôn mục tiêu</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              Trong năm học này, tôi tập trung nâng cấp chất lượng nghiên cứu theo hướng <strong>&quot;Chuẩn học thuật&quot;</strong>: 
              có cấu trúc chặt chẽ, luận điểm đi kèm ví dụ/minh chứng thực tế và quy trình nghiêm ngặt tự kiểm duyệt trước khi xuất bản. 
              Mục tiêu ngắn hạn là làm chủ kỹ năng viết báo cáo khoa học, xây dựng sản phẩm số và tối ưu hóa hiệu suất làm việc nhóm. 
              Tầm nhìn dài hạn là nghiên cứu giải pháp ứng dụng công nghệ nhằm hỗ trợ học tập và thực thi pháp luật một cách minh bạch, an toàn.
            </p>
          </div>

          {/* Tầm nhìn nghiên cứu */}
          <div className="bento-card p-6 md:p-8">
            <div className="flex items-center gap-2 text-ceramic-pink mb-4">
              <Compass className="h-5 w-5" />
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-ceramic-pink">Định hướng nghiên cứu</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              Sự kết hợp giữa <strong>Ngôn ngữ học Anh</strong> và <strong>Công nghệ Pháp luật (Legal Tech)</strong> mở ra nhiều hướng tiếp cận mới:
            </p>
            <ul className="mt-4 space-y-3 text-slate-300 text-sm font-sans list-disc list-inside">
              <li>Xây dựng bộ dữ liệu (Corpus) song ngữ chuyên ngành luật Anh - Việt phục vụ dịch thuật tư pháp.</li>
              <li>Sử dụng các mô hình học máy (Machine Learning) và NLP để phân tích cấu trúc điều khoản hợp đồng.</li>
              <li>Thiết kế hệ tri thức pháp lý tự phục vụ cho sinh viên nghiên cứu và cộng đồng học tập trực tuyến.</li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
