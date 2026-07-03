"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Cpu, 
  Users, 
  BookOpen 
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
        <span className="font-mono text-[10px] uppercase tracking-widest text-ceramic-pink">Reflection</span>
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
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
            Nhìn lại hành trình từ những bước đầu tiên khi thiết lập trang Portfolio này cho đến khi hoàn thành bài tập cuối cùng, cảm xúc lớn nhất trong tôi là sự tự hào. Việc phải vừa tiếp thu kiến thức mới, vừa tìm cách sắp xếp, thiết kế sao cho website cá nhân trở nên trực quan không phải là một thử thách dễ dàng. Nhưng chính quá trình &quot;vừa học vừa làm&quot; này đã giúp tôi thấy được sự tiến bộ rõ rệt của bản thân qua từng tuần.
          </p>
        </div>

        {/* Section 1: Digital Skills & AI */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-white/5 pb-6">
          <div className="md:col-span-1 flex items-start mt-1">
            <div className="p-2 rounded-xl bg-ceramic-pink-light border border-ceramic-pink/10">
              <Cpu className="h-5 w-5 text-ceramic-pink" />
            </div>
          </div>
          <div className="md:col-span-11 space-y-2">
            <h3 className="text-base font-serif font-bold text-white">
              1. Kỹ năng số thực tế & Làm chủ Trợ lý AI
            </h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              Môn học đã mang lại cho tôi những bài học kỹ năng số cực kỳ thực tế. Tôi đã biết cách giao tiếp và sử dụng AI hiệu quả hơn để phục vụ học tập thay vì phụ thuộc vào nó. Đồng thời, việc quản lý dữ liệu ngăn nắp và ứng dụng các công cụ trực tuyến cũng giúp tôi phối hợp mượt mà, khoa học hơn rất nhiều khi làm việc nhóm.
            </p>
          </div>
        </div>

        {/* Section 2: Ethics & Information Filtering */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-white/5 pb-6">
          <div className="md:col-span-1 flex items-start mt-1">
            <div className="p-2 rounded-xl bg-ceramic-pink-light border border-ceramic-pink/10">
              <Users className="h-5 w-5 text-ceramic-pink" />
            </div>
          </div>
          <div className="md:col-span-11 space-y-2">
            <h3 className="text-base font-serif font-bold text-white">
              2. Đạo đức mạng & Bộ lọc thông tin phản biện
            </h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              Quan trọng hơn cả, tôi đã nâng cao được ý thức về bảo mật thông tin cá nhân và trách nhiệm tôn trọng bản quyền trên không gian mạng. Tuy nhiên, hành trình này cũng đem lại một thách thức lớn về việc chọn lọc và kiểm chứng thông tin. Giữa thời đại mạng Internet và AI bùng nổ, thông tin rất nhiều nhưng độ chính xác lại là một dấu hỏi lớn. Tôi đã phải học cách tư duy phản biện, liên tục đối chiếu giữa các nguồn để đảm bảo mỗi nội dung đưa vào bài tập đều đáng tin cậy. Vượt qua được thói quen ỷ lại đó chính là bài học lớn nhất mà tôi gặt hái được.
            </p>
          </div>
        </div>

        {/* Section 3: Autonomy & Motivation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-2">
          <div className="md:col-span-1 flex items-start mt-1">
            <div className="p-2 rounded-xl bg-ceramic-pink-light border border-ceramic-pink/10">
              <BookOpen className="h-5 w-5 text-ceramic-pink" />
            </div>
          </div>
          <div className="md:col-span-11 space-y-2">
            <h3 className="text-base font-serif font-bold text-white">
              3. Vận dụng tri thức & Tự chủ trong thế giới số
            </h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              Điều tôi cảm thấy tâm đắc nhất chính là việc khả năng vận dụng các công cụ hiện đại với sự hiểu biết, định hướng của bản thân để hoàn thiện không gian Portfolio này. Cảm giác nhìn những kiến thức trên sách vở và các sản phẩm thực hành được chuyển hóa thành một website thực tế, gọn gàng mang lại cho tôi rất nhiều động lực. Nó chứng minh rằng tôi có thể tự chủ trong việc học và làm chủ các công cụ số.
            </p>
          </div>
        </div>

        {/* Footer info tag */}
        <div className="mt-4 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>Nguyễn Minh Hằng • ULIS VNU</span>
          <span className="flex items-center gap-1.5 text-ceramic-pink">
            <Award className="h-3.5 w-3.5" />
            Độc lập & Tự chủ
          </span>
        </div>
      </motion.div>
    </div>
  );
}
