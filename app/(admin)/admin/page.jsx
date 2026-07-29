'use client';

import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Code,
  Briefcase,
  FolderKanban,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Zap,
  ArrowRight,
  Database
} from 'lucide-react';
import TiltCard from '@/components/shared/TiltCard';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [revalidating, setRevalidating] = useState(false);

  useEffect(() => {
    async function loadStats() {
      try {
        const [skills, experience, projects, testimonials] = await Promise.all([
          fetch('/api/skills?all=true').then((r) => r.json()),
          fetch('/api/experience?all=true').then((r) => r.json()),
          fetch('/api/projects?all=true').then((r) => r.json()),
          fetch('/api/testimonials?all=true').then((r) => r.json()),
        ]);
        setStats({
          skills: skills.length || 0,
          experience: experience.length || 0,
          projects: projects.length || 0,
          testimonials: testimonials.length || 0,
        });
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      }
    }
    loadStats();
  }, []);

  const handleRevalidate = async () => {
    setRevalidating(true);
    try {
      const res = await fetch('/api/revalidate', { method: 'POST' });
      if (res.ok) {
        toast.success('Site cache revalidated successfully!');
      } else {
        toast.error('Revalidation failed.');
      }
    } catch {
      toast.error('Error triggering revalidation.');
    } finally {
      setRevalidating(false);
    }
  };

  const cards = [
    { label: 'Featured Projects', count: stats?.projects ?? '—', icon: FolderKanban, color: 'from-blue-500 to-indigo-600', href: '/admin/projects' },
    { label: 'Skills & Stack', count: stats?.skills ?? '—', icon: Code, color: 'from-emerald-500 to-teal-600', href: '/admin/skills' },
    { label: 'Work Experience', count: stats?.experience ?? '—', icon: Briefcase, color: 'from-purple-500 to-indigo-600', href: '/admin/experience' },
    { label: 'Client Reviews', count: stats?.testimonials ?? '—', icon: MessageSquare, color: 'from-amber-500 to-orange-600', href: '/admin/testimonials' },
  ];

  const quickActions = [
    { label: 'Edit Profile & Bio', desc: 'Update name, bio, email & resume link', icon: '✏️', href: '/admin/profile' },
    { label: 'Manage Projects', desc: 'Add new work, tech stack & covers', icon: '📁', href: '/admin/projects' },
    { label: 'Manage Skills Stack', desc: 'Add tech skills & proficiency levels', icon: '🛠️', href: '/admin/skills' },
    { label: 'System Settings & Seed', desc: 'Seed database, navigation & chatbot', icon: '⚙️', href: '/admin/settings' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Dashboard Top Banner */}
      <div className="glass-card p-6 md:p-8 relative overflow-hidden border border-[var(--glass-border)] shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
              <Sparkles size={14} />
              Control Panel Overview
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
              Welcome to your <span className="text-gradient">Portfolio Suite</span>
            </h1>
            <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1.5 max-w-xl">
              Manage your projects, career experience, skill stack, testimonials, and system configurations live.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRevalidate}
              disabled={revalidating}
              className="btn-outline text-xs py-2.5 px-4 gap-2 rounded-xl disabled:opacity-50"
            >
              <RefreshCw size={15} className={revalidating ? 'animate-spin' : ''} />
              <span>{revalidating ? 'Revalidating...' : 'Revalidate Cache'}</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs py-2.5 px-4 gap-2 rounded-xl shadow-md"
            >
              <ExternalLink size={15} />
              <span>Live Site</span>
            </a>
          </div>
        </div>

        {/* Ambient background blur glow */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a key={card.label} href={card.href} className="block group">
              <TiltCard className="p-6 h-full flex flex-col justify-between border border-[var(--glass-border)]">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-xs font-semibold text-[var(--accent)] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Manage <ArrowRight size={13} />
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[var(--foreground)] mb-1">
                    {card.count}
                  </div>
                  <div className="text-xs font-bold text-[var(--foreground-secondary)]">{card.label}</div>
                </div>
              </TiltCard>
            </a>
          );
        })}
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
          <Zap size={18} className="text-[var(--accent)]" />
          Quick Management Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="glass-card p-5 border border-[var(--glass-border)] hover:border-[var(--accent)] transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl p-2.5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">{action.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">{action.label}</h3>
                  <p className="text-xs text-[var(--foreground-secondary)] mt-0.5">{action.desc}</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </div>

      {/* System Status Diagnostics */}
      <TiltCard className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--glass-border)] mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-[var(--foreground)]">System Diagnostics & Health</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
            All Systems Normal
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-3.5 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] space-y-1">
            <div className="text-[var(--foreground-secondary)]">Server Framework</div>
            <div className="text-[var(--foreground)] font-bold">Next.js 15.5 App Router</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] space-y-1">
            <div className="text-[var(--foreground-secondary)]">Data Engine</div>
            <div className="text-[var(--foreground)] font-bold flex items-center gap-1.5">
              <Database size={14} className="text-[var(--accent)]" />
              MongoDB + Fast JSON Fallback
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] space-y-1">
            <div className="text-[var(--foreground-secondary)]">ISR Revalidation</div>
            <div className="text-[var(--foreground)] font-bold text-emerald-400">60 Seconds Automated</div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
