'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function SectionHeader({ badge, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2 mb-5 text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--accent)] shadow-sm backdrop-blur-md">
        <Sparkles size={13} />
        {badge}
      </div>

      {title && (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--foreground)] max-w-3xl leading-snug tracking-tight">
          {title}
        </h2>
      )}
    </motion.div>
  );
}
