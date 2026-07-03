"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen, Scale } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "trang chủ", path: "/" },
    { name: "giới thiệu", path: "/about" },
    { name: "dự án", path: "/projects" },
    { name: "kinh nghiệm", path: "/experience" },
    { name: "liên hệ", path: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full bg-ceramic-pink scalloped-bottom pt-4 pb-8 md:pb-10 relative z-40 transition-all duration-300">
      {/* Embedded circular design elements in the pink band (Tactile Ceramic Detail) */}
      <div className="absolute left-6 bottom-4 hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-ceramic-pink-light border-2 border-white/20 ceramic-shadow overflow-hidden transform rotate-[-12deg]">
        <BookOpen className="h-6 w-6 text-ceramic-pink" />
      </div>
      
      <div className="absolute right-6 bottom-3 hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-ceramic-yellow border-2 border-white/20 ceramic-shadow overflow-hidden transform rotate-[15deg]">
        <Scale className="h-6 w-6 text-slate-800" />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Top Row: Brand & Menu Links & Active Badge */}
        <div className="flex h-12 items-center justify-between">
          {/* Brand Logo / Name */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-script text-2xl text-white hover:text-ceramic-yellow transition-colors duration-300">
              mhang
            </span>
            <span className="font-mono text-[9px] text-white/60 bg-white/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
              researcher
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-xs font-serif tracking-wider capitalize py-1 transition-all duration-300 relative ${
                    isActive
                      ? "text-ceramic-yellow font-bold border-b border-ceramic-yellow/60"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Status Badge (Mint Green) */}
          <div className="hidden md:flex items-center">
            <span className="bg-ceramic-mint text-white font-mono text-[10px] font-semibold px-3.5 py-1.5 rounded-full ceramic-shadow hover:scale-105 transition-all duration-300">
              đang hoạt động
            </span>
          </div>

          {/* Mobile Hamburg Trigger */}
          <button
            onClick={toggleMenu}
            className="flex md:hidden items-center justify-center p-2 rounded-lg text-white hover:text-ceramic-yellow transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Center Text: The Linguistics */}
        <div className="text-center mt-4 md:mt-6">
          <Link href="/" className="inline-block group">
            <h1 className="font-serif italic text-3xl md:text-5xl font-extrabold text-white tracking-wide transition-transform duration-500 group-hover:scale-[1.02]">
              the linguistics
            </h1>
          </Link>
          <p className="text-[10px] md:text-xs font-mono text-white/70 mt-1 uppercase tracking-widest">
            working with languages is a tactile experience
          </p>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#C02B56] animate-fade-in mt-3">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-serif tracking-wider capitalize transition-colors duration-300 ${
                    isActive
                      ? "bg-white/15 text-ceramic-yellow font-bold border-l-4 border-ceramic-yellow"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-2 px-4">
              <span className="inline-block bg-ceramic-mint text-white font-mono text-[10px] px-3 py-1 rounded-full text-center w-full">
                đang hoạt động
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
