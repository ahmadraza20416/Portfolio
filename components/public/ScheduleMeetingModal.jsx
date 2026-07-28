'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Video, X, CheckCircle2, Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const GOALS = [
  'New Web Application Project',
  'GenAI & Chatbot Integration',
  'Performance & UX Optimization',
  'Hiring & Employment Inquiry',
];

const TIME_SLOTS = [
  '10:00 AM PKT',
  '02:00 PM PKT',
  '05:00 PM PKT',
  '08:00 PM PKT',
];

export default function ScheduleMeetingModal({ isOpen, onClose }) {
  const [goal, setGoal] = useState(GOALS[0]);
  const [slot, setSlot] = useState(TIME_SLOTS[1]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit booking details to contact endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: `[DISCOVERY CALL BOOKING REQUEST]\nGoal: ${goal}\nTime Slot: ${slot}\nNotes: ${notes || 'None'}`,
        }),
      });

      if (res.ok) {
        setBooked(true);
        toast.success('Discovery call request sent! Check your email for confirmation.');
      } else {
        toast.error('Failed to submit booking. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-card relative w-full max-w-lg shadow-2xl border border-[var(--glass-border)] p-6 sm:p-8 overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)] text-[var(--foreground-secondary)] border border-[var(--glass-border)] transition-colors"
          >
            <X size={18} />
          </button>

          {!booked ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--glass-border)]">
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
                  <Video size={22} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    <Sparkles size={12} />
                    15-Min Discovery Call
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">Book a Strategy Session</h3>
                </div>
              </div>

              {/* Goal Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-secondary)] mb-2 block">
                  Select Call Focus
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GOALS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all border ${
                        goal === g
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                          : 'glass-card text-[var(--foreground-secondary)] border-[var(--glass-border)]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-secondary)] mb-2 block">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSlot(t)}
                      className={`p-2 rounded-xl text-xs font-mono text-center transition-all border ${
                        slot === t
                          ? 'bg-emerald-500 text-white border-emerald-500 font-bold'
                          : 'glass-card text-[var(--foreground-secondary)] border-[var(--glass-border)]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                  className="glass-input text-xs py-2.5"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="glass-input text-xs py-2.5"
                />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional project notes or questions..."
                  className="glass-input text-xs py-2.5 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-xs gap-2 justify-center shadow-lg disabled:opacity-50"
              >
                {loading ? 'Sending Request...' : 'Confirm Call Request'}
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)]">Call Requested!</h3>
              <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-[var(--foreground)] font-semibold">{name}</span>. Ahmad will review your request for <span className="text-[var(--accent)] font-semibold">{slot}</span> and send a Google Meet invite to <span className="text-[var(--foreground)] font-semibold">{email}</span>.
              </p>
              <button
                onClick={onClose}
                className="btn-outline text-xs px-6 py-2.5 rounded-xl"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
