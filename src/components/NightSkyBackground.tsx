"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  animClass: string;
  delay: string;
}

export default function NightSkyBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars on the client side to avoid SSR hydration mismatch
    const generatedStars: Star[] = [];
    const animClasses = ["animate-twinkle-1", "animate-twinkle-2", "animate-twinkle-3"];
    
    for (let i = 0; i < 40; i++) {
      generatedStars.push({
        id: i,
        top: `${Math.random() * 80}%`, // Focus on the top 80% of the screen
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.8, // Sizes between 0.8px and 2.8px
        animClass: animClasses[Math.floor(Math.random() * animClasses.length)],
        delay: `${Math.random() * 5}s`,
      });
    }
    const timeoutId = setTimeout(() => {
      setStars(generatedStars);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-gradient-to-b from-[#0B0F19] to-[#05070C] select-none pointer-events-none">
      {/* Radial Glow representing soft moonlight/nocturnal aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.035)_0%,rgba(11,15,25,0)_70%)] pointer-events-none" />

      {/* Stars Layer */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-white ${star.animClass}`}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            boxShadow: star.size > 2 ? "0 0 6px rgba(255, 255, 255, 0.8)" : "none",
          }}
        />
      ))}

      {/* Shooting Stars */}
      <div className="absolute top-10 right-20 w-px h-[80px] bg-gradient-to-b from-white to-transparent opacity-0 animate-shooting-star" />
      <div className="absolute top-[20%] right-[40%] w-px h-[60px] bg-gradient-to-b from-white to-transparent opacity-0 animate-shooting-star-delayed" />

      {/* Golden Glowing Crescent Moon */}
      <div className="absolute top-12 right-8 md:top-20 md:right-24 flex items-center justify-center">
        {/* Soft Moon Glow */}
        <div className="absolute w-24 h-24 rounded-full bg-[#FFFDE7]/10 blur-xl md:w-32 md:h-32" />
        <div className="absolute w-12 h-12 rounded-full bg-[#FFFDE7]/20 blur-md md:w-16 md:h-16" />
        
        {/* Crescent Moon SVG */}
        <svg
          className="w-10 h-10 md:w-14 md:h-14 text-[#FFFDE7] drop-shadow-[0_0_10px_rgba(255,253,231,0.6)]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>

      {/* Silhouettes of Flying Birds */}
      <div className="absolute top-[35%] w-full h-12 opacity-15 pointer-events-none animate-fly-slow">
        <svg className="w-8 h-8 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21c-1.38 0-2.88-.7-4.13-1.87L2 14.5c.95-.53 2.1-.56 3.12-.1L10 16.5c1.1.5 2.4.2 3.1-.7l6.8-8.2c.45-.55.7-1.25.7-1.95.8 1 1 2.3.5 3.5l-4.5 7.9c-.88 1.55-2.5 2.45-4.22 2.45H12z" />
        </svg>
      </div>
      <div className="absolute top-[20%] w-full h-12 opacity-10 pointer-events-none animate-fly-medium" style={{ animationDelay: "15s" }}>
        <svg className="w-6 h-6 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21c-1.38 0-2.88-.7-4.13-1.87L2 14.5c.95-.53 2.1-.56 3.12-.1L10 16.5c1.1.5 2.4.2 3.1-.7l6.8-8.2c.45-.55.7-1.25.7-1.95.8 1 1 2.3.5 3.5l-4.5 7.9c-.88 1.55-2.5 2.45-4.22 2.45H12z" />
        </svg>
      </div>

      {/* Drifting Clouds */}
      <div className="absolute bottom-[20%] left-0 w-full pointer-events-none opacity-20 animate-drift-slow">
        <svg className="w-[600px] h-[150px] text-slate-800/20 fill-current" viewBox="0 0 100 30">
          <path d="M10 20 c 0 -5, 5 -10, 12 -10 c 3 0, 7 2, 9 4 c 3 -4, 8 -7, 14 -7 c 8 0, 14 6, 14 13 c 3 -1, 6 -1, 8 1 c 3 3, 3 8, 0 10 c -1 1, -54 1, -57 -1 c -3 -2, -3 -7, 0 -10 z" />
        </svg>
      </div>
      <div className="absolute top-[40%] left-0 w-full pointer-events-none opacity-15 animate-drift-medium" style={{ animationDelay: "-30s" }}>
        <svg className="w-[450px] h-[100px] text-slate-700/25 fill-current" viewBox="0 0 100 30">
          <path d="M10 20 c 0 -5, 5 -10, 12 -10 c 3 0, 7 2, 9 4 c 3 -4, 8 -7, 14 -7 c 8 0, 14 6, 14 13 c 3 -1, 6 -1, 8 1 c 3 3, 3 8, 0 10 c -1 1, -54 1, -57 -1 c -3 -2, -3 -7, 0 -10 z" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-0 w-full pointer-events-none opacity-25 animate-drift-fast" style={{ animationDelay: "-60s" }}>
        <svg className="w-[300px] h-[80px] text-slate-900/30 fill-current" viewBox="0 0 100 30">
          <path d="M10 20 c 0 -5, 5 -10, 12 -10 c 3 0, 7 2, 9 4 c 3 -4, 8 -7, 14 -7 c 8 0, 14 6, 14 13 c 3 -1, 6 -1, 8 1 c 3 3, 3 8, 0 10 c -1 1, -54 1, -57 -1 c -3 -2, -3 -7, 0 -10 z" />
        </svg>
      </div>
    </div>
  );
}
