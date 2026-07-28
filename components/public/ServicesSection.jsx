'use client';

import { motion } from 'framer-motion';
import { Bot, Code, Cpu, Layers3, Layout, Rocket, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';

const services = [
  {
    title: 'Full-Stack Web Development',
    description: 'Custom, high-speed web apps built with Next.js, React, Node.js, and MongoDB with clean architecture and responsive UX.',
    icon: Rocket,
    features: ['Next.js App Router & Server Components', 'REST & GraphQL API Integration', 'Database Design & Optimization'],
  },
  {
    title: 'GenAI & Automation Agents',
    description: 'Smart AI integrations, automated conversational chatbots, and custom workflow pipelines using LLMs and OpenAI APIs.',
    icon: Bot,
    features: ['Custom AI Chatbot Development', 'LangChain & OpenAI Workflow Automation', 'Web Scraping & Data Pipelines'],
  },
  {
    title: 'UI/UX & Product Optimization',
    description: 'Upgrading existing digital products with modern glassmorphism aesthetics, fluid 3D micro-animations, and fast performance.',
    icon: Layers3,
    features: ['Modern Glassmorphism & Animated Design', 'Page Speed & SEO Optimization', 'Modular Component Refactoring'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-4">
      <div className="section-container">
        <SectionHeader
          badge="Services & Expertise"
          title="I help businesses turn complex ideas into polished digital products that feel effortless to use."
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <TiltCard className="p-8 h-full flex flex-col justify-between group">
                  <div>
                    {/* Icon Header */}
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--accent)] mb-6 shadow-inner group-hover:scale-110 transition-transform">
                      <Icon size={26} />
                    </div>

                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--foreground-secondary)] mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-4 border-t border-[var(--glass-border)]">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[var(--foreground-secondary)]">
                          <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
