'use client';

import { useEffect, useState } from 'react';
import { Video, Calendar, Clock, CheckCircle2, XCircle, Trash2, Mail, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import TiltCard from '@/components/shared/TiltCard';

export default function AdminMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMeetings = async () => {
    try {
      const data = await fetch('/api/meetings').then((r) => r.json());
      setMeetings(data);
    } catch {
      toast.error('Failed to load strategy call bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch('/api/meetings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, status: newStatus }),
      });
      toast.success(`Booking status updated to ${newStatus}`);
      loadMeetings();
    } catch {
      toast.error('Error updating booking status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this booking request?')) return;
    try {
      await fetch(`/api/meetings?id=${id}`, { method: 'DELETE' });
      toast.success('Booking deleted');
      loadMeetings();
    } catch {
      toast.error('Error deleting booking');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            <Video size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Strategy Call Appointments Manager</h1>
            <p className="text-xs text-[var(--foreground-secondary)]">Manage incoming 15-min discovery strategy call requests from prospective clients</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-indigo-400 px-3 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)]">
          {meetings.length} Bookings Total
        </span>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {meetings.length > 0 ? (
          meetings.map((meet) => (
            <TiltCard key={meet._id} className="p-6 border border-[var(--glass-border)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-[var(--foreground)]">{meet.name}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      meet.status === 'confirmed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : meet.status === 'completed'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : meet.status === 'cancelled'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {meet.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--foreground-secondary)] font-medium">
                    <span className="flex items-center gap-1"><Mail size={13} className="text-[var(--accent)]" /> {meet.email}</span>
                    <span className="flex items-center gap-1"><Clock size={13} className="text-emerald-400" /> {meet.slot}</span>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="flex items-center gap-2">
                  {meet.status !== 'confirmed' && (
                    <button
                      onClick={() => updateStatus(meet._id, 'confirmed')}
                      className="btn-primary text-xs py-1.5 px-3 gap-1 rounded-xl"
                    >
                      <CheckCircle2 size={14} /> Confirm
                    </button>
                  )}
                  {meet.status !== 'completed' && (
                    <button
                      onClick={() => updateStatus(meet._id, 'completed')}
                      className="btn-outline text-xs py-1.5 px-3 gap-1 rounded-xl"
                    >
                      Completed
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(meet._id)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                    title="Delete Request"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-xs space-y-1">
                <div className="font-bold text-[var(--accent)] flex items-center gap-1.5">
                  <Sparkles size={12} /> Call Goal: {meet.goal}
                </div>
                {meet.notes && <p className="text-[var(--foreground-secondary)] italic mt-1">"{meet.notes}"</p>}
              </div>
            </TiltCard>
          ))
        ) : (
          <div className="glass-card p-12 text-center text-xs text-[var(--foreground-secondary)] border border-[var(--glass-border)]">
            No strategy call booking requests received yet.
          </div>
        )}
      </div>
    </div>
  );
}
