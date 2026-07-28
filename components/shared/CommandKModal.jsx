'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Sun, Moon, Volume2, VolumeX, Calculator, Download, Briefcase, Code, User, Mail, Rocket, ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function CommandKModal({ isOpen, onClose, onOpenEstimator }) {
  const [query, setQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { muted, toggleSound } = useSoundEffects();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      group: 'Quick Navigation',
      items: [
        { label: 'Go to Career Experience & Roles', icon: Briefcase, href: '#experience' },
        { label: 'Go to Selected Work & Projects', icon: Rocket, href: '#projects' },
        { label: 'Go to Tech Stack & Skills', icon: Code, href: '#skills' },
        { label: 'Go to Services & Solutions', icon: Command, href: '#services' },
        { label: 'Go to About Me & Background', icon: User, href: '#about' },
        { label: 'Go to Contact Form', icon: Mail, href: '#contact' },
      ],
    },
    {
      group: 'Actions & Utilities',
      items: [
        {
          label: 'Calculate Project Scope & Budget',
          icon: Calculator,
          action: () => {
            onClose();
            if (onOpenEstimator) onOpenEstimator();
          },
        },
        {
          label: `Switch Theme (Current: ${theme === 'dark' ? 'Dark Obsidian' : 'Light Ice'})`,
          icon: theme === 'dark' ? Sun : Moon,
          action: () => {
            toggleTheme();
            onClose();
          },
        },
        {
          label: muted ? 'Unmute UI Sound Effects' : 'Mute UI Sound Effects',
          icon: muted ? Volume2 : VolumeX,
          action: () => {
            toggleSound();
            onClose();
          },
        },
        {
          label: 'Download Resume PDF',
          icon: Download,
          action: () => {
            window.open('/images/Ahmad_Raza_d.pdf', '_blank');
            onClose();
          },
        },
      ],
    },
  ];

  const handleSelect = (item) => {
    if (item.href) {
      onClose();
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.action) {
      item.action();
    }
  };

  const filteredGroups = actions
    .map((g) => ({
      ...g,
      items: g.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Command Palette Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass-card relative w-full max-w-xl shadow-2xl border border-[var(--glass-border)] overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl">
            <Search size={18} className="text-[var(--accent)] mr-3 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search section..."
              className="w-full bg-transparent border-none outline-none text-sm text-[var(--foreground)] font-bold placeholder:text-[var(--foreground-secondary)] placeholder:font-normal"
            />
            <kbd className="hidden sm:inline-block text-[10px] font-mono font-bold px-2 py-1 rounded bg-[var(--glass-bg-hover)] border border-[var(--glass-border)] text-[var(--foreground)]">
              ESC
            </kbd>
          </div>

          {/* Command Items List */}
          <div className="max-h-[340px] overflow-y-auto p-3 space-y-4 bg-[var(--glass-bg)] backdrop-blur-2xl">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => (
                <div key={group.group}>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent)] px-3 py-1">
                    {group.group}
                  </div>
                  <div className="space-y-1.5 mt-1">
                    {group.items.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelect(item)}
                          className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs text-left transition-all bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] border border-[var(--glass-border)] hover:border-[var(--accent)] text-[var(--foreground)] group shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-[var(--glass-bg-hover)] border border-[var(--glass-border)] text-[var(--accent)] group-hover:scale-110 transition-transform">
                              <Icon size={16} />
                            </div>
                            <span className="font-semibold text-[var(--foreground)] text-xs sm:text-sm">{item.label}</span>
                          </div>
                          <span className="text-[11px] font-medium text-[var(--foreground-secondary)] group-hover:text-[var(--accent)] flex items-center gap-1">
                            Jump <ChevronRight size={13} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs font-semibold text-[var(--foreground-secondary)]">
                No matching commands for "{query}"
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
