"use client";

import React from "react";

export default function CeramicBackground() {
  const basePath = process.env.NODE_ENV === "production" ? "/HangPortfolio" : "";

  // Generate 16 falling petals at left and right edges (to avoid obstructing main content text)
  const petals = Array.from({ length: 16 }).map((_, i) => {
    const isLeft = i < 8;
    // Left side: 2% to 10%, Right side: 88% to 96%
    const sidePos = isLeft 
      ? 2 + i * 1.2 
      : 88 + (i - 8) * 1.2;
    const delay = (i * 0.8).toFixed(1);
    const duration = (6 + (i % 4) * 1.5).toFixed(1);
    const scale = (0.5 + (i % 3) * 0.25).toFixed(2);
    
    return {
      id: i,
      left: `${sidePos}%`,
      delay: `${delay}s`,
      duration: `${duration}s`,
      scale,
    };
  });

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Video Loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${basePath}/background/background.mp4`} type="video/mp4" />
      </video>

      {/* Tactile Cream Overlay (High opacity to protect content readability) */}
      <div className="absolute inset-0 bg-[#FAF6F0]/92 backdrop-blur-[1px]" />

      {/* Falling Cherry Blossoms on Left & Right Sides */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="petal"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: `${12 * parseFloat(petal.scale)}px`,
              height: `${12 * parseFloat(petal.scale)}px`,
              transform: `rotate(45deg) scale(${petal.scale})`,
            }}
          />
        ))}
      </div>

      {/* Subtle paper-like grain texture overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none z-20" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
