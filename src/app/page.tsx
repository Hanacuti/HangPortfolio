/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  GraduationCap, 
  Cpu, 
  Scale, 
  Award, 
  Mail, 
  Phone
} from "lucide-react";

const words = [
  "English Linguistics Student",
  "Legal Tech Researcher",
  "Academic Writer & Editor",
  "ULIS - VNU Student"
];

// Typewriter Effect Component
function Typewriter() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIndex];

    if (!isDeleting) {
      if (currentText.length < fullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.substring(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.substring(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 500);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="text-ceramic-pink font-serif italic relative">
      {currentText}
      <span className="w-1 h-5 bg-ceramic-pink absolute -right-2 bottom-0.5 animate-pulse" />
    </span>
  );
}

export default function Home() {
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
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      } as any
    },
  };

  return (
    <div className="flex flex-col gap-8 py-4 md:py-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-4 py-8 md:py-12 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-script text-4xl md:text-5xl text-ceramic-pink leading-none">
            hello everyone
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-extrabold tracking-tight text-slate-800 mt-2">
            Tôi là <span className="text-ceramic-pink font-serif">Nguyễn Minh Hằng</span>
          </h1>
          <div className="text-base md:text-xl font-medium text-slate-500 mt-1 h-6">
            <Typewriter />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mt-4"
        >
          <Link
            href="/projects"
            className="px-6 py-2.5 rounded-full bg-ceramic-mint text-white font-semibold text-xs tracking-wider uppercase transition-transform duration-300 hover:scale-105 ceramic-shadow"
          >
            Trải nghiệm Dự án
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full border border-ceramic-pink/30 text-ceramic-pink hover:bg-ceramic-pink-light/50 font-semibold text-xs tracking-wider uppercase transition-transform duration-300 hover:scale-105"
          >
            Liên hệ / CV
          </Link>
        </motion.div>
      </section>

      {/* Sub-Header Handcrafted Ceramic Quote */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col items-center text-center gap-3 py-6 max-w-xl mx-auto my-2"
      >
        {/* Flower garland SVG decoration */}
        <div className="w-16 h-16 rounded-full bg-ceramic-pink-light border border-ceramic-pink/20 flex items-center justify-center ceramic-shadow">
          <svg className="w-8 h-8 text-ceramic-pink fill-current" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="10" fill="#FFD166" />
            <circle cx="50" cy="30" r="8" fill="#D83D6C" />
            <circle cx="50" cy="70" r="8" fill="#D83D6C" />
            <circle cx="30" cy="50" r="8" fill="#D83D6C" />
            <circle cx="70" cy="50" r="8" fill="#D83D6C" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-800 tracking-tight leading-relaxed">
          &ldquo;Working with language <br />
          is a <span className="text-ceramic-pink italic">tactile experience.</span>&rdquo;
        </h2>
        <div className="w-24 h-0.5 bg-ceramic-pink/20 rounded-full mt-1" />
      </motion.section>

      {/* Bento Grid Section (Glazed Tiles Look) */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* About Me Card (Colspan 2) */}
        <motion.div 
          variants={itemVariants} 
          className="bento-card p-6 md:p-8 md:col-span-2 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-2 text-ceramic-pink mb-4">
              <GraduationCap className="h-5 w-5" />
              <span className="font-mono text-[10px] uppercase tracking-widest">About Me</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4 group-hover:text-ceramic-pink transition-colors duration-300">
              English Linguistics & Legal Tech Researcher
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
              Tôi là sinh viên ngành Ngôn ngữ Anh tại Trường Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội (ULIS - VNU). 
              Với định hướng kết hợp nghiên cứu ngôn ngữ học thuật chặt chẽ với ứng dụng công nghệ trong pháp luật, 
              tôi mong muốn kiến tạo các giải pháp kỹ thuật số giúp tối ưu hóa công tác dịch thuật pháp lý và tiếp cận luật pháp.
            </p>
          </div>
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 text-ceramic-pink hover:text-slate-800 font-semibold text-xs tracking-wider uppercase group/link mt-4"
          >
            Tìm hiểu thêm về tôi 
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        {/* Core Skills Card (Colspan 1) */}
        <motion.div 
          variants={itemVariants} 
          className="bento-card p-6 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-2 text-ceramic-pink mb-4">
              <Cpu className="h-5 w-5" />
              <span className="font-mono text-[10px] uppercase tracking-widest">Kỹ năng</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-slate-800 mb-4">
              Chuyên môn liên ngành
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Ngôn ngữ Anh", 
                "Viết học thuật", 
                "Linguistics Research", 
                "Pháp luật đại cương", 
                "Legal Tech", 
                "NLP Simplification", 
                "Notion Architect", 
                "Python Basics"
              ].map((tag) => (
                <span 
                  key={tag} 
                  className="px-2.5 py-1 rounded-lg bg-ceramic-cream border border-ceramic-pink/10 font-mono text-[9px] text-slate-600 transition-colors duration-300 hover:border-ceramic-pink/30 hover:text-ceramic-pink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link 
            href="/about#skills" 
            className="inline-flex items-center gap-2 text-ceramic-pink hover:text-slate-800 font-semibold text-xs tracking-wider uppercase group/link mt-6"
          >
            Chi tiết kỹ năng
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        {/* Featured Project Card (Colspan 2) */}
        <motion.div 
          variants={itemVariants} 
          className="bento-card p-6 md:p-8 md:col-span-2 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-2 text-ceramic-pink mb-4">
              <Scale className="h-5 w-5" />
              <span className="font-mono text-[10px] uppercase tracking-widest">Dự án nổi bật</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2 group-hover:text-ceramic-pink transition-colors duration-300">
              Đơn giản hóa văn bản pháp lý bằng AI (Legal NLP)
            </h2>
            <p className="text-[10px] text-ceramic-pink font-mono mb-4 uppercase tracking-wider">
              [Legal Tech Research & Digital Product]
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Dự án nghiên cứu liên ngành tập trung giải quyết bài toán thuật ngữ pháp lý phức tạp. 
              Bằng việc ứng dụng mô hình NLP (xử lý ngôn ngữ tự nhiên) kết hợp phân tích cú pháp tiếng Anh, 
              hệ thống tự động phân tích và chuyển đổi các điều khoản pháp luật rườm rà thành ngôn ngữ dễ hiểu cho đại chúng.
            </p>
          </div>
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-ceramic-pink hover:text-slate-800 font-semibold text-xs tracking-wider uppercase group/link mt-2"
          >
            Khám phá kho dự án
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        {/* Quick Info & Timeline (Colspan 1) */}
        <motion.div 
          variants={itemVariants} 
          className="bento-card p-6 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-2 text-ceramic-pink mb-4">
              <Award className="h-5 w-5" />
              <span className="font-mono text-[10px] uppercase tracking-widest">Thành tựu</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-slate-800 mb-3">
              Mốc học tập & Nghiên cứu
            </h2>
            <ul className="space-y-3 font-sans text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-ceramic-pink mt-0.5">•</span>
                <div>
                  <strong className="text-slate-800 font-medium">Sinh viên xuất sắc ULIS</strong>
                  <p className="text-slate-500 text-[10px]">Chuyên ngành Ngôn ngữ Anh</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ceramic-pink mt-0.5">•</span>
                <div>
                  <strong className="text-slate-800 font-medium">Nghiên cứu khoa học cấp khoa</strong>
                  <p className="text-slate-500 text-[10px]">Đề tài ứng dụng Công nghệ trong Pháp luật</p>
                </div>
              </li>
            </ul>
          </div>
          <Link 
            href="/experience" 
            className="inline-flex items-center gap-2 text-ceramic-pink hover:text-slate-800 font-semibold text-xs tracking-wider uppercase group/link mt-6"
          >
            Xem dòng thời gian
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        {/* Contact Info (Colspan 3) */}
        <motion.div 
          variants={itemVariants} 
          className="bento-card p-6 md:p-8 md:col-span-3 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
        >
          <div className="max-w-xl">
            <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">
              Liên kết nghiên cứu & Hợp tác học thuật
            </h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Tôi luôn sẵn sàng đón nhận cơ hội tham gia các dự án nghiên cứu ngôn ngữ, EdTech, LegalTech 
              hoặc các chương trình phát triển sản phẩm số sáng tạo. Hãy kết nối để cùng thảo luận.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 text-xs text-slate-600 font-mono">
            <a 
              href="mailto:hanacuti0507@gmail.com" 
              className="flex items-center gap-1.5 text-slate-600 hover:text-ceramic-pink transition-colors duration-300"
            >
              <Mail className="h-3.5 w-3.5 text-ceramic-pink" />
              hanacuti0507@gmail.com
            </a>
            <a 
              href="tel:0335448265" 
              className="flex items-center gap-1.5 text-slate-600 hover:text-ceramic-pink transition-colors duration-300"
            >
              <Phone className="h-3.5 w-3.5 text-ceramic-pink" />
              0335448265
            </a>
            <a 
              href="https://www.facebook.com/dmcuocdoi.vn" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-600 hover:text-ceramic-pink transition-colors duration-300"
            >
              <svg className="h-3.5 w-3.5 text-ceramic-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Facebook
            </a>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
