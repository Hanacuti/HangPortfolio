import React from "react";

// 1. SCALLOPED MIRROR-LIKE FRAME
export function ScallopedMirrorFrame({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative p-6 md:p-8 flex items-center justify-center w-full max-w-[200px]">
        {/* SVG Decorative Scalloped Border */}
        <svg 
          className="absolute inset-0 w-full h-full text-ceramic-pink fill-none stroke-current" 
          viewBox="0 0 120 120"
          strokeWidth="1.5"
        >
          {/* A hand-drawn feel 16-bump scallop path */}
          <path d="M 60,6 C 68,6 72,13 78,16 C 84,13 90,18 94,24 C 98,30 95,38 100,43 C 105,48 109,54 110,60 C 109,66 105,72 100,77 C 95,82 98,90 94,96 C 90,102 84,107 78,104 C 72,107 68,114 60,114 C 52,114 48,107 42,104 C 36,107 30,102 26,96 C 22,90 25,82 20,77 C 15,72 11,66 10,60 C 11,54 15,48 20,43 C 25,38 22,30 26,24 C 30,18 36,13 42,16 C 48,13 52,6 60,6 Z" fill="#FFFDF9" />
          {/* Inner accent ring */}
          <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
        </svg>
        {/* Inner Content (Ceramic Artwork) */}
        <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-ceramic-cream to-white border border-ceramic-pink/10 shadow-inner">
          {children}
        </div>
      </div>
      {label && (
        <span className="mt-2 text-sm font-serif font-bold text-ceramic-pink italic lowercase tracking-wider group-hover:text-ceramic-mint-dark transition-colors duration-300">
          &quot;{label}&quot;
        </span>
      )}
    </div>
  );
}

// 2. VINTAGE LOCKET FRAME
export function LocketFrame({ children, size = "md" }: { children: React.ReactNode; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-20 h-24",
    md: "w-32 h-40",
    lg: "w-44 h-56",
  };

  return (
    <div className="relative p-4 flex items-center justify-center">
      {/* Decorative Gold/Bronze-like Locket Frame */}
      <svg 
        className="absolute inset-0 w-full h-full text-ceramic-pink/30 fill-none" 
        viewBox="0 0 100 120"
      >
        {/* Oval Locket Frame */}
        <ellipse cx="50" cy="60" rx="44" ry="54" className="stroke-ceramic-pink stroke-[1.5]" fill="#FFFDF9" />
        {/* Outer Dots */}
        <ellipse cx="50" cy="60" rx="41" ry="51" className="stroke-ceramic-pink/40 stroke-1" strokeDasharray="4,4" />
        {/* Locket loop at top */}
        <circle cx="50" cy="8" r="5" className="stroke-ceramic-pink stroke-[1.5]" />
        <circle cx="50" cy="8" r="2" className="fill-ceramic-pink" />
        {/* Bottom floral detail */}
        <path d="M46,116 Q50,112 54,116 M40,114 Q50,109 60,114" className="stroke-ceramic-pink stroke-1" />
      </svg>
      {/* Locket Content */}
      <div className={`relative z-10 ${sizeClasses[size]} overflow-hidden rounded-[50%/40%] flex items-center justify-center bg-ceramic-cream`}>
        {children}
      </div>
    </div>
  );
}

