'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function Canvas3DBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate 3D particles
    const particleCount = Math.min(Math.floor(width / 18), 70);
    const particles = [];

    const isDark = theme === 'dark';
    const baseColor = isDark ? { r: 56, g: 189, b: 248 } : { r: 59, g: 130, b: 246 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 400 - 200, // 3D depth layer
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 0.5,
        baseRadius: Math.random() * 2 + 1,
      });
    }

    const render = () => {
      // Ease mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Update & render particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap boundaries in 3D space
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.z < -200) p.z = 200;
        if (p.z > 200) p.z = -200;

        // Perspective scale factor
        const perspective = 400;
        const scale = perspective / (perspective + p.z);
        const screenX = (p.x - width / 2) * scale + width / 2;
        const screenY = (p.y - height / 2) * scale + height / 2;
        const radius = p.baseRadius * scale;

        // Mouse proximity reaction
        const dx = screenX - mouse.x;
        const dy = screenY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let alpha = 0.4 * scale;
        if (dist < mouse.radius) {
          alpha += (1 - dist / mouse.radius) * 0.4;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${Math.min(alpha, 0.85)})`;
        ctx.fill();

        // Connect nearby particles with glowing cyber lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const scale2 = perspective / (perspective + p2.z);
          const screenX2 = (p2.x - width / 2) * scale2 + width / 2;
          const screenY2 = (p2.y - height / 2) * scale2 + height / 2;

          const ldx = screenX - screenX2;
          const ldy = screenY - screenY2;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (ldist < 140) {
            const lineAlpha = (1 - ldist / 140) * 0.25 * scale;
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(screenX2, screenY2);
            ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${lineAlpha})`;
            ctx.lineWidth = 1 * scale;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-700"
    />
  );
}
