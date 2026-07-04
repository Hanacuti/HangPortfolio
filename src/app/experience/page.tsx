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
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
            Nhìn lại toàn bộ chặng đường từ những nét phác thảo đầu tiên cho trang Portfolio này đến khi đặt dấu chấm hết cho bài tập cuối cùng, trong tôi đọng lại niềm tự hào lớn lao. Việc vừa phải dung nạp một khối lượng kiến thức mới, vừa phải trăn trở thiết kế giao diện sao cho tối ưu và trực quan là một bài toán không hề đơn giản. Thế nhưng, chính trải nghiệm thực tế &quot;học đi đôi với hành&quot; ấy đã trở thành thước đo chính xác nhất cho sự trưởng thành và tiến bộ của tôi qua từng tuần.
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
              1. Nâng tầm kỹ năng số và tư duy cộng tác cùng AI
            </h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              Môn học đã trang bị cho tôi những kỹ năng số mang tính ứng dụng cao trong thực tế. Thay vị phụ thuộc thụ động, tôi đã biết cách làm chủ và &quot;giao tiếp&quot; hiệu quả với các trợ lý AI để tối ưu hóa quá trình học tập. Bên cạnh đó, tư duy quản lý dữ liệu một cách khoa học cùng việc thành thạo các nền tảng trực tuyến đã giúp tôi kết nối, phối hợp với các thành viên trong nhóm một cách nhịp nhàng và chuyên nghiệp hơn.
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
              2. Trách nhiệm số và bộ lọc tư duy phản biện
            </h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              Một trong những giá trị lớn nhất tôi gặt hái được chính là ý thức bảo mật thông tin và tinh thần tôn trọng quyền tác giả trên không gian mạng. Trong bối cảnh bùng nổ thông tin và sự trỗi dậy của công nghệ AI, việc xác thực độ tin cậy của dữ liệu là một thử thách không nhỏ. Tôi đã rèn luyện cho mình thói quen tư duy phản biện, chủ động đối chiếu đa nguồn để đảm bảo tính chính xác cho mọi nội dung. Vượt qua sự cám dỗ của việc &quot;ỷ lại&quot; vào công nghệ chính là bước tiến lớn nhất của tôi.
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
              3. Làm chủ công nghệ và chuyển hóa tri thức ngôn ngữ
            </h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
              Điều khiến tôi tâm đắc nhất là việc biến các công cụ hiện đại thành phương tiện để hiện thực hóa ý tưởng của chính mình. Cảm giác nhìn những lý thuyết học thuật khô khan trên sách vở được chuyển hóa thành một không gian Portfolio trực quan, gọn gàng đã tiếp thêm cho tôi rất nhiều động lực. Hành trình này là minh chứng rõ ràng cho thấy tôi hoàn toàn có thể tự chủ trong học tập và tự tin làm chủ công nghệ trong kỷ nguyên số.
            </p>
          </div>
        </div>

        {/* Footer info tag */}
        <div className="mt-4 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Nguyễn Minh Hằng • ULIS VNU</span>
          <span className="flex items-center gap-1.5 text-ceramic-pink font-semibold">
            <Award className="h-4 w-4" />
            Độc lập & Tự chủ
          </span>
        </div>
      </motion.div>
    </div>
  );
}
