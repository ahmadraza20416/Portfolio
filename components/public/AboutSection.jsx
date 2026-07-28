'use client';

import { motion } from 'framer-motion';
import { HeartHandshake, Sparkles, Code2, Rocket, Zap, GraduationCap, Briefcase, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';

export default function AboutSection({ profile = {} }) {
  const bullets = profile.aboutBullets || [
    'BS in Computer Science (UET Lahore)',
    'MERN Stack Developer at Symtera Technology',
    'GenAI Chatbots & API Automation Specialist',
    'Available for Freelance & Full-Time Roles',
  ];

  const defaultParagraphs = [
    "Hi! I'm Ahmad Raza, a Full-Stack MERN & GenAI Engineer based in Lahore, Pakistan with a Computer Science (BSCS) background.",
    "I currently build scalable web platforms and intelligent automation software at Symtera Technology. Over the past 3+ years, I've engineered full-stack production applications—ranging from charity portals boosting donations by 50% to real-time e-commerce dashboards and GenAI chatbots.",
    "My philosophy is simple: write clean, type-safe code, optimize for lightning-fast performance (<1s page loads), and deliver intuitive glassmorphic UIs that convert visitors into active clients.",
  ];

  const paragraphs = profile.aboutText
    ? profile.aboutText.split('\n\n')
    : defaultParagraphs;

  return (
    <section id="about" className="relative py-4">
      <div className="section-container relative">
        <SectionHeader
          badge="About me"
          title="Full-Stack MERN & GenAI Engineer building performant, pixel-perfect digital solutions:"
        />

        <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Profile Image / Initials Avatar inside 3D Tilt Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto md:mx-0 w-full"
          >
            <TiltCard className="w-full aspect-[4/5] rounded-3xl overflow-hidden p-3 shadow-xl">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-[var(--glass-border)] flex flex-col items-center justify-center relative group">
                {profile.aboutImageUrl ? (
                  <img
                    src={profile.aboutImageUrl}
                    alt={`About ${profile.name || 'Ahmad Raza'}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center p-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl shadow-blue-500/30">
                      AR
                    </div>
                    <h3 className="text-xl font-bold text-[var(--foreground)] mt-2">{profile.name || 'Ahmad Raza'}</h3>
                    <p className="text-xs text-[var(--accent)] font-semibold">Full Stack & GenAI Engineer</p>
                  </div>
                )}
              </div>
            </TiltCard>

            {/* Quick Profile Badges */}
            <div className="mt-4 glass-card p-4 space-y-2.5 border border-[var(--glass-border)]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground)]">
                <GraduationCap size={16} className="text-[var(--accent)] flex-shrink-0" />
                <span>BS in Computer Science</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground)]">
                <Briefcase size={16} className="text-emerald-400 flex-shrink-0" />
                <span>Symtera Technology (Feb 2026 – Present)</span>
              </div>
            </div>
          </motion.div>

          {/* About Details & Bullet Points */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3.5 py-1.5 text-xs font-semibold text-[var(--accent)] shadow-sm mb-5">
              <Sparkles size={14} />
              Full-Stack Engineering & AI Automation Specialist
            </div>

            {/* Main Story Paragraphs */}
            <div className="space-y-4 text-[var(--foreground-secondary)] text-sm sm:text-base leading-relaxed mb-6">
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Career Bullets Grid */}
            <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
              {bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-xs sm:text-sm font-semibold text-[var(--foreground)]"
                >
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Core Competencies Box */}
            <div className="glass-card p-5 border border-[var(--glass-border)]">
              <div className="flex items-center gap-2 text-[var(--foreground)] font-bold text-xs uppercase tracking-wider mb-3">
                <HeartHandshake size={16} className="text-[var(--accent)]" />
                Core Engineering Focus
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Code2, title: 'Modular Architecture', desc: 'React 19 & Next.js 15' },
                  { icon: Zap, title: 'Speed & Scale', desc: '<1s Load & ISR Cache' },
                  { icon: Rocket, title: 'GenAI Agents', desc: 'LLMs & Custom Chatbots' },
                  { icon: HeartHandshake, title: 'User Experience', desc: 'Glassmorphic Motion UI' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                    <item.icon size={16} className="text-[var(--accent)] mb-1.5" />
                    <h4 className="text-xs font-bold text-[var(--foreground)]">{item.title}</h4>
                    <p className="text-[11px] text-[var(--foreground-secondary)] mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
