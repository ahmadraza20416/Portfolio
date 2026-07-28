'use client';

import { motion } from 'framer-motion';
import { HeartHandshake, Sparkles, Code2, Rocket, Zap } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';

export default function AboutSection({ profile = {} }) {
  const bullets = profile.aboutBullets || [];
  const fallbackAbout = [
    'I enjoy turning complex engineering problems into simple, beautifully executed digital experiences.',
    'I care deeply about application speed, responsive UI design, and maintainable software architecture.',
    'I build end-to-end full-stack solutions and GenAI integrations that automate operations and accelerate business growth.',
  ];

  return (
    <section id="about" className="relative py-4">
      <div className="section-container relative">
        <SectionHeader
          badge="About me"
          title="I design and engineer modern web applications that feel effortless to use and simple to scale."
        />

        <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[360px_1fr] gap-10 lg:gap-16 items-start">
          {/* Profile Image / Initials Avatar inside 3D Tilt Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto md:mx-0 w-full"
          >
            <TiltCard className="w-full aspect-[4/5] rounded-3xl overflow-hidden p-3">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-[var(--glass-border)] flex items-center justify-center relative group">
                {profile.aboutImageUrl ? (
                  <img
                    src={profile.aboutImageUrl}
                    alt={`About ${profile.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center p-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl shadow-blue-500/30">
                      {profile.name?.split(' ').map(n => n[0]).join('') || 'AR'}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--foreground)] mt-2">{profile.name || 'Ahmad Raza'}</h3>
                    <p className="text-xs text-[var(--accent)] font-medium">Full Stack & AI Engineer</p>
                  </div>
                )}
              </div>
            </TiltCard>
          </motion.div>

          {/* About Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3.5 py-1.5 text-xs font-semibold text-[var(--foreground-secondary)] shadow-sm mb-6">
              <Sparkles size={14} className="text-[var(--accent)]" />
              Building digital products with purpose & precision
            </div>

            <div className="space-y-4 text-[var(--foreground-secondary)] text-base leading-relaxed">
              {(profile.aboutText ? profile.aboutText.split('\n\n') : fallbackAbout).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Core Values / Highlights Box */}
            <div className="mt-8 glass-card p-6 border border-[var(--glass-border)]">
              <div className="flex items-center gap-2 text-[var(--foreground)] font-bold text-sm mb-4">
                <HeartHandshake size={18} className="text-[var(--accent)]" />
                What I Focus On
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Code2, title: 'Clean Architecture', desc: 'Maintainable, type-safe, and modular code codebases.' },
                  { icon: Zap, title: 'Speed & Performance', desc: 'Blazing fast load times and optimized database queries.' },
                  { icon: Rocket, title: 'GenAI Innovation', desc: 'Smart AI chatbots, automated agents, and API flows.' },
                  { icon: HeartHandshake, title: 'User Experience', desc: 'Intuitive visual layouts with smooth animations.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                    <item.icon size={18} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-[var(--foreground)]">{item.title}</h4>
                      <p className="text-xs text-[var(--foreground-secondary)] mt-0.5">{item.desc}</p>
                    </div>
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
