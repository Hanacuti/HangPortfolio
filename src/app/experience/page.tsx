/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Users, 
  Cpu, 
  Bookmark,
  Calendar,
  BookOpen
} from "lucide-react";

interface Milestone {
  id: number;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

export default function Experience() {
  const milestones: Milestone[] = [
    {
      id: 1,
      period: "Bước đầu bỡ ngỡ",
      title: "Đối mặt thử thách Kỹ năng số",
      subtitle: "Học đi đôi với hành trong kỷ nguyên số",
      description: "Nhìn lại hành trình từ những bước đầu tiên khi thiết lập trang Portfolio này cho đến khi hoàn thành bài tập cuối cùng, cảm xúc lớn nhất trong tôi là sự tự hào. Việc phải vừa tiếp thu kiến thức mới, vừa tìm cách sắp xếp, thiết kế sao cho website cá nhân trở nên trực quan không phải là một thử thách dễ dàng. Nhưng chính quá trình 'vừa học vừa làm' này đã giúp tôi thấy được sự tiến bộ rõ rệt của bản thân qua từng tuần.",
      details: [
        "Tự chủ trong thiết lập trang web học thuật cá nhân.",
        "Từng bước chuyển hóa kiến thức lý thuyết ngôn ngữ sang định dạng web trực quan.",
        "Nhận thức rõ nét về sự tiến bộ của bản thân qua từng tuần thực hành."
      ],
      icon: <Award className="h-5 w-5 text-ceramic-pink" />
    },
    {
      id: 2,
      period: "Quá trình thực hành",
      title: "Ứng dụng AI & Quản lý dữ liệu khoa học",
      subtitle: "Tương tác thông minh và có trách nhiệm với công cụ số",
      description: "Môn học đã mang lại cho tôi những bài học kỹ năng số cực kỳ thực tế. Tôi đã biết cách giao tiếp và sử dụng AI hiệu quả hơn để phục vụ học tập thay vì phụ thuộc vào nó. Đồng thời, việc quản lý dữ liệu ngăn nắp và ứng dụng các công cụ trực tuyến cũng giúp tôi phối hợp mượt mà, khoa học hơn rất nhiều khi làm việc nhóm.",
      details: [
        "Học cách viết prompt tối ưu thay vì phụ thuộc vào kết quả thô của AI.",
        "Quản lý dữ liệu học thuật khoa học, lưu trữ thông tin trực quan.",
        "Sử dụng công cụ cộng tác trực tuyến hỗ trợ thảo luận nhóm trơn tru."
      ],
      icon: <Cpu className="h-5 w-5 text-ceramic-pink" />
    },
    {
      id: 3,
      period: "Bài học cốt lõi",
      title: "Ý thức bản quyền & Bộ lọc thông tin",
      subtitle: "Nâng cao trách nhiệm trên không gian mạng",
      description: "Quan trọng hơn cả, tôi đã nâng cao được ý thức về bảo mật thông tin cá nhân và trách nhiệm tôn trọng bản quyền trên không gian mạng. Tuy nhiên, hành trình này cũng đem lại một thách thức lớn về việc chọn lọc và kiểm chứng thông tin. Giữa thời đại mạng Internet và AI bùng nổ, thông tin rất nhiều nhưng độ chính xác lại là một dấu hỏi lớn. Tôi đã phải học cách tư duy phản biện, liên tục đối chiếu giữa các nguồn để đảm bảo mỗi nội dung đưa vào bài tập đều đáng tin cậy. Vượt qua được thói quen ỷ lại đó chính là bài học lớn nhất mà tôi gặt hái được.",
      details: [
        "Tôn trọng quyền tác giả và quy chuẩn trích dẫn tài nguyên số.",
        "Phát triển tư duy phản biện, đối chiếu nguồn tài liệu nghiêm ngặt.",
        "Hình thành ý thức bảo mật dữ liệu học tập cá nhân trực tuyến."
      ],
      icon: <Users className="h-5 w-5 text-ceramic-pink" />
    },
    {
      id: 4,
      period: "Kết quả thu hoạch",
      title: "Vận dụng công cụ & Động lực nghiên cứu",
      subtitle: "Chuyển hóa tri thức học thuật thành sản phẩm thực tế",
      description: "Điều tôi cảm thấy tâm đắc nhất chính là việc khả năng vận dụng các công cụ hiện đại với sự hiểu biết, định hướng của bản thân để hoàn thiện không gian Portfolio này. Cảm giác nhìn những kiến thức trên sách vở và các sản phẩm thực hành được chuyển hóa thành một website thực tế, gọn gàng mang lại cho tôi rất nhiều động lực. Nó chứng minh rằng tôi có thể tự chủ trong việc học và làm chủ các công cụ số.",
      details: [
        "Chứng minh khả năng tự chủ học tập ngôn ngữ trong thế giới số.",
        "Chuyển hóa tri thức ngôn ngữ thành sản phẩm số trực quan, khoa học.",
        "Tự tin ứng dụng kỹ năng số vào các đề tài nghiên cứu ngôn ngữ tương lai."
      ],
      icon: <BookOpen className="h-5 w-5 text-ceramic-pink" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <div className="flex flex-col gap-12 py-4 md:py-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="border-b border-ceramic-pink/15 pb-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ceramic-pink">Reflection</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-800 mt-2">
          Tổng Kết Hành Trình
        </h1>
      </div>

      {/* Vertical Timeline container */}
      <div className="relative max-w-4xl mx-auto py-8 pl-8 md:pl-0 md:flex md:flex-col md:items-center">
        {/* Central Vertical Line (Ceramic pink themed) */}
        <div className="absolute top-0 bottom-0 left-3 md:left-1/2 w-0.5 bg-gradient-to-b from-ceramic-pink/40 via-ceramic-pink/15 to-transparent transform -translate-x-1/2" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12 w-full"
        >
          {milestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={milestone.id}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row md:justify-between w-full ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node Point (Flower Bud shape) */}
                <div className="absolute left-[-29px] md:left-1/2 top-4 w-5 h-5 rounded-full border-2 border-ceramic-pink bg-ceramic-cream z-10 transform -translate-x-1/2 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-md">
                  <div className="w-2 h-2 rounded-full bg-ceramic-mint animate-pulse" />
                </div>

                {/* Left/Right empty space on desktop to maintain balance */}
                <div className="hidden md:block w-[45%]" />

                {/* Content Card */}
                <div className="w-full md:w-[45%] bento-card p-6 hover:border-ceramic-pink/30 transition-all duration-300">
                  {/* Period Tag */}
                  <div className="flex items-center gap-1.5 text-ceramic-pink font-mono text-[10px] uppercase tracking-wider mb-3">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{milestone.period}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-ceramic-pink-light border border-ceramic-pink/10">
                      {milestone.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-slate-800 leading-tight">
                        {milestone.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-sans mt-0.5 leading-none">
                        {milestone.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4 font-sans">
                    {milestone.description}
                  </p>

                  {/* Bullet Details */}
                  <ul className="space-y-2 border-t border-ceramic-pink/10 pt-4 mt-2">
                    {milestone.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-500 leading-normal font-sans">
                        <Bookmark className="h-3 w-3 text-ceramic-pink/60 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
