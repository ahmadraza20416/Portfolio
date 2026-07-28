'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Sparkles, Code2, Terminal as TerminalIcon } from 'lucide-react';
import TypingAnimation from '@/components/shared/TypingAnimation';
import SocialIcons from '@/components/shared/SocialIcons';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import TiltCard from '@/components/shared/TiltCard';
import LiquidGlassBackground from '@/components/shared/LiquidGlassBackground';
import InteractiveTerminal from '@/components/shared/InteractiveTerminal';

export default function HeroSection({ profile = {} }) {
  const [activeTab, setActiveTab] = useState('card'); // 'card' or 'terminal'

  const displayName = profile.name || 'Ahmad Raza';
  const firstName = displayName.split(' ')[0] || 'Ahmad';
  const displayBio =
    profile.bio ||
    'I build polished, high-performance web applications and GenAI solutions for startups and businesses with a focus on speed, usability, and growth.';
  const displayLocation = profile.location || 'Lahore, Pakistan';
  const resumeUrl = profile.resumeUrl || '/images/Ahmad_Raza_d.pdf';

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-8 overflow-hidden">
      {/* Dynamic Liquid Water & Glass Droplet Background */}
      <LiquidGlassBackground />

      <div className="gradient-blur opacity-60" />

      <div className="section-container w-full relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline & Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md px-4 py-2 text-xs font-semibold text-[var(--foreground-secondary)] shadow-sm mb-6">
              <Sparkles size={15} className="text-[var(--accent)] animate-pulse" />
              <span>Full-Stack Developer • GenAI & Automation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.15] tracking-tight">
              I build <span className="text-gradient">modern web experiences</span> that look great & perform effortlessly.
            </h1>

            <div className="text-lg sm:text-xl font-medium text-[var(--accent)] mb-5 h-8 flex items-center gap-2">
              <TypingAnimation
                texts={[
                  'Full Stack Engineer',
                  'GenAI & Automation Developer',
                  'React & Next.js Expert',
                  'Node.js & Chatbot Specialist',
                ]}
                speed={75}
                deleteSpeed={35}
                pauseDuration={2400}
              />
            </div>

            <p className="text-base sm:text-lg text-[var(--foreground-secondary)] mb-8 max-w-xl leading-relaxed">
              Hi, I&apos;m <span className="text-[var(--foreground)] font-semibold">{firstName}</span>. {displayBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a href="#projects" className="btn-primary gap-2">
                View Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-outline">
                Let&apos;s Talk
              </a>
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-outline gap-2">
                <Download size={16} /> Resume
              </a>
            </div>

            {/* Tech Badge Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Next.js', 'React', 'Node.js', 'MongoDB', 'Tailwind', 'GenAI'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1 text-xs font-medium text-[var(--foreground-secondary)] backdrop-blur-md"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Location & Status */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2 text-[var(--foreground-secondary)]">
                <MapPin size={16} className="text-[var(--accent)]" />
                <span>{displayLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[var(--foreground-secondary)] font-medium">Available for new projects</span>
              </div>
            </div>

            <SocialIcons links={profile.socialLinks} size={22} />

            {/* Statistics Counters */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-[var(--glass-border)]">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <div className="text-xs text-[var(--foreground-secondary)] font-medium mt-0.5">Projects Delivered</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                  <AnimatedCounter end={3} suffix="+" />
                </div>
                <div className="text-xs text-[var(--foreground-secondary)] font-medium mt-0.5">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                  <AnimatedCounter end={16} suffix="+" />
                </div>
                <div className="text-xs text-[var(--foreground-secondary)] font-medium mt-0.5">Tech Skills</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Card / Terminal Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <button
                onClick={() => setActiveTab('card')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'card'
                    ? 'bg-[var(--accent)] text-white shadow-md'
                    : 'glass-card text-[var(--foreground-secondary)] border border-[var(--glass-border)]'
                }`}
              >
                <Code2 size={14} /> 3D Stack Card
              </button>
              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'terminal'
                    ? 'bg-[var(--accent)] text-white shadow-md'
                    : 'glass-card text-[var(--foreground-secondary)] border border-[var(--glass-border)]'
                }`}
              >
                <TerminalIcon size={14} /> CLI Terminal
              </button>
            </div>

            {activeTab === 'card' ? (
              <TiltCard className="p-6 md:p-8">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                      Currently Empowering
                    </span>
                    <h2 className="mt-2 text-xl sm:text-2xl font-bold text-[var(--foreground)] leading-snug">
                      Startups & businesses with modern web applications and GenAI chatbots.
                    </h2>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                      <span className="text-[var(--foreground-secondary)]">Frontend Architecture</span>
                      <span className="font-semibold text-[var(--foreground)]">Next.js 15, React 19, Tailwind</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                      <span className="text-[var(--foreground-secondary)]">Backend & Database</span>
                      <span className="font-semibold text-[var(--foreground)]">Node.js, Express, MongoDB</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                      <span className="text-[var(--foreground-secondary)]">GenAI & Automation</span>
                      <span className="font-semibold text-[var(--foreground)]">LLMs, OpenAI APIs, Chatbots</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600/15 to-purple-600/15 border border-[var(--glass-border)] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[var(--foreground)]">Got a project idea?</div>
                      <div className="text-xs text-[var(--foreground-secondary)]">Let&apos;s build something great together.</div>
                    </div>
                    <a href="#contact" className="btn-primary text-xs px-3 py-1.5">
                      Contact
                    </a>
                  </div>
                </div>
              </TiltCard>
            ) : (
              <InteractiveTerminal profile={profile} />
            )}

            {/* Subtle background glow spheres */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