// 3. FLOWER GARLAND FRAME (Circular wreath)
export function GarlandFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-8 flex items-center justify-center">
      {/* Garland Wreath SVG */}
      <svg 
        className="absolute inset-0 w-full h-full text-ceramic-mint-dark" 
        viewBox="0 0 140 140"
        fill="none"
      >
        {/* Circular branch */}
        <circle cx="70" cy="70" r="52" className="stroke-ceramic-mint stroke-1" />
        <circle cx="70" cy="70" r="49" className="stroke-ceramic-pink/15 stroke-1" strokeDasharray="3,3" />

        {/* Small leaves along the path */}
        <path d="M 70,15 C 73,15 76,19 75,22 C 74,25 70,26 68,23 Z" className="fill-ceramic-mint" />
        <path d="M 115,45 C 117,47 121,50 119,53 C 117,56 113,54 112,51 Z" className="fill-ceramic-mint" />
        <path d="M 122,70 C 122,73 126,76 125,79 C 124,82 120,83 118,80 Z" className="fill-ceramic-mint" />
        <path d="M 100,108 C 102,110 101,114 98,115 C 95,116 93,112 95,109 Z" className="fill-ceramic-mint" />
        <path d="M 70,122 C 67,122 64,126 65,129 C 66,132 70,133 72,130 Z" className="fill-ceramic-mint" />
        <path d="M 25,95 C 23,93 19,90 21,87 C 23,84 27,86 28,89 Z" className="fill-ceramic-mint" />
        <path d="M 18,70 C 18,67 14,64 15,61 C 16,58 20,57 22,60 Z" className="fill-ceramic-mint" />
        <path d="M 40,32 C 38,30 39,26 42,25 C 45,24 47,28 45,31 Z" className="fill-ceramic-mint" />

        {/* Tiny colorful flower buds */}
        <circle cx="70" cy="18" r="4" fill="#D14D72" />
        <circle cx="70" cy="18" r="1.5" fill="#FAF7F2" />
        
        <circle cx="118" cy="48" r="4.5" fill="#FAF7F2" className="stroke-ceramic-pink stroke-[1]" />
        
        <circle cx="122" cy="76" r="4" fill="#F1C40F" />
        <circle cx="122" cy="76" r="1.5" fill="#FAF7F2" />

        <circle cx="97" cy="112" r="4" fill="#D14D72" />

        <circle cx="68" cy="125" r="4.5" fill="#FAF7F2" className="stroke-ceramic-pink stroke-[1]" />

        <circle cx="23" cy="91" r="4" fill="#F1C40F" />

        <circle cx="17" cy="65" r="4" fill="#D14D72" />
        <circle cx="17" cy="65" r="1.5" fill="#FAF7F2" />

        <circle cx="42" cy="28" r="4.5" fill="#FAF7F2" className="stroke-ceramic-pink stroke-[1]" />
      </svg>
      {/* Content */}
      <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex items-center justify-center bg-[#FFFDF9] border-2 border-ceramic-mint/30 shadow-sm">
        {children}
      </div>
    </div>
  );
}

// 4. QUIRKY SCULPTURE 1: "tim nove"
export function TimNoveSculpture() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {/* Soft clay background color */}
      <circle cx="50" cy="50" r="44" fill="#FAD4D8" />
      {/* Cheeks */}
      <circle cx="32" cy="62" r="7" fill="#E65C80" opacity="0.6" />
      <circle cx="68" cy="62" r="7" fill="#E65C80" opacity="0.6" />
      {/* Nose - Sculpted look */}
      <path d="M46,40 Q50,30 54,40 L56,60 Q50,65 44,60 Z" fill="#D14D72" />
      {/* Cute closed eyes */}
      <path d="M26,48 Q34,54 40,48" fill="none" stroke="#3A3834" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60,48 Q66,54 74,48" fill="none" stroke="#3A3834" strokeWidth="2.5" strokeLinecap="round" />
      {/* Smiling mouth */}
      <path d="M43,72 Q50,77 57,72" fill="none" stroke="#3A3834" strokeWidth="2.5" strokeLinecap="round" />
      {/* Tiny head flower */}
      <circle cx="50" cy="18" r="5" fill="#8EC3B0" />
      <circle cx="50" cy="18" r="1.5" fill="#FAF7F2" />
    </svg>
  );
}

// 5. QUIRKY SCULPTURE 2: "louis ed"
export function LouisEdSculpture() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {/* Square/Rounded clay piece */}
      <rect x="12" y="12" width="76" height="76" rx="20" fill="#D0E7DF" />
      {/* Large central quirky eye */}
      <path d="M30,42 Q50,22 70,42 Q50,62 30,42 Z" fill="#FFFDF9" stroke="#3A3834" strokeWidth="2" />
      <circle cx="50" cy="42" r="8" fill="#D14D72" />
      <circle cx="50" cy="42" r="3" fill="#3A3834" />
      {/* Quirky flat clay nose */}
      <rect x="46" y="52" width="8" height="20" rx="4" fill="#F1C40F" stroke="#3A3834" strokeWidth="1.5" />
      {/* Small side blushing */}
      <circle cx="24" cy="65" r="5" fill="#FAD4D8" />
      <circle cx="76" cy="65" r="5" fill="#FAD4D8" />
      {/* Small round mouth */}
      <circle cx="50" cy="79" r="4.5" fill="#FFFDF9" stroke="#3A3834" strokeWidth="2" />
    </svg>
  );
}

