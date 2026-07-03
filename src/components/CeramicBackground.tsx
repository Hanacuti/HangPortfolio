"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  life: number;
  decay: number;
}

export default function CeramicBackground() {
  const basePath = process.env.NODE_ENV === "production" ? "/HangPortfolio" : "";
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Canvas particle system for mouse-following petals
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const mouse = { x: 0, y: 0, active: false };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn 1 cherry blossom petal per move to keep it subtle
      if (Math.random() < 0.6) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.8,
          vy: Math.random() * 1.5 + 0.5, // Drifts downwards
          size: Math.random() * 6 + 5, // size between 5 and 11
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          opacity: 1.0,
          life: 1.0,
          decay: Math.random() * 0.015 + 0.012, // fades out after 1-2 seconds
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Particle render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render & update particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;
        p.opacity = p.life;

        // Add a gentle horizontal wave motion
        p.vx += Math.sin(p.life * 10) * 0.03;

        if (p.life <= 0) {
          particles.splice(idx, 1);
          return;
        }

        // Draw individual cherry blossom petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // Cherry blossom pink gradient / solid
        ctx.fillStyle = `rgba(255, 183, 197, ${p.opacity})`;
        ctx.strokeStyle = `rgba(229, 77, 126, ${p.opacity * 0.3})`;
        ctx.lineWidth = 1;

        ctx.beginPath();
        // Drawing heart-ish curved petal
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
        ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Generate 16 static falling petals at left and right edges (to avoid obstructing main content text)
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

      {/* Dark Translucent Overlay (Allows moon/blossom background to pop, while text stays legible) */}
      <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px]" />

      {/* Canvas for Interactive Mouse-Follow Cherry Blossoms */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Falling Cherry Blossoms on Left & Right Sides */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
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
