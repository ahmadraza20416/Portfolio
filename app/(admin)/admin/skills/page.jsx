'use client';

import { useEffect, useState } from 'react';
import { Code, Plus, Pencil, Trash2, Eye, EyeOff, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';
import TiltCard from '@/components/shared/TiltCard';

const CATEGORIES = ['Frontend', 'Backend', 'AI & Automation', 'Database & Tools'];

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [form, setForm] = useState({
    name: '',
    category: 'Frontend',
    level: 90,
    iconUrl: '',
    order: 1,
    visible: true,
  });

  const loadSkills = async () => {
    try {
      const data = await fetch('/api/skills?all=true').then((r) => r.json());
      setSkills(data);
    } catch {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const resetForm = () => {
    setForm({
      name: '',
      category: 'Frontend',
      level: 90,
      iconUrl: '',
      order: skills.length + 1,
      visible: true,
    });
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.name) {
      toast.error('Skill name is required');
      return;
    }

    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { ...form, _id: editing } : form;
      await fetch('/api/skills', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      toast.success(editing ? 'Skill updated!' : 'Skill added!');
      revalidatePublicSite();
      resetForm();
      loadSkills();
    } catch {
      toast.error('Error saving skill');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
      toast.success('Skill deleted');
      revalidatePublicSite();
      loadSkills();
    } catch {
      toast.error('Error deleting skill');
    }
  };

  const handleEdit = (skill) => {
    setForm({
      name: skill.name,
      category: skill.category || 'Frontend',
      level: skill.level || 90,
      iconUrl: skill.iconUrl || '',
      order: skill.order || 1,
      visible: skill.visible ?? true,
    });
    setEditing(skill._id);
  };

  const toggleVisibility = async (skill) => {
    try {
      await fetch('/api/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: skill._id, visible: !skill.visible }),
      });
      toast.success(skill.visible ? 'Skill hidden' : 'Skill set visible');
      revalidatePublicSite();
      loadSkills();
    } catch {
      toast.error('Error updating skill');
    }
  };

  const filteredSkills = skills.filter((s) => {
    if (activeTab === 'All') return true;
    return (s.category || '').toLowerCase().includes(activeTab.toLowerCase());
  });

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
          <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Code size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Manage Skill Stack</h1>
            <p className="text-xs text-[var(--foreground-secondary)]">Manage technologies, category badges & proficiency levels</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)]">
          {skills.length} Tech Skills
        </span>
      </div>

      {/* Editor Form Box */}
      <div className="glass-card p-6 sm:p-8 space-y-5 border border-[var(--glass-border)] shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--glass-border)]">
          <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
            <Sparkles size={18} className="text-[var(--accent)]" />
            {editing ? 'Edit Skill Details' : 'Add New Tech Skill'}
          </h2>
          {editing && (
            <button onClick={resetForm} className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)]">
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Technology Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="admin-input"
              placeholder="e.g. Next.js 15"
            />
          </div>

          <div>
            <label className="admin-label">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="admin-input"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="admin-label">Proficiency Level ({form.level}%)</label>
            <input
              type="range"
              min="50"
              max="100"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: parseInt(e.target.value) })}
              className="w-full h-2 bg-[var(--glass-border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)] mt-3"
            />
          </div>

          <div>
            <label className="admin-label">Icon Path / SVG URL</label>
            <input
              type="text"
              value={form.iconUrl}
              onChange={(e) => setForm({ ...form, iconUrl: e.target.value })}
              className="admin-input"
              placeholder="/icons/icon-nextjs.svg"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-[var(--glass-border)]">
          <button onClick={handleSave} className="btn-primary gap-2 py-3 px-6 text-xs shadow-lg">
            <Plus size={16} /> {editing ? 'Save Changes' : 'Add Skill'}
          </button>
          {editing && (
            <button onClick={resetForm} className="btn-outline py-3 px-4 text-xs">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === cat
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'glass-card text-[var(--foreground-secondary)] border border-[var(--glass-border)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <TiltCard key={skill._id || skill.name} className="p-4 border border-[var(--glass-border)]">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {skill.iconUrl ? (
                  <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8 object-contain" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center text-xs font-bold">
                    {skill.name[0]}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-sm text-[var(--foreground)]">{skill.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">{skill.category || 'Frontend'}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button onClick={() => toggleVisibility(skill)} className="p-1.5 rounded-lg hover:bg-[var(--glass-bg-hover)] text-[var(--foreground-secondary)]" title="Toggle Visibility">
                  {skill.visible ? <Eye size={15} className="text-emerald-400" /> : <EyeOff size={15} className="text-rose-400" />}
                </button>
                <button onClick={() => handleEdit(skill)} className="p-1.5 rounded-lg hover:bg-[var(--glass-bg-hover)] text-[var(--accent)]" title="Edit Skill">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(skill._id)} className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-400" title="Delete Skill">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Proficiency Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold text-[var(--foreground-secondary)]">
                <span>Proficiency</span>
                <span className="text-[var(--foreground)] font-bold">{skill.level || 90}%</span>
              </div>
              <div className="w-full h-1.5 bg-[var(--glass-border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  style={{ width: `${skill.level || 90}%` }}
                />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