// 6. QUIRKY SCULPTURE 3: "jordan"
export function JordanSculpture() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {/* Teardrop/Water droplet clay shape */}
      <path d="M50,8 C68,36 84,56 84,72 C84,86 70,92 50,92 C30,92 16,86 16,72 C16,56 32,36 50,8 Z" fill="#D5E6F5" />
      {/* Cheeks */}
      <circle cx="30" cy="70" r="5" fill="#F7C8D4" />
      <circle cx="70" cy="70" r="5" fill="#F7C8D4" />
      {/* Closed eyes with eyelashes */}
      <path d="M28,55 Q35,60 40,55" fill="none" stroke="#3A3834" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="58" x2="27" y2="62" stroke="#3A3834" strokeWidth="2" strokeLinecap="round" />
      <line x1="37" y1="58" x2="39" y2="62" stroke="#3A3834" strokeWidth="2" strokeLinecap="round" />
      
      <path d="M60,55 Q65,60 72,55" fill="none" stroke="#3A3834" strokeWidth="2" strokeLinecap="round" />
      <line x1="63" y1="58" x2="61" y2="62" stroke="#3A3834" strokeWidth="2" strokeLinecap="round" />
      <line x1="69" y1="58" x2="72" y2="62" stroke="#3A3834" strokeWidth="2" strokeLinecap="round" />

      {/* Vertical clay strip nose */}
      <line x1="50" y1="48" x2="50" y2="64" stroke="#3A3834" strokeWidth="3" strokeLinecap="round" />
      {/* Smiling tiny lips */}
      <path d="M47,74 C47,78 53,78 53,74 Z" fill="#D14D72" stroke="#3A3834" strokeWidth="1.5" />
      {/* Hair flowers */}
      <circle cx="42" cy="24" r="5" fill="#F1C40F" />
      <circle cx="58" cy="24" r="5" fill="#FAF7F2" className="stroke-ceramic-pink stroke-[1]" />
    </svg>
  );
}

// 7. QUIRKY SCULPTURE 4: "boing"
export function BoingSculpture() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {/* Round warm terracotta clay background */}
      <circle cx="50" cy="50" r="44" fill="#E67E22" opacity="0.8" />
      {/* Big quirky spiral glasses */}
      <circle cx="34" cy="45" r="14" fill="#FFFDF9" stroke="#3A3834" strokeWidth="2" />
      <path d="M34,45 m-8,0 a8,8 0 1,0 16,0 a5,5 0 1,0 -10,0 a2,2 0 1,0 4,0" fill="none" stroke="#D14D72" strokeWidth="1.5" />
      
      <circle cx="66" cy="45" r="14" fill="#FFFDF9" stroke="#3A3834" strokeWidth="2" />
      <path d="M66,45 m-8,0 a8,8 0 1,0 16,0 a5,5 0 1,0 -10,0 a2,2 0 1,0 4,0" fill="none" stroke="#D14D72" strokeWidth="1.5" />

      {/* Glasses bridge */}
      <path d="M48,45 L52,45" stroke="#3A3834" strokeWidth="3.5" strokeLinecap="round" />
      {/* Huge clay bulbous nose */}
      <circle cx="50" cy="58" r="9" fill="#D14D72" stroke="#3A3834" strokeWidth="2" />
      {/* Wavy mouth */}
      <path d="M36,76 Q42,70 50,76 T64,76" fill="none" stroke="#3A3834" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 8. TULIP FLOWER VASE
