"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; r: number; // radius
  opacity: number; speed: number; // twinkle
  layer: number; // 0=far 1=mid 2=near
}

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotation = 0;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    const stars: Star[] = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < 280; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.max(cx, cy);
      stars.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.15,
        speed: Math.random() * 0.02 + 0.005,
        layer: Math.floor(Math.random() * 3),
      });
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const rcx = canvas!.width / 2;
      const rcy = canvas!.height / 2;
      rotation += 0.00025; // very slow rotation

      stars.forEach((star) => {
        // Rotate star position around center
        const dx = star.x - rcx;
        const dy = star.y - rcy;
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        const rx = dx * cos - dy * sin + rcx;
        const ry = dx * sin + dy * cos + rcy;

        // Skip if off screen
        if (rx < -20 || rx > canvas!.width + 20 || ry < -20 || ry > canvas!.height + 20) return;

        // Twinkle
        const twinkle = star.opacity + Math.sin(Date.now() * star.speed + star.x) * 0.08;

        // Color: gold-white gradient based on layer
        if (star.layer === 0) {
          ctx!.fillStyle = `rgba(184,137,30,${Math.max(0.03, twinkle * 0.4)})`;
        } else if (star.layer === 1) {
          ctx!.fillStyle = `rgba(220,200,150,${Math.max(0.04, twinkle * 0.6)})`;
        } else {
          ctx!.fillStyle = `rgba(255,240,210,${Math.max(0.06, twinkle * 0.8)})`;
        }

        ctx!.beginPath();
        ctx!.arc(rx, ry, star.r, 0, Math.PI * 2);
        ctx!.fill();

        // Glow halo for bright near stars
        if (star.layer === 2 && star.r > 1) {
          ctx!.fillStyle = `rgba(255,240,210,${Math.max(0.01, twinkle * 0.15)})`;
          ctx!.beginPath();
          ctx!.arc(rx, ry, star.r * 3, 0, Math.PI * 2);
          ctx!.fill();
        }
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
