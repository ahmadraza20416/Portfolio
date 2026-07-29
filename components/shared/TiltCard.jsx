'use client';

import { useState, useRef, useCallback } from 'react';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  glare = true,
  onClick,
}) {
  const cardRef = useRef(null);
  const animFrameRef = useRef(null);
  const [transform, setTransform] = useState(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    animFrameRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = (clientX - rect.left) / width - 0.5;
      const mouseY = (clientY - rect.top) / height - 0.5;

      const rotateX = -mouseY * maxTilt * 2;
      const rotateY = mouseX * maxTilt * 2;

      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`
      );

      if (glare) {
        const glareX = ((clientX - rect.left) / width) * 100;
        const glareY = ((clientY - rect.top) / height) * 100;
        setGlarePos({ x: glareX, y: glareY, opacity: 0.45 });
      }
    });
  }, [maxTilt, perspective, glare]);

  const handleMouseLeave = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform,
        transition: transform.includes('scale3d(1, 1, 1)')
          ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 0.08s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`glass-card cursor-pointer group hover:border-[var(--accent)] hover:shadow-2xl hover:shadow-blue-500/20 ${className}`}
    >
      {/* Specular 3D Light Glare */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(56, 189, 248, 0.25) 30%, rgba(255, 255, 255, 0) 70%)`,
            opacity: glarePos.opacity,
          }}
        />
      )}

      {/* Card Content with 3D Depth Layering */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
