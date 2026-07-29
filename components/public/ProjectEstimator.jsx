'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, CheckCircle2, ArrowRight, Sparkles, X } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';

const DEFAULT_TYPES = [
  { id: 'web-app', label: 'Full-Stack Web App', basePrice: 1200, baseWeeks: 2, desc: 'Next.js 15, React 19, Node.js & MongoDB' },
  { id: 'genai', label: 'GenAI & AI Chatbot', basePrice: 950, baseWeeks: 1.5, desc: 'OpenAI API, LLM agents & Lead Capture' },
  { id: 'saas', label: 'SaaS Platform Dashboard', basePrice: 1500, baseWeeks: 3, desc: 'Analytics charts, Auth & Billing flows' },
  { id: 'redesign', label: 'Custom Full-Stack Platform', basePrice: 2200, baseWeeks: 4, desc: 'Enterprise architecture & AI automation' },
];

const DEFAULT_FEATURES = [
  { id: 'auth', label: 'User Auth & Role Permissions', price: 350, weeks: 0.5 },
  { id: 'ai-bot', label: 'Conversational AI Chatbot Widget', price: 350, weeks: 0.5 },
  { id: 'payments', label: 'Stripe / PayPal Gateway Integration', price: 400, weeks: 0.5 },
  { id: 'admin', label: 'SEO & OpenGraph Optimization', price: 250, weeks: 0.5 },
  { id: 'database', label: 'Cloud CI/CD & Serverless Setup', price: 300, weeks: 0.5 },
];

const TIMELINES = [
  { id: 'express', label: 'Urgent Delivery (1 week)', multiplier: 1.8, labelDesc: 'Priority fast track' },
  { id: 'standard', label: 'Expedited (2 weeks)', multiplier: 1.35, labelDesc: 'Accelerated delivery' },
  { id: 'flexible', label: 'Standard (3-4 weeks)', multiplier: 1.0, labelDesc: 'Normal schedule' },
];

export default function ProjectEstimator({ isOpen, onClose }) {
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [selectedType, setSelectedType] = useState(DEFAULT_TYPES[0]);
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'ai-bot']);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[2]);

  useEffect(() => {
    async function fetchEstimatorSettings() {
      try {
        const res = await fetch('/api/estimator');
        if (res.ok) {
          const data = await res.json();
          if (data && data.currency) {
            setCurrencySymbol(data.currency.symbol || '$');
            setCurrencyCode(data.currency.code || 'USD');
          }
        }
      } catch (e) {
        console.error('Failed to load currency settings:', e);
      }
    }
    fetchEstimatorSettings();
  }, []);

  const toggleFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const featuresTotal = DEFAULT_FEATURES.filter((f) => selectedFeatures.includes(f.id)).reduce(
    (acc, f) => acc + f.price,
    0
  );
  const weeksTotal =
    selectedType.baseWeeks +
    DEFAULT_FEATURES.filter((f) => selectedFeatures.includes(f.id)).reduce((acc, f) => acc + f.weeks, 0);

  const subtotal = selectedType.basePrice + featuresTotal;
  const grandTotal = Math.round(subtotal * selectedTimeline.multiplier);

  const handleConsultation = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    if (onClose) onClose();
  };

  const content = (
    <div className="space-y-6">
      {/* Step 1: Project Type */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-secondary)] mb-3 block">
          1. Select Project Type
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {DEFAULT_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`p-4 rounded-2xl text-left transition-all border ${
                selectedType.id === type.id
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-blue-500/25 scale-[1.02]'
                  : 'glass-card text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border-[var(--glass-border)]'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm text-[var(--foreground)] leading-tight">{type.label}</span>
                <span className="text-xs font-mono font-bold">{currencySymbol}{type.basePrice}</span>
              </div>
              <p className="text-[11px] opacity-80 leading-snug">{type.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Features & Modules */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-secondary)] mb-3 block">
          2. Add Feature Modules
        </label>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {DEFAULT_FEATURES.map((feat) => {
            const isChecked = selectedFeatures.includes(feat.id);
            return (
              <button
                key={feat.id}
                type="button"
                onClick={() => toggleFeature(feat.id)}
                className={`p-3 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between border ${
                  isChecked
                    ? 'bg-emerald-500/15 border-emerald-500 text-[var(--foreground)] font-bold'
                    : 'glass-card text-[var(--foreground-secondary)] border-[var(--glass-border)]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <CheckCircle2 size={16} className={isChecked ? 'text-emerald-400' : 'text-[var(--muted)]'} />
                  <span className="truncate">{feat.label}</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-[var(--accent)]">+{currencySymbol}{feat.price}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Timeline & Schedule */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-secondary)] mb-3 block">
          3. Delivery Pace & Schedule
        </label>
        <div className="grid sm:grid-cols-3 gap-2.5">
          {TIMELINES.map((time) => (
            <button
              key={time.id}
              type="button"
              onClick={() => setSelectedTimeline(time)}
              className={`p-3 rounded-xl text-xs font-semibold text-center transition-all border ${
                selectedTimeline.id === time.id
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                  : 'glass-card text-[var(--foreground-secondary)] border-[var(--glass-border)]'
              }`}
            >
              <div>{time.label}</div>
              <div className="text-[10px] font-mono opacity-80 mt-0.5">{time.labelDesc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Summary Calculation Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
            <Sparkles size={14} /> Estimated Investment ({currencyCode})
          </div>
          <div className="text-3xl font-extrabold text-[var(--foreground)] mt-1">
            {currencySymbol}{grandTotal.toLocaleString()} <span className="text-xs text-[var(--foreground-secondary)] font-normal">/ estimated {Math.ceil(weeksTotal)} weeks</span>
          </div>
        </div>

        <button onClick={handleConsultation} className="btn-primary text-xs py-3 px-6 gap-2 shadow-lg w-full sm:w-auto justify-center">
          Request Formal Proposal <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  if (isOpen) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-md" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="glass-card relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[var(--glass-border)] shadow-2xl z-10">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] text-[var(--foreground-secondary)] border border-[var(--glass-border)]">
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <Calculator size={22} className="text-[var(--accent)]" />
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Project Scope & Budget Estimator</h2>
            </div>
            {content}
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <section id="estimator" className="relative py-4">
      <div className="section-container max-w-4xl mx-auto">
        <SectionHeader badge="Project Calculator" title="Estimate your project scope, delivery timeline & budget in real time:" />
        <TiltCard className="p-6 sm:p-8">{content}</TiltCard>
      </div>
    </section>
  );
}