export function TulipVaseArt() {
  return (
    <svg className="w-full h-full p-4" viewBox="0 0 100 120">
      {/* Tulip vase body */}
      <path d="M35,110 C35,60 15,50 30,30 C40,20 60,20 70,30 C85,50 65,60 65,110 Z" fill="#D14D72" className="stroke-ceramic-dark stroke-[2]" />
      {/* Inner vase clay lines */}
      <path d="M42,50 C45,65 40,85 45,108 M58,50 C55,65 60,85 55,108" fill="none" stroke="#FAF7F2" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
      
      {/* Tulip Flower 1 (Left) */}
      <path d="M22,35 C12,25 15,10 25,12 C30,14 30,25 22,35 Z" fill="#F1C40F" className="stroke-ceramic-dark stroke-[1.5]" />
      <path d="M18,30 C12,18 20,8 24,15 Z" fill="#E65C80" opacity="0.9" />

      {/* Tulip Flower 2 (Center) */}
      <path d="M50,22 C42,5 58,5 50,22 Z" fill="#E65C80" className="stroke-ceramic-dark stroke-[1.5]" />
      <path d="M45,20 C42,12 48,6 50,15 Z" fill="#F1C40F" opacity="0.9" />
      <path d="M55,20 C58,12 52,6 50,15 Z" fill="#F1C40F" opacity="0.9" />

      {/* Tulip Flower 3 (Right) */}
      <path d="M78,35 C88,25 85,10 75,12 C70,14 70,25 78,35 Z" fill="#8EC3B0" className="stroke-ceramic-dark stroke-[1.5]" />
      <path d="M82,30 C88,18 80,8 76,15 Z" fill="#D14D72" opacity="0.9" />

      {/* Stems */}
      <path d="M25,25 Q30,45 35,45" fill="none" stroke="#3A3834" strokeWidth="2" strokeLinecap="round" />
      <path d="M50,18 L50,30" fill="none" stroke="#3A3834" strokeWidth="2" strokeLinecap="round" />
      <path d="M75,25 Q70,45 65,45" fill="none" stroke="#3A3834" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 9. PALM TREE SCULPTURE
export function PalmTreeArt() {
  return (
    <svg className="w-full h-full p-4" viewBox="0 0 100 100">
      {/* Palm trunk */}
      <path d="M48,90 Q45,60 52,35 Q55,60 52,90 Z" fill="#E67E22" stroke="#3A3834" strokeWidth="2" />
      <path d="M48,80 L52,80 M47,65 L52,65 M48,50 L53,50" stroke="#3A3834" strokeWidth="1.5" />
      
      {/* Palm leaves */}
      <path d="M50,35 Q20,30 15,45 C20,40 38,38 50,35 Z" fill="#8EC3B0" stroke="#3A3834" strokeWidth="1.5" />
      <path d="M50,35 Q25,18 30,10 C35,18 42,28 50,35 Z" fill="#8EC3B0" stroke="#3A3834" strokeWidth="1.5" />
      <path d="M50,35 Q50,10 60,8 C60,18 56,28 50,35 Z" fill="#8EC3B0" stroke="#3A3834" strokeWidth="1.5" />
      <path d="M50,35 Q75,18 80,18 C75,25 62,30 50,35 Z" fill="#8EC3B0" stroke="#3A3834" strokeWidth="1.5" />
      <path d="M50,35 Q85,38 80,50 C75,45 62,40 50,35 Z" fill="#8EC3B0" stroke="#3A3834" strokeWidth="1.5" />

      {/* Ceramic plate stand */}
      <ellipse cx="50" cy="90" rx="30" ry="6" fill="#FAF7F2" stroke="#3A3834" strokeWidth="2" />
    </svg>
  );
}

// 10. PINK FACE SCULPTURE
export function PinkFaceArt() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill="#FAD4D8" />
      {/* Abstract design elements */}
      <path d="M28,45 C35,38 42,42 42,50 C42,58 35,62 28,55" fill="none" stroke="#D14D72" strokeWidth="2.5" />
      <path d="M72,45 C65,38 58,42 58,50 C58,58 65,62 72,55" fill="none" stroke="#D14D72" strokeWidth="2.5" />
      <path d="M48,32 Q52,38 50,55" fill="none" stroke="#3A3834" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="70" r="6" fill="#E65C80" />
    </svg>
  );
}

