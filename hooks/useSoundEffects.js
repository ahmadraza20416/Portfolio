'use client';

import { useState, useEffect, useCallback } from 'react';

export function useSoundEffects() {
  const [muted, setMuted] = useState(true); // Default muted to respect browser auto-play policies
  const [audioCtx, setAudioCtx] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('sound_muted');
    if (saved !== null) {
      setMuted(saved === 'true');
    }
  }, []);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    localStorage.setItem('sound_muted', String(nextMuted));
  };

  const getAudioContext = useCallback(() => {
    if (audioCtx) return audioCtx;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioCtx(ctx);
    return ctx;
  }, [audioCtx]);

  // Synthesize subtle UI click sound using Web Audio API
  const playClick = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext fallback
    }
  }, [muted, getAudioContext]);

  // Synthesize subtle UI hover tone
  const playHover = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext fallback
    }
  }, [muted, getAudioContext]);

  return { muted, toggleSound, playClick, playHover };
}
