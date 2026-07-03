"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <span className="text-ceramic-pink font-serif italic relative inline-block">
      {/* u00A0 keeps line height constant to prevent cursor vertical jumping when empty */}
      {currentText || "\u00A0"}
      <span className="w-1 h-5 bg-ceramic-pink absolute -right-2 bottom-0.5 animate-pulse" />
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-6xl mx-auto py-12 px-6">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-script text-4xl md:text-5xl text-ceramic-pink leading-none">
            Hello everyone
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold tracking-tight text-white mt-3">
            I&apos;m <span className="text-ceramic-pink font-serif">Nguyễn Minh Hằng</span>
          </h1>
          <div className="text-lg md:text-2xl font-medium text-slate-300 mt-2 h-8">
            <Typewriter />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mt-6"
        >
          <Link
            href="/projects"
            className="px-8 py-3 rounded-full bg-ceramic-mint hover:bg-ceramic-mint/90 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 ceramic-shadow"
          >
            Trải nghiệm Dự án
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 rounded-full border border-ceramic-pink/40 text-ceramic-pink hover:bg-ceramic-pink-light hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105"
          >
            Giới thiệu bản thân
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
