"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Cpu, 
  Users, 
  BookOpen,
  Trophy,
  Sparkles
} from "lucide-react";

export default function Experience() {
  return (
    <div className="flex flex-col gap-12 py-4 md:py-8 max-w-4xl mx-auto">
      {/* Title Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-ceramic-pink/15 pb-6"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-ceramic-pink">Reflection</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">
          Tổng Kết Hành Trình
        </h1>
      </motion.div>

      {/* Single Large Reflection Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bento-card p-8 md:p-10 flex flex-col gap-8"
      >
        {/* Intro */}
        <div className="border-b border-white/5 pb-6">
          <h2 className="text-xl font-serif font-bold text-white mb-3">
            Nhìn lại hành trình xây dựng Portfolio 💫
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
            Hành trình xây dựng trang portfolio này không chỉ đơn thuần là một bài tập điều kiện, mà đã trở thành một cuốn nhật ký trực quan, ghi lại trọn vẹn sự trưởng thành và nỗ lực của mình trong môi trường số.
          </p>
        </div>

        {/* Section 1: Skills acquired */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-ceramic-pink">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-lg font-serif font-bold text-white">Những kiến thức & Kỹ năng quan trọng đã gặt hái được:</h2>
          </div>
          
          <div className="flex flex-col gap-6 pl-2">
            {/* Skill 1: Tư duy công nghệ */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-white/5 pb-6">
              <div className="md:col-span-1 flex items-start mt-1">
                <div className="p-2 rounded-xl bg-ceramic-pink-light border border-ceramic-pink/10">
                  <Cpu className="h-5 w-5 text-ceramic-pink" />
                </div>
              </div>
              <div className="md:col-span-11 space-y-2">
                <h3 className="text-base font-serif font-bold text-white">
                  Tư duy công nghệ &amp; Dữ liệu
                </h3>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
                  Hiểu rõ cấu trúc máy tính, biết cách khai thác thông tin hiệu quả và có cái nhìn tổng quan về Trí tuệ nhân tạo (AI) – một công cụ bổ trợ đắc lực cho ngành ngôn ngữ hiện nay.
                </p>
              </div>
            </div>

            {/* Skill 2: Kỹ năng làm việc trực tuyến */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-white/5 pb-6">
              <div className="md:col-span-1 flex items-start mt-1">
                <div className="p-2 rounded-xl bg-ceramic-pink-light border border-ceramic-pink/10">
                  <Users className="h-5 w-5 text-ceramic-pink" />
                </div>
              </div>
              <div className="md:col-span-11 space-y-2">
                <h3 className="text-base font-serif font-bold text-white">
                  Kỹ năng làm việc trực tuyến
                </h3>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
                  Nâng cao năng lực giao tiếp, hợp tác hiệu quả trong môi trường số và đặc biệt là ý thức rất rõ về an toàn thông tin cũng như tính liêm chính học thuật.
                </p>
              </div>
            </div>

            {/* Skill 3: Kỹ năng sáng tạo nội dung */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-2">
              <div className="md:col-span-1 flex items-start mt-1">
                <div className="p-2 rounded-xl bg-ceramic-pink-light border border-ceramic-pink/10">
                  <BookOpen className="h-5 w-5 text-ceramic-pink" />
                </div>
              </div>
              <div className="md:col-span-11 space-y-2">
                <h3 className="text-base font-serif font-bold text-white">
                  Kỹ năng sáng tạo nội dung
                </h3>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
                  Tự tay thiết kế, chuyển hóa các lý thuyết khô khan thành sản phẩm thực tế (file PDF, video, hình ảnh) và biết cách tự triển khai một trang web/blog cá nhân hoàn chỉnh từ con số 0.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Trophy & Achievements */}
        <div className="border-t border-white/5 pt-8 space-y-4">
          <div className="flex items-center gap-2 text-ceramic-pink">
            <Trophy className="h-5 w-5" />
            <h2 className="text-lg font-serif font-bold text-white">Điểm tâm đắc &amp; Thách thức đã vượt qua:</h2>
          </div>
          <div className="pl-2 space-y-4">
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              <strong className="text-white">Điều mình tâm đắc nhất:</strong>{" "}Đó là việc vượt qua rào cản công nghệ để tự tay tối ưu và hệ thống hóa toàn bộ các bài tập một cách chỉn chu trên giao diện website này. Nhìn thấy các sản phẩm từ những bước đi &quot;sơ khai&quot; đầu tiên cho đến khi hoàn thiện được trưng bày gọn gàng, mình cảm thấy vô cùng tự hào về sự kiên trì của chính mình.
            </p>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              <strong className="text-white">Thách thức lớn nhất:</strong>{" "}Ban đầu, mình gặp không ít khó khăn trong việc thiết lập bố cục web, quản lý thời gian để hoàn thành đúng hạn các bài tập và việc tìm kiếm nguồn học liệu chuẩn xác, đảm bảo tính liêm chính. Tuy nhiên, nhờ sự kiên trì và chủ động tìm tòi, mình đã biến những áp lực đó thành bài học kinh nghiệm quý giá.
            </p>
          </div>
        </div>

        {/* Footer info tag */}
        <div className="mt-4 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Nguyễn Minh Hằng • ULIS VNU</span>
          <span className="flex items-center gap-1.5 text-ceramic-pink font-semibold">
            <Award className="h-4 w-4" />
            Độc lập &amp; Tự chủ
          </span>
        </div>
      </motion.div>
    </div>
  );
}
