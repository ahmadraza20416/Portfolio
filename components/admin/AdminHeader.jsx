'use client';

import { signOut } from 'next-auth/react';
import { LogOut, Sun, Moon, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function AdminHeader({ user }) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header className="h-16 bg-[var(--glass-bg)] backdrop-blur-2xl border-b border-[var(--glass-border)] flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 shadow-sm">
      <div className="md:hidden w-10" />

      {/* Title & Status */}
      <div className="hidden md:flex items-center gap-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
          <Sparkles size={13} />
          Admin Control Center
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-[var(--foreground-secondary)] font-medium">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>ISR Engine Active</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Switcher */}
        {mounted && (
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl glass-card border border-[var(--glass-border)] text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-all hover:scale-105"
            title="Switch Theme"
          >
            {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-indigo-600" />}
          </button>
        )}

        {/* User Avatar & Name */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl glass-card border border-[var(--glass-border)]">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
            {getInitials(user?.name || 'Ahmad Raza')}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-[var(--foreground)] leading-tight">
              {user?.name || 'Ahmad Raza'}
            </div>
            <div className="text-[10px] font-semibold text-[var(--accent)] flex items-center gap-1">
              <UserCheck size={10} /> Super Admin
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all hover:scale-105"
          title="Log out of Admin Suite"
        >
          <LogOut size={15} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
