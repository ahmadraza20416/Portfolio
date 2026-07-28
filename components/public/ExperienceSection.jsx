'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';

export default function ExperienceSection({ experience = [] }) {
  const defaultExperience = [
    {
      _id: 'exp1',
      company: 'Self-Employed / Freelance',
      role: 'Full-Stack & GenAI Engineer',
      startDate: '2023',
      endDate: 'Present',
      description: [
        'Designed & developed end-to-end web applications and SaaS platforms for global clients.',
        'Integrated GenAI chatbot workflows using OpenAI APIs and LangChain to automate customer lead pipelines.',
        'Optimized frontend render performance, achieving 95+ Lighthouse scores across major projects.',
      ],
    },
    {
      _id: 'exp2',
      company: 'Tech Solutions Hub',
      role: 'Frontend & React Developer',
      startDate: '2022',
      endDate: '2023',
      description: [
        'Built dynamic, responsive web user interfaces using React.js, Tailwind CSS, and REST API integrations.',
        'Collaborated with design & backend teams to ship high-converting web applications on schedule.',
        'Implemented state management, modular components, and accessible design principles.',
      ],
    },
  ];

  const expList = experience.length > 0 ? experience : defaultExperience;

  return (
    <section id="experience" className="relative py-4">
      <div className="section-container">
        <SectionHeader
          badge="Career Journey"
          title="A summary of my professional experience, key roles, and milestone achievements:"
        />

        {/* Vertical Glowing Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Glowing Guide Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 -translate-x-1/2 opacity-40 hidden md:block" />

          <div className="space-y-8">
            {expList.map((exp, index) => (
              <motion.div
                key={exp._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Timeline Pulsing Node (Desktop) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--glass-bg)] border border-[var(--accent)] hidden md:flex items-center justify-center shadow-lg z-10">
                  <div className="w-3 h-3 rounded-full bg-[var(--accent)] animate-ping" />
                </div>

                {/* Left / Right Card Alternating Layout */}
                <div className={`w-full ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                  <TiltCard className="p-6 md:p-8">
                    {/* Header Details */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--glass-border)]">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                          <Briefcase size={14} />
                          {exp.company}
                        </span>
                        <h3 className="text-lg font-bold text-[var(--foreground)] mt-1">
                          {exp.role}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-xs font-medium text-[var(--foreground-secondary)]">
                        <Calendar size={13} className="text-[var(--accent)]" />
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-2.5">
                      {exp.description?.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed">
                          <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </div>

                {/* Empty Spacer Column for Alternating Grid */}
                <div className={`hidden md:block ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
