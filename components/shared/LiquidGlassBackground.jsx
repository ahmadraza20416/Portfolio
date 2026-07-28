'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function LiquidGlassBackground() {
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

    const isDark = theme === 'dark';

    // Water Droplets & Liquid Glass Orbs
    const dropCount = Math.min(Math.floor(width / 60), 25);
    const drops = [];

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 30 + 15, // Glass droplet radius
        vy: (Math.random() - 0.5) * 0.4,
        vx: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Click Water Ripples
    const ripples = [];

    const handleClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 120,
        alpha: 0.7,
      });
    };
    window.addEventListener('click', handleClick);

    // Mouse position tracking
    const mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Floating Liquid Water / Glass Droplets
      drops.forEach((drop) => {
        drop.x += drop.vx;
        drop.y += drop.vy;
        drop.phase += drop.pulseSpeed;

        // Wrap around screen boundaries
        if (drop.x < -drop.radius) drop.x = width + drop.radius;
        if (drop.x > width + drop.radius) drop.x = -drop.radius;
        if (drop.y < -drop.radius) drop.y = height + drop.radius;
        if (drop.y > height + drop.radius) drop.y = -drop.radius;

        // Dynamic pulsing radius
        const currentRadius = drop.radius + Math.sin(drop.phase) * 3;

        // Distance to cursor for light attraction
        const dx = drop.x - mouse.x;
        const dy = drop.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Glass Specular Radial Gradient
        const grad = ctx.createRadialGradient(
          drop.x - currentRadius * 0.3,
          drop.y - currentRadius * 0.3,
          currentRadius * 0.1,
          drop.x,
          drop.y,
          currentRadius
        );

        if (isDark) {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
          grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.15)');
          grad.addColorStop(0.8, 'rgba(15, 23, 42, 0.25)');
          grad.addColorStop(1, 'rgba(56, 189, 248, 0.08)');
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
          grad.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)');
          grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.4)');
          grad.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
        }

        // Draw Liquid Glass Orb Body
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Frosted Glass Highlight Ring
        ctx.lineWidth = 1;
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.6)';
        ctx.stroke();

        // Water Drop Specular Light Arc Reflection
        ctx.beginPath();
        ctx.arc(
          drop.x - currentRadius * 0.2,
          drop.y - currentRadius * 0.2,
          currentRadius * 0.4,
          Math.PI * 1.1,
          Math.PI * 1.7
        );
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.stroke();
      });

      // Render Expanding Water Click Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 2.5;
        rip.alpha -= 0.015;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(56, 189, 248, ${rip.alpha})`
          : `rgba(59, 130, 246, ${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-700"
    />
  );
}
