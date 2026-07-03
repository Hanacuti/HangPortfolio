/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Award, 
  Users, 
  Cpu, 
  Bookmark,
  Calendar
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
      period: "09/2023 - Hiện tại",
      title: "Sinh viên khoa Ngôn ngữ Anh",
      subtitle: "Trường Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội (ULIS - VNU)",
      description: "Học tập chuyên sâu về ngôn ngữ học tiếng Anh, phân tích diễn ngôn và viết học thuật chuyên nghiệp.",
      details: [
        "Đạt điểm xuất sắc các học phần Viết học thuật và Dịch thuật Anh-Việt chuyên ngành.",
        "Tích cực tham gia các hội thảo khoa học sinh viên tại trường.",
        "Xây dựng phương pháp tự học và quản lý tài liệu nghiên cứu hiệu quả."
      ],
      icon: <GraduationCap className="h-5 w-5 text-ceramic-pink" />
    },
    {
      id: 2,
      period: "06/2024 - 10/2024",
      title: "Nghiên cứu đối chiếu Thuật ngữ Hợp đồng Thương mại",
      subtitle: "Đề án Nghiên cứu Khoa học Sinh viên cấp khoa",
      description: "Thực hiện phân tích đối sánh ngữ nghĩa và ngữ cảnh của thuật ngữ pháp lý trong hệ thống Common Law tiếng Anh và luật Việt Nam.",
      details: [
        "Thu thập và xử lý bộ ngữ liệu (Corpus) gồm 50 hợp đồng mẫu quốc tế.",
        "Chỉ ra các lỗi sai phổ biến của người dịch không chuyên khi chuyển ngữ từ khóa pháp lý.",
        "Hoàn thiện cẩm nang hướng dẫn dài 40 trang phục vụ học tập."
      ],
      icon: <Award className="h-5 w-5 text-ceramic-pink" />
    },
    {
      id: 3,
      period: "10/2024 - 02/2025",
      title: "Đồng sáng lập & Điều phối nhóm 'Legal Tech Students'",
      subtitle: "Dự án liên ngành Ngoại ngữ & Công nghệ thông tin",
      description: "Kết nối sinh viên chuyên ngành Ngôn ngữ Anh và Công nghệ thông tin để cùng nhau nghiên cứu giải pháp đơn giản hóa thuật ngữ luật.",
      details: [
        "Tổ chức các buổi làm việc nhóm thiết lập cơ sở dữ liệu thuật ngữ.",
        "Quản lý tiến độ dự án bằng mô hình Kanban trực quan.",
        "Xây dựng thành công đề cương chi tiết cho sản phẩm chatbot tra cứu song ngữ."
      ],
      icon: <Users className="h-5 w-5 text-ceramic-pink" />
    },
    {
      id: 4,
      period: "03/2025 - Hiện tại",
      title: "Phát triển công cụ NLP rút gọn văn bản pháp lý",
      subtitle: "Ứng dụng Công nghệ trong Pháp luật (Legal Tech)",
      description: "Nghiên cứu áp dụng các thuật toán xử lý ngôn ngữ tự nhiên (NLP) cơ bản bằng Python để rút gọn câu tiếng Anh pháp luật dài.",
      details: [
        "Viết mã Python xử lý tách từ và phân tích cú pháp câu điều khoản mẫu.",
        "Phát triển hệ thống quy tắc ngữ pháp giúp tái cơ cấu câu dài thành các câu đơn dễ hiểu.",
        "Thử nghiệm công cụ đạt tỷ lệ cải thiện chỉ số dễ đọc vượt trội."
      ],
      icon: <Cpu className="h-5 w-5 text-ceramic-pink" />
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
        <span className="font-mono text-[10px] uppercase tracking-widest text-ceramic-pink">Timeline</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-800 mt-2">
          Kinh Nghiệm & Thành Tựu
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
                    {milestones[idx].details.map((detail, dIdx) => (
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
