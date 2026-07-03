"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const basePath = process.env.NODE_ENV === "production" ? "/HangPortfolio" : "";

  const navItems = [
    { name: "trang chủ", path: "/" },
    { name: "giới thiệu", path: "/about" },
    { name: "dự án", path: "/projects" },
    { name: "tổng kết", path: "/experience" },
    { name: "liên hệ", path: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full bg-ceramic-pink scalloped-bottom py-3 relative z-40 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Navigation Bar */}
        <div className="flex h-10 items-center justify-between">
          {/* Brand Logo / Academic Logos */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1 group">
              <span className="font-script text-2xl text-white hover:text-ceramic-yellow transition-colors duration-300">
                mhang
              </span>
            </Link>
            <span className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <img 
                src={`${basePath}/vnu_logo.png`} 
                alt="VNU Logo" 
                className="h-6 w-auto object-contain select-none" 
              />
              <img 
                src={`${basePath}/ulis_logo.png`} 
                alt="ULIS Logo" 
                className="h-6 w-auto object-contain select-none" 
              />
            </div>
          </div>

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

          {/* Mobile Hamburg Trigger */}
          <button
            onClick={toggleMenu}
            className="flex md:hidden items-center justify-center p-2 rounded-lg text-white hover:text-ceramic-yellow transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#C02B56] animate-fade-in mt-2">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-serif tracking-wider capitalize transition-colors duration-300 ${
                    isActive
                      ? "bg-white/15 text-ceramic-yellow font-bold border-l-4 border-ceramic-yellow"
                      : "text-white/80 hover:text-white"
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