// 11. EVE CANDLE
export function EveCandleArt() {
  return (
    <svg className="w-full h-full p-4" viewBox="0 0 100 120">
      {/* Candle shape - wavy cylindrical clay */}
      <path d="M35,90 C30,75 40,60 35,45 C35,35 65,35 65,45 C60,60 70,75 65,90 Z" fill="#FAF7F2" stroke="#3A3834" strokeWidth="2" />
      {/* Candle wax melt lines */}
      <path d="M37,45 Q42,55 45,45 M45,45 Q50,60 54,48 M54,48 Q60,52 63,45" fill="none" stroke="#3A3834" strokeWidth="2" />
      {/* Wick & Flame */}
      <line x1="50" y1="35" x2="50" y2="25" stroke="#3A3834" strokeWidth="2" />
      <path d="M50,23 C46,15 54,5 50,23 Z" fill="#F1C40F" stroke="#3A3834" strokeWidth="1.5" />
      
      {/* Floral prints on candle body */}
      <circle cx="50" cy="65" r="4.5" fill="#D14D72" />
      <circle cx="43" cy="74" r="3.5" fill="#8EC3B0" />
      <circle cx="57" cy="74" r="3.5" fill="#8EC3B0" />
      
      {/* Stand plate */}
      <path d="M20,90 Q50,84 80,90 L75,102 Q50,96 25,102 Z" fill="#D14D72" stroke="#3A3834" strokeWidth="2" />
    </svg>
  );
}

// 12. VINTAGE PLATE
export function VintagePlateArt() {
  return (
    <svg className="w-full h-full p-4" viewBox="0 0 100 100">
      {/* Outer scalloped plate border */}
      <circle cx="50" cy="50" r="44" fill="#FAF7F2" stroke="#D14D72" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#D14D72" strokeWidth="0.75" strokeDasharray="3,3" />
      {/* Inner ceramic painting - flower in the center */}
      <circle cx="50" cy="50" r="8" fill="#F1C40F" stroke="#3A3834" strokeWidth="1.5" />
      {/* Petals */}
      <path d="M50,34 C47,38 53,38 50,34 Z" fill="#D14D72" stroke="#3A3834" strokeWidth="1" />
      <path d="M50,66 C47,62 53,62 50,66 Z" fill="#D14D72" stroke="#3A3834" strokeWidth="1" />
      <path d="M34,50 C38,47 38,53 34,50 Z" fill="#D14D72" stroke="#3A3834" strokeWidth="1" />
      <path d="M66,50 C62,47 62,53 66,50 Z" fill="#D14D72" stroke="#3A3834" strokeWidth="1" />
      {/* Leaves painting */}
      <path d="M36,36 Q42,42 45,45" fill="none" stroke="#8EC3B0" strokeWidth="2" strokeLinecap="round" />
      <path d="M64,64 Q58,58 55,55" fill="none" stroke="#8EC3B0" strokeWidth="2" strokeLinecap="round" />
      <path d="M64,36 Q58,42 55,45" fill="none" stroke="#8EC3B0" strokeWidth="2" strokeLinecap="round" />
      <path d="M36,64 Q42,58 45,55" fill="none" stroke="#8EC3B0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 13. FLOATING FOLIAGE SVG (Leaf garland motifs)
export function FloatingFoliage({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`pointer-events-none opacity-40 select-none ${className}`} 
      width="100" 
      height="100" 
      viewBox="0 0 100 100"
      fill="none"
    >
      {/* Handdrawn styled branch with leaves */}
      <path d="M10,80 Q40,60 80,20" stroke="#8EC3B0" strokeWidth="2" strokeLinecap="round" />
      {/* Leaf 1 */}
      <path d="M30,65 C25,55 35,50 38,60 C40,70 35,75 30,65 Z" fill="#8EC3B0" />
      {/* Leaf 2 */}
      <path d="M50,48 C55,38 65,42 62,50 C60,58 52,55 50,48 Z" fill="#9ED5C5" />
      {/* Leaf 3 */}
      <path d="M70,30 C65,20 75,15 78,25 C80,35 75,40 70,30 Z" fill="#8EC3B0" />
      {/* Little flowers */}
      <circle cx="28" cy="72" r="3" fill="#D14D72" />
      <circle cx="68" cy="40" r="2.5" fill="#F1C40F" />
    </svg>
  );
}
