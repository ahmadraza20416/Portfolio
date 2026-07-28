'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';
import { getInitials } from '@/lib/utils';

export default function TestimonialsSection({ testimonials = [] }) {
  const [current, setCurrent] = useState(0);

  const defaultTestimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Product Lead',
      company: 'InnovateTech',
      text: 'Ahmad delivered our Next.js web application ahead of schedule. The code quality, smooth animations, and responsive layout exceeded our expectations!',
      avatarUrl: '',
    },
    {
      name: 'David Miller',
      role: 'Founder',
      company: 'CloudFlow Solutions',
      text: 'Extremely talented full-stack engineer. Ahmad built a custom AI chatbot system that automated our client onboarding seamlessly.',
      avatarUrl: '',
    },
  ];

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="relative py-4">
      <div className="section-container">
        <SectionHeader
          badge="Testimonials"
          title="What clients and tech leads say about working together:"
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard className="p-8 md:p-10 text-center relative overflow-hidden">
                  <Quote className="mx-auto mb-4 text-[var(--accent)] opacity-40" size={42} />

                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-[var(--foreground)] text-base md:text-lg leading-relaxed mb-6 italic font-medium">
                    &ldquo;{items[current].text}&rdquo;
                  </p>

                  {/* Avatar */}
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                    {items[current].avatarUrl ? (
                      <img
                        src={items[current].avatarUrl}
                        alt={items[current].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{getInitials(items[current].name)}</span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-[var(--foreground)]">{items[current].name}</h4>
                    <p className="text-xs text-[var(--foreground-secondary)] font-medium">
                      {items[current].role}
                      {items[current].company && ` at ${items[current].company}`}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            {items.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="p-2.5 rounded-full glass-card border border-[var(--glass-border)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        i === current
                          ? 'w-8 bg-[var(--accent)]'
                          : 'w-2.5 bg-[var(--muted)] hover:bg-[var(--foreground-secondary)]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="p-2.5 rounded-full glass-card border border-[var(--glass-border)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
