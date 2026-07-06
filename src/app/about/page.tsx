"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Target
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
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white/10 outline outline-1 outline-ceramic-pink/30 flex items-center justify-center mb-6 relative group ceramic-shadow">
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
              <div className="flex justify-between pb-1">
                <span className="text-slate-400 font-mono text-[10px]">CHUYÊN NGÀNH:</span>
                <span className="text-white font-medium text-right">Ngôn ngữ Anh</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center text-[10px] text-slate-400 font-mono">
            ULIS VNU Student • Academic Portfolio
          </div>
        </motion.div>

        {/* Right column - Biography & Goals */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Giới thiệu bản thân */}
          <div className="bento-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold text-white mb-4">
                Xin chào, mình là Nguyễn Minh Hằng 👋
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                Chào mừng bạn đã ghé thăm trang portfolio cá nhân của mình!
              </p>
              
              <ul className="space-y-4 text-slate-300 text-sm font-sans">
                <li className="leading-relaxed">
                  <strong className="text-ceramic-pink font-semibold">• Về bản thân:</strong> Hiện tại, mình đang là sinh viên ngành <em>Ngôn ngữ Anh</em>. Mình tự thấy bản thân là một người khá dễ tính, thân thiện và hướng tới sự tích cực, dù đôi khi cũng có chút &quot;hay cọc&quot; vì những điều bé tí teo trong cuộc sống.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-ceramic-pink font-semibold">• Sở thích:</strong> Bên cạnh việc học ngôn ngữ, mình là một người cực kỳ yêu thích nghệ thuật. Những lúc rảnh rỗi, mình thường lướt Facebook để cập nhật xu hướng, hoặc thử sức với các bộ môn như đánh đàn, vẽ tranh, móc len và thêu thùa. Dù tự nhận là không có quá nhiều năng khiếu thiên bẩm, nhưng việc tự tay tỉ mẩn làm ra những món đồ nhỏ xinh mang lại cho mình rất nhiều niềm vui và sự kiên nhẫn.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-ceramic-pink font-semibold">• Mục tiêu học tập &amp; Định hướng phát triển:</strong> Trong tương lai gần, mình hướng tới việc nắm vững các kiến thức nền tảng cốt lõi của ngành Ngôn ngữ Anh, đồng thời tích cực trau dồi các kỹ năng số để không bị tụt hậu trong thời đại công nghệ. Định hướng nghề nghiệp rõ ràng của mình là trở thành một <em>Phiên dịch viên chuyên nghiệp</em> trong vòng 2-3 năm tới.
                </li>
              </ul>
            </div>
          </div>

          {/* Mục tiêu của Portfolio */}
          <div className="bento-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-ceramic-pink mb-4">
                <Target className="h-5 w-5" />
                <h3 className="text-lg font-serif font-bold text-white">Mục tiêu của Portfolio này</h3>
              </div>
              <ul className="space-y-4 text-slate-300 text-sm font-sans">
                <li className="flex gap-3 leading-relaxed">
                  <span className="text-ceramic-pink font-bold">•</span>
                  <div>
                    <strong className="text-white">Minh chứng năng lực:</strong> Hệ thống và thể hiện lại toàn bộ các kỹ năng số, tư duy công nghệ và sự nhạy bén mà mình đã tích lũy được qua từng bài học.
                  </div>
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <span className="text-ceramic-pink font-bold">•</span>
                  <div>
                    <strong className="text-white">Kho lưu trữ cá nhân:</strong> Lưu trữ trực quan các sản phẩm, bài tập thực hành để dễ dàng theo dõi sự tiến bộ của bản thân, đồng thời sẵn sàng chia sẻ với bạn bè, giảng viên hoặc các nhà tuyển dụng tương lai.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
