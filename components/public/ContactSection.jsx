'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Mail, Phone, Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionHeader from '@/components/shared/SectionHeader';
import SocialIcons from '@/components/shared/SocialIcons';
import TiltCard from '@/components/shared/TiltCard';

export default function ContactSection({ profile = {} }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');
  const [formError, setFormError] = useState('');

  const emailAddr = profile.email || 'ahmadraza20416@gmail.com';
  const phoneNum = profile.phone || '+92 307 9618398';

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success(`Copied ${type === 'email' ? 'Email' : 'Phone'} to clipboard!`);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Message sent successfully! I will reply shortly.');
        setForm({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-4">
      <div className="section-container">
        <SectionHeader
          badge="Get In Touch"
          title="Have a project in mind, a job opportunity, or just want to connect? Let's talk:"
        />

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start">
            
            {/* Left Column: Direct Contact & Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <TiltCard className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-3">
                  <Sparkles size={13} />
                  Fast Response
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Let&apos;s build something great</h3>
                <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed">
                  I typically respond within 24 hours. Feel free to reach out via email, phone, or send a direct message.
                </p>
              </TiltCard>

              {/* Quick Copy Contact Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleCopy(emailAddr, 'email')}
                  className="w-full flex items-center justify-between glass-card p-4 text-left transition hover:border-[var(--accent)] group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--accent)] group-hover:scale-105 transition-transform">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--foreground-secondary)] font-medium">Email Address</div>
                      <div className="text-sm font-bold text-[var(--foreground)]">{emailAddr}</div>
                    </div>
                  </div>
                  {copied === 'email' ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-[var(--muted)] group-hover:text-[var(--accent)]" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(phoneNum, 'phone')}
                  className="w-full flex items-center justify-between glass-card p-4 text-left transition hover:border-[var(--accent)] group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--accent)] group-hover:scale-105 transition-transform">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--foreground-secondary)] font-medium">Phone / WhatsApp</div>
                      <div className="text-sm font-bold text-[var(--foreground)]">{phoneNum}</div>
                    </div>
                  </div>
                  {copied === 'phone' ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-[var(--muted)] group-hover:text-[var(--accent)]" />}
                </button>
              </div>

              <div className="pt-2 flex justify-center md:justify-start">
                <SocialIcons links={profile.socialLinks} size={22} />
              </div>
            </motion.div>

            {/* Right Column: Frosted Glass Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="glass-card p-6 md:p-8 space-y-5"
            >
              <div>
                <label htmlFor="contact-name" className="admin-label">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="glass-input"
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="admin-label">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (formError) setFormError('');
                  }}
                  className="glass-input"
                  placeholder="sarah@example.com"
                />
                {formError && <p className="mt-1 text-xs text-rose-400 font-medium">{formError}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="admin-label">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="glass-input resize-none"
                  placeholder="Tell me about your project, timeline, or idea..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full gap-2 py-3.5 disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </motion.form>

          </div>
        </div>
      </div>
    </section>
  );
}
