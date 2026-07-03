"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Target, 
  Compass, 
  BookOpen, 
  Terminal, 
  Scale, 
  Users 
} from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
    },
  };

  const skillCategories = [
    {
      title: "Ngôn ngữ học & Viết",
      icon: <BookOpen className="h-5 w-5 text-lunar-gold" />,
      skills: [
        { name: "Ngôn ngữ Anh học thuật", desc: "Sử dụng thành thạo từ vựng, văn phong học thuật cao cấp." },
        { name: "Phân tích Văn bản", desc: "Nghiên cứu cấu trúc ngữ pháp, ngữ nghĩa và diễn ngôn." },
        { name: "Biên tập & Hiệu đính", desc: "Tự kiểm duyệt, sửa đổi cấu trúc bài viết khoa học chặt chẽ." },
        { name: "Viết báo cáo Khoa học", desc: "Triển khai luận điểm rõ ràng kèm minh chứng thực tế." },
      ]
    },
    {
      title: "Nghiên cứu & Pháp lý",
      icon: <Scale className="h-5 w-5 text-lunar-gold" />,
      skills: [
        { name: "Phương pháp Nghiên cứu", desc: "Quy trình thiết kế nghiên cứu từ tổng quan đến thực nghiệm." },
        { name: "Luật Đại cương Việt Nam", desc: "Nắm vững lý luận nhà nước và hệ thống pháp luật cơ bản." },
        { name: "Tra cứu Văn bản Pháp luật", desc: "Khai thác cơ sở dữ liệu luật Việt Nam và quốc tế." },
        { name: "Đơn giản hóa Thuật ngữ", desc: "Lọc bỏ biệt ngữ, giải nghĩa từ khó cho người không chuyên." },
      ]
    },
    {
      title: "Công nghệ & Ứng dụng",
      icon: <Terminal className="h-5 w-5 text-lunar-gold" />,
      skills: [
        { name: "Python Basics", desc: "Viết script cơ bản xử lý chuỗi văn bản và tự động hóa tác vụ." },
        { name: "NLP Basics (NLTK/SpaCy)", desc: "Xử lý ngôn ngữ tự nhiên: tách từ, phân tích cú pháp." },
        { name: "Notion Architecture", desc: "Xây dựng hệ thống quản lý công việc và tài liệu khoa học." },
        { name: "LaTeX & Markdown", desc: "Soạn thảo văn bản học thuật với cấu trúc toán học, thư mục chuẩn." },
      ]
    },
    {
      title: "Kỹ năng Làm việc",
      icon: <Users className="h-5 w-5 text-lunar-gold" />,
      skills: [
        { name: "Quản lý Nhóm Khoa học", desc: "Điều phối tiến độ nghiên cứu và thúc đẩy thành viên." },
        { name: "Tư duy Phản biện", desc: "Đánh giá đa chiều luận điểm khoa học và bằng chứng thực tế." },
        { name: "Giao tiếp Học thuật", desc: "Thuyết trình và viết email phản hồi chuyên gia, tạp chí." },
        { name: "Lập Kế hoạch Dự án", desc: "Sử dụng mô hình Agile/Kanban tối ưu hóa hiệu suất nghiên cứu." },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-16 py-6 md:py-12">
      {/* Title Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-white/5 pb-8"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-lunar-gold">Introduce</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">
          Giới Thiệu Bản Thân
        </h1>
      </motion.div>

      {/* Main Biography Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left column - Quick Profile Info Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 bento-card p-6 md:p-8 flex flex-col justify-between"
        >
          <div className="flex flex-col items-center text-center">
            {/* Sealed Badge Graphic */}
            <div className="w-24 h-24 rounded-full bg-lunar-gold/5 border border-lunar-gold/20 flex items-center justify-center mb-6 relative group">
              <div className="absolute inset-0 rounded-full bg-lunar-gold/5 blur-md group-hover:bg-lunar-gold/10 transition-colors" />
              <GraduationCap className="h-10 w-10 text-lunar-gold relative" />
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-white">Nguyễn Minh Hằng</h2>
            <p className="text-sm text-lunar-gold font-mono mt-1">Linguistics & Legal Tech Researcher</p>
            
            <div className="w-full border-t border-white/5 my-6" />
            
            <div className="w-full text-left space-y-4 text-sm text-slate-300 font-sans">
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono text-xs">ĐẠI HỌC:</span>
                <span className="text-white font-medium text-right">ĐH Ngoại ngữ - ĐHQGHN (ULIS)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono text-xs">CHUYÊN NGÀNH:</span>
                <span className="text-white font-medium text-right">Ngôn ngữ Anh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono text-xs">ĐỊNH HƯỚNG:</span>
                <span className="text-lunar-gold font-medium text-right">Ứng dụng CNTT trong Luật</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-500 font-mono">
            ULIS VNU Student • Academic Portfolio
          </div>
        </motion.div>

        {/* Right column - Academic Statements */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Tuyên ngôn mục tiêu */}
          <div className="bento-card p-6 md:p-8">
            <div className="flex items-center gap-3 text-lunar-gold mb-4">
              <Target className="h-5 w-5" />
              <h3 className="font-mono text-xs uppercase tracking-widest">Tuyên ngôn mục tiêu</h3>
            </div>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-sans">
              Trong năm học này, tôi tập trung nâng cấp chất lượng nghiên cứu theo hướng <strong>&quot;Chuẩn học thuật&quot;</strong>: 
              có cấu trúc chặt chẽ, luận điểm đi kèm ví dụ/minh chứng thực tế và quy trình nghiêm ngặt tự kiểm duyệt trước khi xuất bản. 
              Mục tiêu ngắn hạn là làm chủ kỹ năng viết báo cáo khoa học, xây dựng sản phẩm số và tối ưu hóa hiệu suất làm việc nhóm. 
              Tầm nhìn dài hạn là nghiên cứu giải pháp ứng dụng công nghệ nhằm hỗ trợ học tập và thực thi pháp luật một cách minh bạch, an toàn.
            </p>
          </div>

          {/* Tầm nhìn nghiên cứu */}
          <div className="bento-card p-6 md:p-8">
            <div className="flex items-center gap-3 text-lunar-gold mb-4">
              <Compass className="h-5 w-5" />
              <h3 className="font-mono text-xs uppercase tracking-widest">Định hướng nghiên cứu</h3>
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

      {/* Core Skills Grid Section */}
      <section id="skills" className="flex flex-col gap-8">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-serif font-bold text-white">Lưới Kỹ Năng Cốt Lõi</h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div 
              key={category.title}
              variants={itemVariants}
              className="bento-card p-6 md:p-8 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                {category.icon}
                <h3 className="text-lg font-serif font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <div 
                    key={skill.name}
                    className="p-4 rounded-xl border border-white/5 bg-[#0B0F19]/40 hover:border-lunar-gold/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#0B0F19]/60"
                  >
                    <h4 className="text-sm font-semibold text-lunar-gold mb-1 font-sans">{skill.name}</h4>
                    <p className="text-xs text-slate-400 leading-normal font-sans">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
