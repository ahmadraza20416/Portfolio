'use client';

import { useState, useEffect } from 'react';
import { Settings, RefreshCw, Database, Users, Trash2, UserPlus, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';
import { useSession } from 'next-auth/react';
import TiltCard from '@/components/shared/TiltCard';

export default function AdminSettings() {
  const { data: session } = useSession();
  const [seeding, setSeeding] = useState(false);
  const [revalidating, setRevalidating] = useState(false);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreatingUser(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Admin user created successfully');
        setNewUser({ name: '', email: '', password: '' });
        fetchUsers();
      } else {
        toast.error(data.error || 'Failed to create user');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to revoke this admin access?')) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('User access revoked');
        setUsers(users.filter((u) => u._id !== id));
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to delete user');
      }
    } catch {
      toast.error('Error removing user');
    }
  };

  const handleSeed = async () => {
    if (!confirm('This will reset ALL data to defaults from your resume. Continue?')) return;
    setSeeding(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      if (res.ok) {
        toast.success('Database reset to default resume data!');
        revalidatePublicSite();
      } else {
        toast.error('Failed to seed database');
      }
    } catch {
      toast.error('Error seeding database');
    } finally {
      setSeeding(false);
    }
  };

  const handleRevalidate = async () => {
    setRevalidating(true);
    try {
      await revalidatePublicSite();
      toast.success('Public site ISR cache revalidated successfully!');
    } catch {
      toast.error('Failed to trigger revalidation');
    } finally {
      setRevalidating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
          <Settings size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">System Settings</h1>
          <p className="text-xs text-[var(--foreground-secondary)]">Database operations, access management & cache control</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Database Seed & Cache Control */}
        <div className="glass-card p-6 space-y-5 border border-[var(--glass-border)] shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-[var(--glass-border)]">
            <Database size={20} className="text-[var(--accent)]" />
            <h2 className="text-base font-bold text-[var(--foreground)]">Database & Cache Control</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] space-y-2">
              <h3 className="text-xs font-bold text-[var(--foreground)]">1-Click ISR Cache Revalidation</h3>
              <p className="text-xs text-[var(--foreground-secondary)]">Instantly purge Next.js static page cache across all pages.</p>
              <button
                type="button"
                onClick={handleRevalidate}
                disabled={revalidating}
                className="btn-primary text-xs py-2 px-4 gap-2 rounded-xl disabled:opacity-50"
              >
                <RefreshCw size={14} className={revalidating ? 'animate-spin' : ''} />
                <span>{revalidating ? 'Revalidating...' : 'Revalidate Cache'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
              <h3 className="text-xs font-bold text-rose-400">Database Seed & Reset</h3>
              <p className="text-xs text-[var(--foreground-secondary)]">Reset all profile, project, skill, and testimonial records to initial resume data.</p>
              <button
                type="button"
                onClick={handleSeed}
                disabled={seeding}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-colors text-xs font-bold disabled:opacity-50"
              >
                <RefreshCw size={14} className={seeding ? 'animate-spin' : ''} />
                {seeding ? 'Resetting Data...' : 'Reset Database to Seed'}
              </button>
            </div>
          </div>
        </div>

        {/* Environment Diagnostics */}
        <TiltCard className="p-6 space-y-4 border border-[var(--glass-border)]">
          <div className="flex items-center gap-2 pb-3 border-b border-[var(--glass-border)]">
            <ShieldCheck size={20} className="text-emerald-400" />
            <h2 className="text-base font-bold text-[var(--foreground)]">Environment Diagnostics</h2>
          </div>

          <div className="space-y-2.5 text-xs font-medium">
            <div className="flex justify-between py-2 border-b border-[var(--glass-border)]">
              <span className="text-[var(--foreground-secondary)]">Primary Storage</span>
              <span className="font-bold text-[var(--foreground)]">MongoDB Atlas + Local JSON Engine</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[var(--glass-border)]">
              <span className="text-[var(--foreground-secondary)]">Framework</span>
              <span className="font-bold text-[var(--foreground)]">Next.js 15.5 App Router</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[var(--glass-border)]">
              <span className="text-[var(--foreground-secondary)]">Authentication</span>
              <span className="font-bold text-[var(--foreground)]">NextAuth (JWT Credentials)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[var(--foreground-secondary)]">Deployment Host</span>
              <span className="font-bold text-emerald-400">Netlify Cloud Production</span>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Access Management */}
      <div className="glass-card p-6 sm:p-8 space-y-6 border border-[var(--glass-border)] shadow-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-[var(--glass-border)]">
          <Users size={20} className="text-[var(--accent)]" />
          <h2 className="text-base font-bold text-[var(--foreground)]">Admin Access & Role Management</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add User Form */}
          <form onSubmit={handleCreateUser} className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">Grant New Administrator</h3>

            <div>
              <label className="admin-label">Full Name</label>
              <input
                type="text"
                required
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="admin-input"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="admin-label">Email Address</label>
              <input
                type="email"
                required
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="admin-input"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="admin-label">Password</label>
              <input
                type="password"
                required
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="admin-input"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={creatingUser}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-xs shadow-lg disabled:opacity-50"
            >
              <UserPlus size={16} />
              {creatingUser ? 'Creating...' : 'Create Admin Access'}
            </button>
          </form>

          {/* List Users */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-secondary)]">Current Administrators</h3>

            {loadingUsers ? (
              <div className="animate-pulse space-y-3">
                <div className="h-12 bg-[var(--glass-border)] rounded-xl" />
                <div className="h-12 bg-[var(--glass-border)] rounded-xl" />
              </div>
            ) : (
              <div className="space-y-3">
                {users.length === 0 ? (
                  <div className="text-xs text-[var(--foreground-secondary)] text-center py-6 border border-dashed border-[var(--glass-border)] rounded-xl">
                    No additional admin users created.
                  </div>
                ) : (
                  users.map((u) => (
                    <div key={u._id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                      <div>
                        <p className="font-bold text-xs text-[var(--foreground)]">{u.name}</p>
                        <p className="text-[11px] text-[var(--foreground-secondary)]">{u.email}</p>
                      </div>
                      {session?.user?.email !== u.email && (
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Revoke Access"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))
                )}
                <p className="text-[11px] text-[var(--foreground-secondary)] mt-4 leading-relaxed">
                  Note: The primary Super Admin configured in environment variables (`ADMIN_EMAIL`) has root access across all instances.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
