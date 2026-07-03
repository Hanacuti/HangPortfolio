"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Trang Chủ", path: "/" },
    { name: "Giới Thiệu", path: "/about" },
    { name: "Dự Án", path: "/projects" },
    { name: "Kinh Nghiệm", path: "/experience" },
    { name: "Liên Hệ", path: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F19]/70 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6 sm:px-8">
        {/* Brand Logo / Name */}
        <Link href="/" className="flex items-center gap-2 group">
          <BookOpen className="h-5 w-5 text-lunar-gold transition-transform duration-300 group-hover:scale-110" />
          <span className="font-script text-2xl md:text-3xl text-white tracking-wider transition-colors duration-300 group-hover:text-lunar-gold">
            Nguyễn Minh Hằng
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive
                    ? "text-lunar-gold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-lunar-gold shadow-[0_0_8px_#FFD700] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburg Trigger */}
        <button
          onClick={toggleMenu}
          className="flex md:hidden items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0B0F19]/95 backdrop-blur-lg animate-fade-in">
          <nav className="flex flex-col p-4 gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors duration-300 ${
                    isActive
                      ? "bg-lunar-gold/10 text-lunar-gold border-l-2 border-lunar-gold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
