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
      // Typing
      if (currentText.length < fullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.substring(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Wait before deleting
        timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.substring(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Pause briefly before typing the next word
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 500);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="text-lunar-gold font-mono relative">
      {currentText}
      <span className="w-1.5 h-5 bg-lunar-gold absolute -right-3 bottom-0.5 animate-pulse" />
    </span>
  );
}

export default function Home() {
  // Bento Grid animations container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <div className="flex flex-col gap-12 py-6 md:py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 py-12 md:py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="font-script text-5xl md:text-7xl text-lunar-gold drop-shadow-[0_0_12px_rgba(255,217,0,0.35)]">
            Hello everyone
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white mt-2">
            Tôi là <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-lunar-gold">Nguyễn Minh Hằng</span>
          </h1>
          <div className="text-lg md:text-2xl font-medium text-slate-300 mt-2 h-8">
            <Typewriter />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-serif italic text-lg md:text-xl text-slate-400 mt-2"
        >
          “Where there is a will, there’s a way”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mt-6"
        >
          <Link
            href="/projects"
            className="px-6 py-3 rounded-full bg-lunar-gold text-[#05070C] font-semibold text-sm transition-all duration-300 hover:bg-lunar-yellow shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] transform hover:-translate-y-0.5"
          >
            Trải nghiệm Dự án
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full border border-lunar-gold/40 text-lunar-gold font-semibold text-sm transition-all duration-300 hover:bg-lunar-gold/10 hover:border-lunar-gold transform hover:-translate-y-0.5"
          >
            Liên hệ / CV
          </Link>
        </motion.div>
      </section>

      {/* Bento Grid Section */}
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
            <div className="flex items-center gap-3 text-lunar-gold mb-4">
              <GraduationCap className="h-6 w-6" />
              <span className="font-mono text-xs uppercase tracking-widest">About Me</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-lunar-gold transition-colors duration-300">
              English Linguistics & Legal Tech Researcher
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
              Tôi là sinh viên ngành Ngôn ngữ Anh tại Trường Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội (ULIS - VNU). 
              Với định hướng kết hợp nghiên cứu ngôn ngữ học thuật chặt chẽ với ứng dụng công nghệ trong pháp luật, 
              tôi mong muốn kiến tạo các giải pháp kỹ thuật số giúp tối ưu hóa công tác dịch thuật pháp lý và tiếp cận luật pháp.
            </p>
          </div>
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 text-lunar-gold hover:text-white font-medium text-sm group/link mt-4"
          >
            Tìm hiểu thêm về tôi 
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        {/* Core Skills Card (Colspan 1) */}
        <motion.div 
          variants={itemVariants} 
          className="bento-card p-6 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-3 text-lunar-gold mb-4">
              <Cpu className="h-6 w-6" />
              <span className="font-mono text-xs uppercase tracking-widest">Kỹ năng cốt lõi</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-white mb-4">
              Chuyên môn liên ngành
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Ngôn ngữ Anh", "Viết học thuật", "Linguistics Research", "Pháp luật đại cương", "Legal Tech", "NLP Simplification", "Notion Architect", "Python Basics"].map((tag) => (
                <span 
                  key={tag} 
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 font-mono text-[11px] text-slate-300 transition-colors duration-300 hover:border-lunar-gold/30 hover:text-lunar-gold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link 
            href="/about#skills" 
            className="inline-flex items-center gap-2 text-lunar-gold hover:text-white font-medium text-sm group/link mt-6"
          >
            Chi tiết kỹ năng
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        {/* Featured Project Card (Colspan 2) */}
        <motion.div 
          variants={itemVariants} 
          className="bento-card p-6 md:p-8 md:col-span-2 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-3 text-lunar-gold mb-4">
              <Scale className="h-6 w-6" />
              <span className="font-mono text-xs uppercase tracking-widest">Dự án nổi bật</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-lunar-gold transition-colors duration-300">
              Đơn giản hóa văn bản pháp lý bằng AI (Legal NLP)
            </h2>
            <p className="text-xs text-lunar-gold/80 font-mono mb-4">
              [Legal Tech Research & Digital Product]
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Dự án nghiên cứu liên ngành tập trung giải quyết bài toán thuật ngữ pháp lý phức tạp. 
              Bằng việc ứng dụng mô hình NLP (xử lý ngôn ngữ tự nhiên) kết hợp phân tích cú pháp tiếng Anh, 
              hệ thống tự động phân tích và chuyển đổi các điều khoản pháp luật rườm rà thành ngôn ngữ dễ hiểu cho đại chúng.
            </p>
          </div>
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-lunar-gold hover:text-white font-medium text-sm group/link mt-2"
          >
            Khám phá kho dự án
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        {/* Quick Info & Timeline (Colspan 1) */}
        <motion.div 
          variants={itemVariants} 
          className="bento-card p-6 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-3 text-lunar-gold mb-4">
              <Award className="h-6 w-6" />
              <span className="font-mono text-xs uppercase tracking-widest">Thành tựu</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              Mốc học tập & Nghiên cứu
            </h2>
            <ul className="space-y-3 font-sans text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-lunar-gold mt-0.5">•</span>
                <div>
                  <strong className="text-white">Sinh viên xuất sắc ULIS</strong>
                  <p className="text-slate-400 text-[10px]">Chuyên ngành Ngôn ngữ Anh</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lunar-gold mt-0.5">•</span>
                <div>
                  <strong className="text-white">Nghiên cứu khoa học cấp khoa</strong>
                  <p className="text-slate-400 text-[10px]">Đề tài ứng dụng Công nghệ trong Pháp luật</p>
                </div>
              </li>
            </ul>
          </div>
          <Link 
            href="/experience" 
            className="inline-flex items-center gap-2 text-lunar-gold hover:text-white font-medium text-sm group/link mt-6"
          >
            Xem dòng thời gian
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

        {/* Contact Info (Colspan 3) */}
        <motion.div 
          variants={itemVariants} 
          className="bento-card p-6 md:p-8 md:col-span-3 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
        >
          <div className="max-w-xl">
            <h3 className="text-xl font-serif font-bold text-white mb-2">
              Liên kết nghiên cứu & Hợp tác học thuật
            </h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Tôi luôn sẵn sàng đón nhận cơ hội tham gia các dự án nghiên cứu ngôn ngữ, EdTech, LegalTech 
              hoặc các chương trình phát triển sản phẩm số sáng tạo. Hãy kết nối để cùng thảo luận.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-slate-300 font-mono">
            <a 
              href="mailto:hanacuti0507@gmail.com" 
              className="flex items-center gap-2 text-slate-300 hover:text-lunar-gold transition-colors duration-300"
            >
              <Mail className="h-4 w-4 text-lunar-gold" />
              hanacuti0507@gmail.com
            </a>
            <a 
              href="tel:0335448265" 
              className="flex items-center gap-2 text-slate-300 hover:text-lunar-gold transition-colors duration-300"
            >
              <Phone className="h-4 w-4 text-lunar-gold" />
              0335448265
            </a>
            <a 
              href="https://www.facebook.com/dmcuocdoi.vn" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-lunar-gold transition-colors duration-300"
            >
              <svg className="h-4 w-4 text-lunar-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
