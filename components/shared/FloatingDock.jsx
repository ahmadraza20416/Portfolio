'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Volume2, VolumeX, Calculator, Video, Command } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function FloatingDock({ onOpenEstimator, onOpenMeeting, onOpenCommandK }) {
  const [showScroll, setShowScroll] = useState(false);
  const { muted, toggleSound } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-card border border-[var(--glass-border)] shadow-2xl backdrop-blur-2xl">
        {/* Scroll To Top */}
        <AnimatePresence>
          {showScroll && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-full hover:bg-[var(--glass-bg-hover)] text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors"
              title="Back to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Command K Spotlight Trigger */}
        <button
          onClick={onOpenCommandK}
          aria-label="Open Command Search (Ctrl+K)"
          className="p-2 rounded-full hover:bg-[var(--glass-bg-hover)] text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
          title="Command Search (Ctrl+K)"
        >
          <Command size={17} />
        </button>

        {/* Audio Sound Toggle */}
        <button
          onClick={toggleSound}
          aria-label="Toggle UI Sounds"
          className="p-2 rounded-full hover:bg-[var(--glass-bg-hover)] text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors"
          title={muted ? 'Enable UI Sounds' : 'Mute UI Sounds'}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-emerald-400" />}
        </button>

        <div className="w-px h-5 bg-[var(--glass-border)] mx-0.5" />

        {/* Project Estimator Trigger */}
        <button
          onClick={onOpenEstimator}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] text-xs font-semibold text-[var(--foreground)] border border-[var(--glass-border)] transition-all hover:scale-105"
        >
          <Calculator size={14} className="text-[var(--accent)]" />
          <span>Estimate Scope</span>
        </button>

        {/* Book Strategy Call Trigger */}
        <button
          onClick={onOpenMeeting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 hover:scale-105 transition-transform"
        >
          <Video size={14} />
          <span>Book Call</span>
        </button>
      </div>
    </div>
  );
}
