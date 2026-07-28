'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, CheckCircle2, ArrowRight, Sparkles, X, Send } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';

const PROJECT_TYPES = [
  { id: 'web-app', label: 'Full-Stack Web App', basePrice: 800, baseWeeks: 2, desc: 'Next.js 15, React, Node.js & MongoDB' },
  { id: 'genai', label: 'GenAI & AI Chatbot', basePrice: 600, baseWeeks: 1.5, desc: 'OpenAI API, LLM agents & Lead Capture' },
  { id: 'saas', label: 'SaaS Platform Dashboard', basePrice: 1200, baseWeeks: 3, desc: 'Analytics charts, Auth & Billing flows' },
  { id: 'redesign', label: 'UX Redesign & Speed', basePrice: 450, baseWeeks: 1, desc: 'Glassmorphic design, SEO & 95+ Lighthouse' },
];

const FEATURES = [
  { id: 'auth', label: 'User Auth & Roles (NextAuth / JWT)', price: 150, weeks: 0.5 },
  { id: 'ai-bot', label: 'Conversational AI Chatbot Widget', price: 250, weeks: 0.5 },
  { id: 'payments', label: 'Stripe / PayPal Billing Integration', price: 200, weeks: 0.5 },
  { id: 'admin', label: 'Custom Admin Dashboard & CMS', price: 300, weeks: 1 },
  { id: 'database', label: 'Database Schema & API Architecture', price: 200, weeks: 0.5 },
];

const TIMELINES = [
  { id: 'express', label: 'Express Delivery (Priority)', multiplier: 1.25, labelDesc: 'Fastest turnaround' },
  { id: 'standard', label: 'Standard Timeline', multiplier: 1.0, labelDesc: 'Normal pace' },
  { id: 'flexible', label: 'Flexible Schedule', multiplier: 0.95, labelDesc: 'Standard schedule' },
];

export default function ProjectEstimator({ isOpen, onClose }) {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'ai-bot']);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[1]);

  const toggleFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculate totals
  const featuresTotal = FEATURES.filter((f) => selectedFeatures.includes(f.id)).reduce(
    (acc, f) => acc + f.price,
    0
  );
  const weeksTotal =
    selectedType.baseWeeks +
    FEATURES.filter((f) => selectedFeatures.includes(f.id)).reduce((acc, f) => acc + f.weeks, 0);

  const rawPrice = (selectedType.basePrice + featuresTotal) * selectedTimeline.multiplier;
  const estimatedPriceMin = Math.round(rawPrice * 0.9);
  const estimatedPriceMax = Math.round(rawPrice * 1.15);
  const estimatedWeeks = Math.max(1, Math.round(weeksTotal));

  const handleInquire = () => {
    if (onClose) onClose();
    const contactSec = document.querySelector('#contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    }

    const featureNames = FEATURES.filter((f) => selectedFeatures.includes(f.id))
      .map((f) => f.label)
      .join(', ');

    const inquiryText = `Hi Ahmad, I am interested in building a ${selectedType.label}.\nFeatures: ${featureNames || 'Core Setup'}.\nEstimated Scope: ~$${estimatedPriceMin}-${estimatedPriceMax} USD (~${estimatedWeeks} weeks). Let's discuss!`;

    setTimeout(() => {
      const messageInput = document.querySelector('#contact-message');
      if (messageInput) {
        messageInput.value = inquiryText;
        messageInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 600);
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--accent)]">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">Interactive Project Estimator</h3>
            <p className="text-xs text-[var(--foreground-secondary)]">Estimate your project scope & estimated budget range</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] text-[var(--foreground-secondary)] border border-[var(--glass-border)]"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Step 1: Project Type */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3 block">
          1. Select Project Type
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type)}
              className={`p-3.5 rounded-xl text-left transition-all border ${
                selectedType.id === type.id
                  ? 'bg-[var(--accent)]/15 border-[var(--accent)] shadow-md'
                  : 'glass-card hover:border-[var(--glass-border-hover)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--foreground)]">{type.label}</span>
                {selectedType.id === type.id && <CheckCircle2 size={16} className="text-[var(--accent)]" />}
              </div>
              <p className="text-xs text-[var(--foreground-secondary)] mt-1">{type.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Key Features */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3 block">
          2. Select Additional Features
        </label>
        <div className="grid sm:grid-cols-2 gap-2">
          {FEATURES.map((feat) => {
            const isSelected = selectedFeatures.includes(feat.id);
            return (
              <button
                key={feat.id}
                onClick={() => toggleFeature(feat.id)}
                className={`p-3 rounded-xl text-left transition-all border flex items-center justify-between text-xs font-medium ${
                  isSelected
                    ? 'bg-[var(--glass-bg-hover)] border-[var(--accent)] text-[var(--foreground)]'
                    : 'glass-card text-[var(--foreground-secondary)]'
                }`}
              >
                <span>{feat.label}</span>
                <span className={`w-4 h-4 rounded-md border flex items-center justify-center ${isSelected ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'border-[var(--glass-border)]'}`}>
                  {isSelected && <CheckCircle2 size={12} />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[var(--foreground-secondary)] uppercase tracking-wider">
            Estimated Scope Range
          </div>
          <div className="text-2xl font-extrabold text-[var(--foreground)] mt-0.5">
            ${estimatedPriceMin.toLocaleString()} - ${estimatedPriceMax.toLocaleString()} USD
          </div>
          <div className="text-xs text-[var(--accent)] font-medium mt-0.5">
            Target Timeline: ~{estimatedWeeks} {estimatedWeeks === 1 ? 'week' : 'weeks'}
          </div>
        </div>

        <button
          onClick={handleInquire}
          className="btn-primary text-xs gap-2 px-5 py-3 rounded-xl shadow-lg w-full sm:w-auto justify-center"
        >
          <Send size={15} /> Inquire With Scope
        </button>
      </div>
    </div>
  );

  if (isOpen) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-card relative w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 shadow-2xl border border-[var(--glass-border)]"
          >
            {content}
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <section id="estimator" className="relative py-4">
      <div className="section-container max-w-4xl mx-auto">
        <SectionHeader
          badge="Project Estimator"
          title="Plan your custom project scope, calculate timeline estimates & start a conversation:"
        />
        <TiltCard className="p-6 sm:p-8">{content}</TiltCard>
      </div>
    </section>
  );
}
