'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Code,
  Briefcase,
  FolderKanban,
  MessageSquare,
  Menu as MenuIcon,
  Settings,
  X,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Profile', href: '/admin/profile', icon: User },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Skills Stack', href: '/admin/skills', icon: Code },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'Page Builder', href: '/admin/builder', icon: Layers },
  { label: 'System Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2.5 rounded-xl glass-card border border-[var(--glass-border)] text-[var(--foreground)] shadow-lg"
        aria-label="Open navigation menu"
      >
        <MenuIcon size={20} />
      </button>

      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 glass-panel border-r border-[var(--glass-border)] z-50 transition-transform duration-300 flex flex-col justify-between shadow-2xl backdrop-blur-2xl',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between px-6 h-18 border-b border-[var(--glass-border)] py-4">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                AR
              </div>
              <div>
                <span className="text-sm font-bold text-[var(--foreground)] block">
                  Ahmad<span className="text-[var(--accent)]">.dev</span>
                </span>
                <span className="text-[10px] font-semibold text-[var(--accent)] flex items-center gap-1">
                  <Sparkles size={10} /> Control Suite
                </span>
              </div>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Status Indicator */}
          <div className="px-4 py-3 mx-4 my-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-semibold text-[var(--foreground)]">System Online</span>
            </div>
            <span className="text-[10px] font-mono text-[var(--accent)] font-bold">CMS v2.0</span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group',
                    isActive
                      ? 'bg-[var(--accent)] text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                      : 'text-[var(--foreground-secondary)] hover:bg-[var(--glass-bg-hover)] hover:text-[var(--foreground)] border border-transparent hover:border-[var(--glass-border)]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} className={cn('transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-[var(--accent)]')} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Link */}
        <div className="p-4 border-t border-[var(--glass-border)] bg-[var(--glass-bg)]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-[var(--foreground)] bg-[var(--glass-bg-hover)] border border-[var(--glass-border)] hover:border-[var(--accent)] transition-all group"
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={16} className="text-[var(--accent)] group-hover:scale-110 transition-transform" />
              <span>View Portfolio Live</span>
            </div>
            <ShieldCheck size={14} className="text-emerald-400" />
          </Link>
        </div>
      </aside>
    </>
  );
}
