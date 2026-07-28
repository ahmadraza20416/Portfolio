'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'AI & Automation', 'Database & Tools'];

export default function SkillsSection({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback skills list with category & proficiency if not in DB
  const defaultSkills = [
    { name: 'React.js', category: 'Frontend', level: 95, iconUrl: '/images/react.svg' },
    { name: 'Next.js 15', category: 'Frontend', level: 92, iconUrl: '/images/nextjs.svg' },
    { name: 'JavaScript', category: 'Frontend', level: 95, iconUrl: '/images/javascript.svg' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 96, iconUrl: '/images/tailwind.svg' },
    { name: 'Node.js', category: 'Backend', level: 88, iconUrl: '/images/nodejs.svg' },
    { name: 'Express.js', category: 'Backend', level: 88, iconUrl: '/images/express.svg' },
    { name: 'MongoDB', category: 'Database & Tools', level: 85, iconUrl: '/images/mongodb.svg' },
    { name: 'GenAI / LLMs', category: 'AI & Automation', level: 90, iconUrl: '' },
    { name: 'LangChain', category: 'AI & Automation', level: 85, iconUrl: '' },
    { name: 'Git & GitHub', category: 'Database & Tools', level: 90, iconUrl: '/images/git.svg' },
    { name: 'REST APIs', category: 'Backend', level: 92, iconUrl: '' },
    { name: 'Framer Motion', category: 'Frontend', level: 90, iconUrl: '' },
  ];

  const skillList = skills.length > 0 ? skills : defaultSkills;

  const filteredSkills = skillList.filter((skill) => {
    const matchesCategory =
      activeCategory === 'All' ||
      (skill.category && skill.category.toLowerCase().includes(activeCategory.toLowerCase())) ||
      activeCategory === 'All';

    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="relative py-4">
      <div className="section-container">
        <SectionHeader
          badge="Skills & Technologies"
          title="The core stack, tools, and frameworks I use to build scalable products:"
        />

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[var(--accent)] text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'glass-card text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border border-[var(--glass-border)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input pl-10 py-2 text-xs"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill._id || skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <TiltCard className="p-4 flex flex-col items-center justify-center text-center h-full group">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] mb-3 shadow-inner group-hover:scale-110 transition-transform">
                  {skill.iconUrl ? (
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="text-base font-extrabold text-[var(--accent)]">
                      {skill.name?.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                <span className="text-xs font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {skill.name}
                </span>

                {/* Level / Proficiency Bar */}
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level || 90}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
