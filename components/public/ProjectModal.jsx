'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Frosted Glass Lightbox Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass-card relative w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 p-6 md:p-8 border border-[var(--glass-border)] shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[var(--glass-bg-hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border border-[var(--glass-border)] transition-colors z-20"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Project Image Preview with Browser Header */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 bg-slate-950 border border-[var(--glass-border)] flex flex-col">
            {/* Mini Browser Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="truncate max-w-[280px] bg-slate-800 px-3 py-0.5 rounded text-xs text-slate-300 font-mono">
                {project.liveUrl && project.liveUrl !== '#'
                  ? project.liveUrl
                  : `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.app`}
              </div>
              <div className="w-8" />
            </div>

            <div className="relative flex-1 w-full overflow-hidden bg-slate-900">
              <img
                src={
                  project.imageUrl ||
                  (project.liveUrl && project.liveUrl !== '#'
                    ? `https://image.thum.io/get/width/1024/crop/700/noanimate/${encodeURIComponent(project.liveUrl)}`
                    : '/images/og-image.svg')
                }
                alt={project.title}
                onError={(e) => {
                  if (project.liveUrl && project.liveUrl !== '#' && !e.currentTarget.src.includes('thum.io')) {
                    e.currentTarget.src = `https://image.thum.io/get/width/1024/crop/700/noanimate/${encodeURIComponent(project.liveUrl)}`;
                  }
                }}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Project Title & Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-3">
            <Sparkles size={14} />
            {project.category || 'Featured Work'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Key Feature Highlights */}
          <div className="mb-6 space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--foreground)] mb-3">Key Highlights</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {(project.features || [
                'High Performance & Responsive Mobile UI',
                'Modular & Scalable Component Architecture',
                'Fast API Integration & Database Management',
                'SEO & Production Optimized Codebase',
              ]).map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--foreground-secondary)]">
                  <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-secondary)] mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--glass-bg)] text-[var(--foreground)] border border-[var(--glass-border)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--glass-border)]">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-2"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline gap-2"
              >
                <Github size={16} /> View Code
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
