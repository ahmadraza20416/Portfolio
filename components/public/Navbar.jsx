'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function Navbar({ navItems = [], profile = {}, onOpenCommandK }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const resumeUrl = profile.resumeUrl || '/images/Ahmad_Raza_d.pdf';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--glass-bg)] backdrop-blur-2xl border-b border-[var(--glass-border)] shadow-lg py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            AR
          </div>
          <span className="text-lg font-bold text-[var(--foreground)] tracking-tight">
            Ahmad<span className="text-[var(--accent)]">.dev</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 glass-card px-4 py-1.5 rounded-full border border-[var(--glass-border)]">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-1.5 text-xs font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--glass-bg-hover)] rounded-full transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Spotlight Ctrl+K Search Trigger */}
          <button
            onClick={onOpenCommandK}
            className="flex items-center gap-2 glass-card px-3 py-2 rounded-xl text-xs font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border border-[var(--glass-border)] transition-all hover:scale-105"
            title="Search Commands (Ctrl+K)"
          >
            <Search size={14} className="text-[var(--accent)]" />
            <kbd className="text-[10px] font-mono opacity-70">Ctrl+K</kbd>
          </button>

          {/* Theme Switcher Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl glass-card border border-[var(--glass-border)] text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-all hover:scale-105"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
            </button>
          )}

          {/* Download Resume Button */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-xs gap-2 px-4 py-2.5 rounded-xl shadow-md"
          >
            <Download size={15} />
            CV
          </a>
        </div>

        {/* Mobile Menu & Theme Switcher */}
        <div className="flex md:hidden items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg glass-card text-[var(--foreground-secondary)]"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 glass-card rounded-lg text-[var(--foreground)]"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Glass Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-panel border-b border-[var(--glass-border)] shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-sm font-medium text-[var(--foreground-secondary)] hover:text-[var(--accent)] py-2 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs gap-2 px-4 py-3 rounded-xl mt-2 w-full justify-center"
              >
                <Download size={15} />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
