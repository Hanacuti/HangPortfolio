/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  GraduationCap, 
  Cpu
} from "lucide-react";

const words = [
  "ULIS - VNU Student",
  "English Linguistics Student"
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
            Hello everyone
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-extrabold tracking-tight text-slate-800 mt-2">
            I&apos;m <span className="text-ceramic-pink font-serif">Nguyễn Minh Hằng</span>
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
            href="/about"
            className="px-6 py-2.5 rounded-full border border-ceramic-pink/30 text-ceramic-pink hover:bg-ceramic-pink-light/50 font-semibold text-xs tracking-wider uppercase transition-transform duration-300 hover:scale-105"
          >
            Giới thiệu bản thân
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

      {/* Bento Grid Section (Only 2 cards in a single row) */}
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
            href="/about" 
            className="inline-flex items-center gap-2 text-ceramic-pink hover:text-slate-800 font-semibold text-xs tracking-wider uppercase group/link mt-6"
          >
            Chi tiết kỹ năng
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
