'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';

const COMPARISONS = [
  {
    feature: 'Page Speed & Performance',
    modern: 'Instant load (<1s), ISR caching & 95+ Lighthouse score',
    legacy: 'Slow load (>4s), heavy plugin overhead & bloat',
  },
  {
    feature: 'AI & Automation Support',
    modern: '24/7 AI chatbot agents, lead qualification & API pipelines',
    legacy: 'Manual support forms, delayed response times',
  },
  {
    feature: 'UI/UX & Aesthetics',
    modern: 'Frosted liquid glassmorphism, 3D perspective tilt & dark mode',
    legacy: 'Generic templates, static layout & lack of motion',
  },
  {
    feature: 'Security & Maintenance',
    modern: 'Type-safe React 19, zero vulnerable plugins & serverless scale',
    legacy: 'Frequent plugin exploits, security patches & database locks',
  },
];

export default function TechMatrix() {
  return (
    <section id="why-me" className="relative py-4">
      <div className="section-container max-w-5xl mx-auto">
        <SectionHeader
          badge="Engineering Advantage"
          title="Why modern stack development delivers 10x better speed, security & customer conversion:"
        />

        <TiltCard className="p-6 sm:p-8">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-[var(--glass-border)]">
                  <th className="py-3 px-4 text-[var(--foreground-secondary)] font-semibold uppercase tracking-wider text-xs">
                    Capability
                  </th>
                  <th className="py-3 px-4 text-[var(--accent)] font-bold uppercase tracking-wider text-xs bg-[var(--accent)]/10 rounded-t-xl">
                    ⚡ Ahmad&apos;s Modern Stack (Next.js + GenAI)
                  </th>
                  <th className="py-3 px-4 text-[var(--muted)] font-semibold uppercase tracking-wider text-xs opacity-60">
                    Legacy Web Systems
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--glass-border)]">
                {COMPARISONS.map((item, index) => (
                  <tr key={index} className="hover:bg-[var(--glass-bg-hover)] transition-colors">
                    <td className="py-4 px-4 font-bold text-[var(--foreground)]">
                      {item.feature}
                    </td>
                    <td className="py-4 px-4 bg-[var(--accent)]/5 text-[var(--foreground)] font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{item.modern}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[var(--foreground-secondary)] opacity-60">
                      <div className="flex items-start gap-2">
                        <XCircle size={16} className="text-rose-400/70 mt-0.5 flex-shrink-0" />
                        <span>{item.legacy}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
