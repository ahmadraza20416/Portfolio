'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, GitCommit, Star, Award, Zap, Code2 } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';

const METRICS = [
  { label: 'Production Apps Delivered', value: '15+', icon: Code2, desc: 'Web apps, SaaS & GenAI bots' },
  { label: 'Client Satisfaction Rate', value: '100%', icon: Star, desc: 'Across global & local clients' },
  { label: 'Lighthouse Performance', value: '95+', icon: Zap, desc: 'Page speed & SEO optimization' },
  { label: 'On-Time Project Delivery', value: '100%', icon: Award, desc: 'Strict milestone management' },
];

const GUARANTEES = [
  '100% Modular & Type-Safe Codebase',
  'Responsive Mobile-First Glass Design',
  'Automated CI/CD & Deployment Setup',
  'Post-Launch Technical Support',
];

export default function GitHubStatsSection() {
  return (
    <section id="quality" className="relative py-4">
      <div className="section-container max-w-5xl mx-auto">
        <SectionHeader
          badge="Quality Assurance"
          title="Proven metrics & code standards delivered on every project:"
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <TiltCard className="p-5 text-center h-full flex flex-col items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--accent)] mb-3">
                    <Icon size={20} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-[var(--foreground)] mt-1">{metric.label}</div>
                  <div className="text-[11px] text-[var(--foreground-secondary)] mt-0.5">{metric.desc}</div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantees Box */}
        <TiltCard className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-[var(--foreground)]">Code Quality Guarantee</h4>
                <p className="text-xs text-[var(--foreground-secondary)]">Every codebase is written with scalability, security & speed in mind.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto text-xs font-medium text-[var(--foreground)]">
              {GUARANTEES.map((g, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="truncate">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
