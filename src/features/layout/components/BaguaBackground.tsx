"use client";

import { useEffect, useRef } from "react";

export function BaguaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }[] = [];

    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.15 + 0.03,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
      });
    }

    function drawBagua(cx: number, cy: number, r: number, rotation: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(rotation);
      ctx!.strokeStyle = "rgba(184,137,30,0.03)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(0, 0, r, 0, Math.PI * 2);
      ctx!.stroke();

      // Inner circle with slight fill
      ctx!.fillStyle = "rgba(184,137,30,0.01)";
      ctx!.fill();

      // Trigrams (simplified as short lines around)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const tx = Math.cos(angle) * r * 0.7;
        const ty = Math.sin(angle) * r * 0.7;

        ctx!.save();
        ctx!.translate(tx, ty);
        ctx!.rotate(angle + Math.PI / 2);

        const isYin = i % 3 === 0;
        for (let j = -1; j <= 1; j++) {
          ctx!.beginPath();
          if (isYin) {
            const halfW = 4;
            ctx!.moveTo(-halfW, j * 8);
            ctx!.lineTo(halfW, j * 8);
            ctx!.moveTo(halfW + 2, j * 8 - 2);
            ctx!.lineTo(halfW + 2, j * 8 + 2);
            ctx!.moveTo(-halfW - 2, j * 8 - 2);
            ctx!.lineTo(-halfW - 2, j * 8 + 2);
          } else {
            ctx!.moveTo(-6, j * 8);
            ctx!.lineTo(6, j * 8);
          }
          ctx!.strokeStyle = "rgba(184,137,30,0.1)";
          ctx!.stroke();
        }
        ctx!.restore();
      }

      ctx!.restore();
    }

    let rotation = 0;
    const baguaHue = 42;

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw main bagua in center
      drawBagua(canvas!.width / 2, canvas!.height / 2, Math.min(canvas!.width, canvas!.height) * 0.35, rotation);

      // Draw smaller baguas in corners
      drawBagua(canvas!.width * 0.12, canvas!.height * 0.15, 60, -rotation * 0.5);
      drawBagua(canvas!.width * 0.88, canvas!.height * 0.15, 60, -rotation * 0.7);
      drawBagua(canvas!.width * 0.12, canvas!.height * 0.85, 60, -rotation * 0.6);
      drawBagua(canvas!.width * 0.88, canvas!.height * 0.85, 60, -rotation * 0.4);

      // Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        const alpha = p.opacity + Math.sin(p.pulse) * 0.15;
        ctx!.fillStyle = `rgba(184,137,30,${Math.max(0.01, alpha)})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      });

      rotation += 0.0008;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
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
