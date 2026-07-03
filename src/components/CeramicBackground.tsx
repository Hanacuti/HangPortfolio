import React from "react";

export default function CeramicBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* Top Left Vine Garland */}
      <div className="absolute -left-12 top-10 md:left-4 md:top-24 opacity-60">
        <svg className="w-32 h-32 md:w-44 md:h-44 text-ceramic-mint/30 fill-current" viewBox="0 0 100 100">
          {/* Stem */}
          <path d="M10,80 Q20,40 50,30 T80,10" stroke="currentColor" strokeWidth="2.5" fill="none" />
          {/* Leaves */}
          <path d="M22,55 C12,50 18,40 28,45 C32,47 28,53 22,55 Z" fill="currentColor" />
          <path d="M35,38 C40,28 50,34 45,44 C43,48 37,44 35,38 Z" fill="currentColor" />
          <path d="M60,25 C58,15 68,18 70,28 C71,32 65,30 60,25 Z" fill="currentColor" />
          <path d="M15,68 C20,78 30,72 25,62 C23,58 17,62 15,68 Z" fill="currentColor" />
          {/* Tiny yellow blossom */}
          <circle cx="50" cy="30" r="4" fill="#FFD166" className="text-ceramic-yellow" />
          <circle cx="53" cy="27" r="3" fill="#D83D6C" />
        </svg>
      </div>

      {/* Middle Right Blossom Garland */}
      <div className="absolute -right-8 top-1/3 md:right-8 opacity-70">
        <svg className="w-24 h-48 md:w-32 md:h-64 text-ceramic-pink/20 fill-current" viewBox="0 0 50 100">
          {/* Curved Stem */}
          <path d="M40,10 Q20,50 40,90" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Leaves and Buds */}
          <path d="M25,30 C15,30 20,20 30,22 Z" fill="#48A97A" className="text-ceramic-mint/30" />
          <path d="M22,70 C12,70 17,60 27,62 Z" fill="#48A97A" className="text-ceramic-mint/30" />
          {/* Pink Flowers */}
          <g transform="translate(30, 45)">
            <circle cx="0" cy="0" r="6" fill="#D83D6C" />
            <circle cx="-7" cy="0" r="5" fill="#D83D6C" />
            <circle cx="7" cy="0" r="5" fill="#D83D6C" />
            <circle cx="0" cy="-7" r="5" fill="#D83D6C" />
            <circle cx="0" cy="7" r="5" fill="#D83D6C" />
            <circle cx="0" cy="0" r="3" fill="#FFD166" />
          </g>
        </svg>
      </div>

      {/* Bottom Left Garland */}
      <div className="absolute -left-10 bottom-24 md:left-6 md:bottom-32 opacity-60">
        <svg className="w-28 h-28 md:w-36 md:h-36 fill-current" viewBox="0 0 100 100">
          <path d="M10,90 Q40,80 50,50 T90,40" stroke="#48A97A" strokeWidth="1.5" fill="none" className="text-ceramic-mint/20" />
          {/* Yellow blossom */}
          <g transform="translate(50, 50)">
            <circle cx="0" cy="0" r="7" fill="#FFD166" />
            <circle cx="-8" cy="-5" r="5" fill="#FFD166" />
            <circle cx="8" cy="-5" r="5" fill="#FFD166" />
            <circle cx="-8" cy="5" r="5" fill="#FFD166" />
            <circle cx="8" cy="5" r="5" fill="#FFD166" />
            <circle cx="0" cy="0" r="4" fill="#D83D6C" />
          </g>
        </svg>
      </div>
      
      {/* Subtle paper-like grain texture overlay (tactile feeling) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
