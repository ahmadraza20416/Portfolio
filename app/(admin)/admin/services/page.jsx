'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Plus, Pencil, Trash2, Eye, EyeOff, Code2, Rocket, Zap, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';
import TiltCard from '@/components/shared/TiltCard';

const ICONS = ['Code2', 'Rocket', 'Sparkles', 'Zap', 'ShieldCheck'];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    icon: 'Code2',
    deliverables: [],
    priceRange: '$500 - $2,500',
    order: 1,
    visible: true,
  });

  const loadServices = async () => {
    try {
      const data = await fetch('/api/services?all=true').then((r) => r.json());
      setServices(data);
    } catch {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      icon: 'Code2',
      deliverables: [],
      priceRange: '$500 - $2,500',
      order: services.length + 1,
      visible: true,
    });
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      toast.error('Title and description required');
      return;
    }

    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { ...form, _id: editing } : form;
      const res = await fetch('/api/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast.success(editing ? 'Service updated!' : 'Service created!');
        revalidatePublicSite();
        resetForm();
        loadServices();
      } else {
        toast.error('Failed to save service');
      }
    } catch {
      toast.error('Error saving service');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      toast.success('Service deleted');
      revalidatePublicSite();
      loadServices();
    } catch {
      toast.error('Error deleting service');
    }
  };

  const handleEdit = (srv) => {
    setForm({
      title: srv.title,
      description: srv.description,
      icon: srv.icon || 'Code2',
      deliverables: srv.deliverables || [],
      priceRange: srv.priceRange || '$500 - $2,500',
      order: srv.order || 1,
      visible: srv.visible ?? true,
    });
    setEditing(srv._id);
  };

  const toggleVisibility = async (srv) => {
    try {
      await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: srv._id, visible: !srv.visible }),
      });
      toast.success(srv.visible ? 'Service hidden' : 'Service set visible');
      revalidatePublicSite();
      loadServices();
    } catch {
      toast.error('Error updating service');
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
          <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Services & Solutions Manager</h1>
            <p className="text-xs text-[var(--foreground-secondary)]">Configure services offered, deliverables, pricing ranges & icons</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-purple-400 px-3 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)]">
          {services.length} Services Active
        </span>
      </div>

      {/* Service Editor Form */}
      <div className="glass-card p-6 sm:p-8 space-y-5 border border-[var(--glass-border)] shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--glass-border)]">
          <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
            <Sparkles size={18} className="text-[var(--accent)]" />
            {editing ? 'Edit Service Details' : 'Create New Service'}
          </h2>
          {editing && (
            <button onClick={resetForm} className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)]">
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Service Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="admin-input"
              placeholder="e.g. Full-Stack Web Development"
            />
          </div>

          <div>
            <label className="admin-label">Pricing Range</label>
            <input
              type="text"
              value={form.priceRange}
              onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
              className="admin-input"
              placeholder="e.g. $800 - $3,500"
            />
          </div>

          <div>
            <label className="admin-label">Icon Style</label>
            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="admin-input"
            >
              {ICONS.map((ic) => (
                <option key={ic} value={ic} className="bg-slate-900 text-white">
                  {ic}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="admin-label">Display Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })}
              className="admin-input"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="admin-input resize-none"
            placeholder="Detailed description of what this service provides to clients..."
          />
        </div>

        <div>
          <label className="admin-label">Deliverables List (comma-separated)</label>
          <input
            type="text"
            value={form.deliverables.join(', ')}
            onChange={(e) =>
              setForm({
                ...form,
                deliverables: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            className="admin-input"
            placeholder="Custom Frontend, Scalable Node.js API, MongoDB Database, SEO Optimization"
          />
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-[var(--glass-border)]">
          <button onClick={handleSave} className="btn-primary gap-2 py-3 px-6 text-xs shadow-lg">
            <Plus size={16} /> {editing ? 'Save Changes' : 'Publish Service'}
          </button>
          {editing && (
            <button onClick={resetForm} className="btn-outline py-3 px-4 text-xs">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Services List Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((srv) => (
          <TiltCard key={srv._id} className="p-6 border border-[var(--glass-border)] space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">{srv.priceRange}</span>
                <h3 className="font-bold text-base text-[var(--foreground)]">{srv.title}</h3>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleVisibility(srv)} className="p-1.5 rounded-xl glass-card text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border border-[var(--glass-border)]" title="Toggle Visibility">
                  {srv.visible ? <Eye size={16} className="text-emerald-400" /> : <EyeOff size={16} className="text-rose-400" />}
                </button>
                <button onClick={() => handleEdit(srv)} className="p-1.5 rounded-xl glass-card text-[var(--accent)] border border-[var(--glass-border)]" title="Edit Service">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(srv._id)} className="p-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20" title="Delete Service">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed">{srv.description}</p>

            <div className="space-y-1 pt-2 border-t border-[var(--glass-border)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Deliverables</span>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-[var(--foreground)]">
                {srv.deliverables?.map((d, i) => (
                  <div key={i} className="flex items-center gap-1 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    <span className="truncate">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
