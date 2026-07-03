"use client";

import React, { useState } from "react";
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Compass, 
  ArrowRight,
  Bookmark,
  Globe
} from "lucide-react";
import {
  ScallopedMirrorFrame,
  LocketFrame,
  GarlandFrame,
  TimNoveSculpture,
  LouisEdSculpture,
  JordanSculpture,
  BoingSculpture,
  TulipVaseArt,
  PalmTreeArt,
  PinkFaceArt,
  EveCandleArt,
  VintagePlateArt,
  FloatingFoliage
} from "../components/DecorativeFrames";

// Define product type for interactive prototype
interface ProductDetail {
  title: string;
  price: string;
  description: string;
  badge: string;
  art: React.ReactNode;
  additionalArt?: React.ReactNode;
}

export default function CeramicsBoutique() {
  // Define available products for interaction
  const products: Record<string, ProductDetail> = {
    tulip: {
      title: "Tulip",
      price: "$210",
      description: "Ở Bồ Đào Nha (Portugal), chân nến và bình hoa dáng Tulip này được nhào nặn khéo léo tạo hình ba bông hoa khoe sắc, sau đó phủ một lớp men bóng sang trọng. Một tác phẩm nghệ thuật xúc giác hoàn hảo cho không gian ấm cúng của bạn.",
      badge: "Best Seller",
      art: <TulipVaseArt />,
      additionalArt: <TulipVaseArt />
    },
    tim_nove: {
      title: "Tim Nove",
      price: "$185",
      description: "Tác phẩm điêu khắc gốm bầu dục tone màu hồng đào mịn màng. Được chế tác với chiếc mũi màu đất nung và đôi mắt khép nhẹ thư thái. Thể hiện sự bình yên và chất thơ của nghệ thuật nặn đất thủ công.",
      badge: "Limited Edition",
      art: <TimNoveSculpture />,
      additionalArt: <PinkFaceArt />
    },
    louis_ed: {
      title: "Louis Ed",
      price: "$195",
      description: "Khối gốm vuông bo góc tông xanh bạc hà thanh mát, nổi bật với tạo hình một con mắt trừu tượng tinh nghịch kiểu cổ điển, kết hợp chiếc mũi đất sét vàng tươi nổi bật. Mang nét phá cách nghệ thuật đương đại.",
      badge: "New Release",
      art: <LouisEdSculpture />,
      additionalArt: <PalmTreeArt />
    },
    jordan: {
      title: "Jordan",
      price: "$220",
      description: "Kiệt tác gốm hình giọt nước màu xanh lam nhạt đính kèm những cành hoa trắng muốt trên tóc và các chi tiết dát vàng lấp lánh nhẹ. Đôi mắt cười dịu dàng mang lại may mắn và niềm vui cho căn nhà.",
      badge: "Artisan Choice",
      art: <JordanSculpture />,
      additionalArt: <VintagePlateArt />
    },
    boing: {
      title: "Boing",
      price: "$160",
      description: "Tạo hình tròn trĩnh màu đất nung Terracotta ấm áp cùng chiếc kính gọng tròn xoắn ốc ngộ nghĩnh, chiếc mũi to tròn đỏ và nụ cười lượn sóng tinh nghịch. Đậm chất hoài cổ và vui nhộn của ký ức.",
      badge: "Playful Clay",
      art: <BoingSculpture />,
      additionalArt: <EveCandleArt />
    }
  };

  // State to track currently viewed product on the Right Page
  const [selectedKey, setSelectedKey] = useState<string>("tulip");
  const currentProduct = products[selectedKey];

  return (
    <div className="min-h-screen bg-ceramic-cream py-6 px-4 md:py-12 md:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      
      {/* Top Navigation / Brand Info */}
      <div className="flex justify-between items-center px-4 font-mono text-xs text-ceramic-pink font-semibold">
        <div className="flex items-center gap-1">
          <Compass className="h-4 w-4 animate-spin-slow" />
          <span>EST. 2026</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-ceramic-pink-light/30 px-3 py-1 rounded-full border border-ceramic-pink/10">
            tactile experience
          </span>
          <span className="hidden sm:inline">★ handcrafted catalog</span>
        </div>
      </div>

      {/* Main Catalogue Book Container */}
      <div className="w-full bg-[#FFFDF9] border border-ceramic-pink/15 rounded-[2rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 divide-y-4 lg:divide-y-0 lg:divide-x-4 lg:divide-dashed lg:divide-ceramic-pink/20">
        
        {/* ======================================================== */}
        {/* LEFT PAGE: SHOP PAGE                                     */}
        {/* ======================================================== */}
        <div className="flex flex-col justify-between min-h-[700px] bg-[#FFFDF9] pb-8 relative">
          {/* Header Banner - Scalloped bottom edge */}
          <div className="scallop-border-bottom bg-ceramic-pink text-white py-6 px-8 flex justify-between items-center relative">
            <div className="flex items-center gap-3">
              <span className="font-script text-2xl text-ceramic-pink-light">love</span>
              <Heart className="h-4 w-4 fill-ceramic-pink-light text-ceramic-pink-light animate-pulse" />
            </div>
            
            <h1 className="font-serif italic font-extrabold text-2xl md:text-3xl tracking-widest text-center text-white">
              The ceramics
            </h1>
            
            {/* Embedded small circular sketches */}
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center p-1">
                <svg className="w-full h-full text-white fill-current" viewBox="0 0 100 100">
                  <path d="M50 20 C35 20, 30 40, 30 60 C30 80, 40 85, 50 85 C60 85, 70 80, 70 60 C70 40, 65 20, 50 20 Z" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center p-1.5">
                <svg className="w-full h-full text-white fill-none stroke-current" viewBox="0 0 100 100" strokeWidth="6">
                  <circle cx="50" cy="40" r="15" />
                  <path d="M20,80 Q50,55 80,80" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sub-Header Section */}
          <div className="mt-8 px-6 text-center flex flex-col items-center gap-4">
            <GarlandFrame>
              <div className="w-full h-full scale-105">
                <VintagePlateArt />
              </div>
            </GarlandFrame>
            <p className="font-serif italic text-base md:text-lg text-ceramic-dark max-w-md mt-2">
              &quot;Working with clay is a tactile experience.&quot;
            </p>
            <div className="w-16 h-0.5 bg-ceramic-pink/20" />
          </div>

          {/* Pink Shop Section */}
          <div className="px-6 my-8">
            <div className="flex justify-between items-end mb-4 border-b border-ceramic-pink/15 pb-2">
              <h2 className="font-script text-3xl text-ceramic-pink font-bold">
                Pink Shop.
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Click to explore details
              </span>
            </div>
            
            {/* Grid of 4 decorative mirror frames */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              <button 
                onClick={() => setSelectedKey("tim_nove")}
                className={`transition-all duration-300 focus:outline-none ${selectedKey === "tim_nove" ? "scale-105 filter drop-shadow-md" : "hover:scale-102"}`}
              >
                <ScallopedMirrorFrame label="tim nove">
                  <TimNoveSculpture />
                </ScallopedMirrorFrame>
              </button>
              
              <button 
                onClick={() => setSelectedKey("louis_ed")}
                className={`transition-all duration-300 focus:outline-none ${selectedKey === "louis_ed" ? "scale-105 filter drop-shadow-md" : "hover:scale-102"}`}
              >
                <ScallopedMirrorFrame label="louis ed">
                  <LouisEdSculpture />
                </ScallopedMirrorFrame>
              </button>

              <button 
                onClick={() => setSelectedKey("jordan")}
                className={`transition-all duration-300 focus:outline-none ${selectedKey === "jordan" ? "scale-105 filter drop-shadow-md" : "hover:scale-102"}`}
              >
                <ScallopedMirrorFrame label="jordan">
                  <JordanSculpture />
                </ScallopedMirrorFrame>
              </button>

              <button 
                onClick={() => setSelectedKey("boing")}
                className={`transition-all duration-300 focus:outline-none ${selectedKey === "boing" ? "scale-105 filter drop-shadow-md" : "hover:scale-102"}`}
              >
                <ScallopedMirrorFrame label="boing">
                  <BoingSculpture />
                </ScallopedMirrorFrame>
              </button>
            </div>
          </div>

          {/* Works of the Week Section */}
          <div className="mx-6 p-6 bg-ceramic-blue/40 border border-ceramic-blue/60 rounded-3xl relative overflow-hidden">
            {/* Tiny stars decorations */}
            <Sparkles className="absolute top-3 right-3 h-4 w-4 text-ceramic-pink/40 animate-pulse" />
            
            <h3 className="font-serif italic font-bold text-lg text-ceramic-pink mb-4 flex items-center gap-2">
              <span>Works of the week</span>
              <span className="w-8 h-px bg-ceramic-pink/20" />
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
              <div className="flex items-center gap-3 bg-white/40 p-2.5 rounded-2xl border border-white/50 shadow-sm">
                <LocketFrame size="sm">
                  <TulipVaseArt />
                </LocketFrame>
                <div className="text-left font-serif">
                  <h4 className="text-sm font-bold text-ceramic-pink">Floral Composition</h4>
                  <p className="text-[10px] font-mono text-slate-500">Edition 1/5</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/40 p-2.5 rounded-2xl border border-white/50 shadow-sm">
                <div className="scale-75">
                  <GarlandFrame>
                    <PalmTreeArt />
                  </GarlandFrame>
                </div>
                <div className="text-left font-serif">
                  <h4 className="text-sm font-bold text-ceramic-pink">Clay Oasis</h4>
                  <p className="text-[10px] font-mono text-slate-500">Edition 2/5</p>
                </div>
              </div>
            </div>
          </div>

          {/* About/Intro Text */}
          <div className="mt-8 px-6 relative">
            <FloatingFoliage className="absolute -top-12 -left-6 transform rotate-45 scale-75" />
            <FloatingFoliage className="absolute -bottom-8 -right-6 transform -rotate-12 scale-75" />
            
            <div className="border-t border-ceramic-pink/15 pt-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 text-left">
                <h4 className="font-serif italic font-bold text-base text-ceramic-pink mb-2">
                  I love pink is a place that opens up new masters
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Tại xưởng gốm nhỏ xinh của chúng tôi, đất sét không chỉ được nặn bằng tay, mà còn được gửi gắm những câu chuyện đầy cảm xúc. Mỗi sản phẩm là một cá tính độc bản, một tác phẩm nghệ thuật chứa đựng sự mộc mạc và rung cảm xúc giác độc nhất vô nhị.
                </p>
              </div>
              
              {/* Locket Frames */}
              <div className="flex gap-2">
                <LocketFrame size="sm">
                  <VintagePlateArt />
                </LocketFrame>
                <LocketFrame size="sm">
                  <PinkFaceArt />
                </LocketFrame>
              </div>
            </div>
          </div>

          {/* UI Mint green buttons */}
          <div className="mt-8 px-6 flex justify-start">
            <button 
              onClick={() => setSelectedKey("tulip")}
              className="bg-ceramic-mint hover:bg-ceramic-mint-dark text-white rounded-full font-serif font-bold text-xs tracking-wider uppercase px-6 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <span>Xem bình hoa Tulip mặc định</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PAGE: PRODUCT PAGE                                 */}
        {/* ======================================================== */}
        <div className="flex flex-col justify-between min-h-[700px] bg-[#FFFDF9] pb-8 relative">
          
          {/* Header Banner - Scalloped bottom edge */}
          <div className="scallop-border-bottom bg-ceramic-pink text-white py-6 px-8 flex justify-between items-center relative">
            <div className="flex items-center gap-2 text-xs font-mono">
              <Sparkles className="h-3 w-3 animate-spin-slow text-ceramic-pink-light" />
              <span>Detail Page</span>
            </div>
            
            <span className="font-serif italic font-bold text-sm tracking-wide text-white/90">
              Product details
            </span>

            <div className="flex items-center gap-3">
              <Bookmark className="h-4 w-4 text-white/70 hover:text-white cursor-pointer" />
              <ShoppingBag className="h-4 w-4 text-white/70 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="mt-8 px-8 flex flex-col md:flex-row gap-8 items-center">
            {/* Dynamic details */}
            <div className="flex-1 text-left space-y-4">
              <div className="inline-block bg-ceramic-pink-light/35 border border-ceramic-pink/15 px-3 py-1 rounded-full text-[10px] font-mono text-ceramic-pink uppercase tracking-widest font-bold">
                {currentProduct.badge}
              </div>
              <h2 className="font-serif font-black text-4xl text-ceramic-pink tracking-tight leading-none">
                {currentProduct.title}
              </h2>
              <div className="text-2xl font-serif font-extrabold text-ceramic-mint-dark">
                {currentProduct.price}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans border-l-2 border-ceramic-pink/20 pl-3">
                {currentProduct.description}
              </p>
              
              <div className="pt-2">
                <button className="bg-ceramic-mint hover:bg-ceramic-mint-dark text-white rounded-full font-serif font-bold text-xs tracking-wider uppercase px-6 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Mua tác phẩm này</span>
                </button>
              </div>
            </div>

            {/* Featured Image - Beautiful large frame */}
            <div className="w-full max-w-[240px]">
              <LocketFrame size="lg">
                <div className="w-full h-full transform scale-110 hover:scale-115 transition-transform duration-500">
                  {currentProduct.art}
                </div>
              </LocketFrame>
            </div>
          </div>

          {/* Cross Selling Block */}
          <div className="mx-8 mt-8 p-6 bg-ceramic-pink-light/20 border border-ceramic-pink/10 rounded-[2rem] flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 flex-shrink-0 bg-white rounded-2xl border border-ceramic-pink/10 shadow-sm flex items-center justify-center overflow-hidden">
              <div className="scale-90">
                {currentProduct.additionalArt}
              </div>
            </div>
            <div className="text-left flex-1">
              <span className="text-[10px] font-mono text-ceramic-pink font-bold uppercase tracking-wider block mb-1">
                ceramic holder
              </span>
              <h4 className="font-serif italic font-bold text-sm text-ceramic-dark">
                Khay gốm lót nến trang trí đa năng
              </h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Được bo viền gợn sóng nghệ thuật, phủ chất men bóng phản chiếu ánh nến lãng mạn. Một sự kết hợp hoàn hảo để trưng bày cùng {currentProduct.title}.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-serif font-bold text-ceramic-pink">$45</div>
              <button className="mt-2 text-[10px] font-mono font-bold text-ceramic-mint-dark hover:text-ceramic-mint hover:underline uppercase tracking-wider flex items-center gap-1">
                <span>Add +</span>
              </button>
            </div>
          </div>

          {/* Text Block */}
          <div className="mt-8 px-8 text-center">
            <div className="bg-[#FAF7F2] border border-ceramic-pink/10 rounded-2xl p-4 font-serif italic text-sm text-ceramic-dark max-w-lg mx-auto">
              &quot;In Portugal, this <span className="font-bold text-ceramic-pink">{currentProduct.title}</span> holder is shaped to three flowers and has a beautifully glazed finish.&quot;
            </div>
          </div>

          {/* Similar Products Section */}
          <div className="mt-8 px-8 border-t border-ceramic-pink/15 pt-6">
            <h3 className="font-serif italic font-bold text-sm text-ceramic-pink mb-4 text-left">
              Similar Products
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-ceramic-pink/20 bg-white flex items-center justify-center p-2 hover:scale-105 hover:border-ceramic-pink transition-all duration-300">
                  <PalmTreeArt />
                </div>
                <span className="text-[10px] font-serif font-bold text-ceramic-dark mt-2">palm tree</span>
                <span className="text-[9px] font-mono text-slate-400">$120</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-ceramic-pink/20 bg-white flex items-center justify-center p-2 hover:scale-105 hover:border-ceramic-pink transition-all duration-300">
                  <PinkFaceArt />
                </div>
                <span className="text-[10px] font-serif font-bold text-ceramic-dark mt-2">pink face</span>
                <span className="text-[9px] font-mono text-slate-400">$140</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-ceramic-pink/20 bg-white flex items-center justify-center p-2 hover:scale-105 hover:border-ceramic-pink transition-all duration-300">
                  <EveCandleArt />
                </div>
                <span className="text-[10px] font-serif font-bold text-ceramic-dark mt-2">eve candle</span>
                <span className="text-[9px] font-mono text-slate-400">$110</span>
              </div>
            </div>
          </div>

          {/* Footer - Pink scalloped top edge */}
          <div className="scallop-border-top bg-ceramic-pink text-white py-6 px-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative">
            <span className="font-serif italic text-xs text-ceramic-pink-light">
              © 2026 the ceramics. all rights reserved.
            </span>
            
            {/* Social media blue bubble */}
            <div className="bg-ceramic-blue text-ceramic-dark font-mono text-xs font-semibold px-4 py-2 rounded-full border border-ceramic-blue/80 shadow-md flex items-center gap-3">
              <a href="#" className="hover:text-ceramic-pink transition-colors flex items-center gap-1">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                <span>Facebook</span>
              </a>
              <span className="text-ceramic-pink/30">|</span>
              <a href="#" className="hover:text-ceramic-pink transition-colors flex items-center gap-1">
                <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span>Instagram</span>
              </a>
              <span className="text-ceramic-pink/30">|</span>
              <a href="#" className="hover:text-ceramic-pink transition-colors flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                <span>Pinterest</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
