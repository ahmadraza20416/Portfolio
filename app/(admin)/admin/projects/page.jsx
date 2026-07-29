'use client';

import { useEffect, useState } from 'react';
import { FolderKanban, Plus, Pencil, Trash2, Eye, EyeOff, Sparkles, ExternalLink, Github, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';
import ImageUploader from '@/components/shared/ImageUploader';
import TiltCard from '@/components/shared/TiltCard';

const CATEGORIES = ['Full Stack', 'AI & Automation', 'Web Apps'];

export default function AdminProjects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    techStack: [],
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    order: 1,
    visible: true,
  });

  const loadItems = async () => {
    try {
      const data = await fetch('/api/projects?all=true').then((r) => r.json());
      setItems(data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      category: 'Full Stack',
      techStack: [],
      imageUrl: '',
      githubUrl: '',
      liveUrl: '',
      order: items.length + 1,
      visible: true,
    });
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      toast.error('Title and description are required');
      return;
    }
    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { ...form, _id: editing } : form;
      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      toast.success(editing ? 'Project updated!' : 'Project added!');
      revalidatePublicSite();
      resetForm();
      loadItems();
    } catch (err) {
      toast.error(err.message || 'Error saving project');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      toast.success('Project deleted');
      revalidatePublicSite();
      loadItems();
    } catch {
      toast.error('Error deleting project');
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      category: item.category || 'Full Stack',
      techStack: item.techStack || [],
      imageUrl: item.imageUrl || '',
      githubUrl: item.githubUrl || '',
      liveUrl: item.liveUrl || '',
      order: item.order || 1,
      visible: item.visible ?? true,
    });
    setEditing(item._id);
  };

  const toggleVisibility = async (item) => {
    try {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: item._id, visible: !item.visible }),
      });
      toast.success(item.visible ? 'Project hidden' : 'Project set visible');
      revalidatePublicSite();
      loadItems();
    } catch {
      toast.error('Error toggling visibility');
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
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
            <FolderKanban size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Manage Projects</h1>
            <p className="text-xs text-[var(--foreground-secondary)]">Create, edit, reorder & preview portfolio project cards</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-[var(--accent)] px-3 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)]">
          {items.length} Projects Total
        </span>
      </div>

      {/* Editor Form & Live Card Preview Split */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        {/* Form Controls */}
        <div className="glass-card p-6 sm:p-8 space-y-5 border border-[var(--glass-border)] shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--glass-border)]">
            <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
              <Sparkles size={18} className="text-[var(--accent)]" />
              {editing ? 'Edit Project Details' : 'Add New Project'}
            </h2>
            {editing && (
              <button onClick={resetForm} className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)]">
                Cancel Edit
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="admin-label">Project Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="admin-input"
                placeholder="e.g. GenAI Enterprise Chatbot System"
              />
            </div>

            <div>
              <label className="admin-label">Category</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      form.category === cat
                        ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                        : 'glass-card text-[var(--foreground-secondary)] border-[var(--glass-border)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="admin-label">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="admin-input resize-none"
                placeholder="Detailed description of features, engineering accomplishments, and business metrics..."
              />
            </div>

            <div>
              <label className="admin-label">Tech Stack (comma-separated)</label>
              <input
                type="text"
                value={form.techStack.join(', ')}
                onChange={(e) =>
                  setForm({
                    ...form,
                    techStack: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                className="admin-input"
                placeholder="Next.js, React 19, Node.js, OpenAI API, MongoDB"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Project Image Cover</label>
                <ImageUploader
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="admin-label">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    className="admin-input"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div>
                  <label className="admin-label">Live Demo URL</label>
                  <input
                    type="text"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="admin-input"
                    placeholder="https://myproject.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-3 border-t border-[var(--glass-border)]">
            <button onClick={handleSave} className="btn-primary flex-1 gap-2 justify-center py-3 text-xs shadow-lg">
              <Plus size={16} /> {editing ? 'Save Changes' : 'Publish Project'}
            </button>
            {editing && (
              <button onClick={resetForm} className="btn-outline py-3 px-4 text-xs">
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Live Card Preview */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">Live Card Preview</h3>
          <TiltCard className="p-0 overflow-hidden shadow-2xl">
            <div className="relative h-48 w-full bg-slate-900 overflow-hidden border-b border-[var(--glass-border)]">
              {form.imageUrl ? (
                <img src={form.imageUrl} alt={form.title || 'Preview'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-slate-900/60">
                  <span className="text-xs font-bold text-[var(--muted)]">Upload Image or Paste URL</span>
                </div>
              )}
            </div>
            <div className="p-5 space-y-3">
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                {form.category}
              </span>
              <h4 className="text-base font-bold text-[var(--foreground)]">{form.title || 'Project Title Preview'}</h4>
              <p className="text-xs text-[var(--foreground-secondary)] line-clamp-3 leading-relaxed">
                {form.description || 'Project description preview text will appear here...'}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(form.techStack.length > 0 ? form.techStack : ['React.js', 'Next.js', 'Node.js']).map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--foreground-secondary)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* Projects List Items */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)]">Existing Portfolio Projects</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item._id} className="glass-card p-5 border border-[var(--glass-border)] hover:border-[var(--accent)] transition-all flex flex-col justify-between shadow-md">
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">{item.category || 'Full Stack'}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.visible ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}`}>
                    {item.visible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">{item.title}</h3>
                <p className="text-xs text-[var(--foreground-secondary)] line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.techStack?.map((t) => (
                    <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--foreground-secondary)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[var(--glass-border)]">
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleVisibility(item)} className="p-2 rounded-xl glass-card text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border border-[var(--glass-border)]" title="Toggle Visibility">
                    {item.visible ? <Eye size={16} className="text-emerald-400" /> : <EyeOff size={16} className="text-rose-400" />}
                  </button>
                  <button onClick={() => handleEdit(item)} className="p-2 rounded-xl glass-card text-[var(--accent)] border border-[var(--glass-border)] hover:scale-105" title="Edit Project">
                    <Pencil size={16} />
                  </button>
                </div>
                <button onClick={() => handleDelete(item._id)} className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20" title="Delete Project">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
