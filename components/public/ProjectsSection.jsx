'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Eye } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import TiltCard from '@/components/shared/TiltCard';
import ProjectModal from '@/components/public/ProjectModal';
import { seedProjects } from '@/data/seed';

const PROJECT_CATEGORIES = ['All', 'Full Stack', 'AI & Automation', 'Web Apps'];

export default function ProjectsSection({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const projectList = (projects && projects.length > 0) ? projects : seedProjects;

  const filteredProjects = projectList.filter((p) => {
    if (activeCategory === 'All') return true;
    return (p.category || '').toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <section id="projects" className="relative py-4">
      <div className="section-container">
        <SectionHeader
          badge="Selected Work"
          title="A collection of projects reflecting modern design, engineering excellence, and AI innovation:"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[var(--accent)] text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'glass-card text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border border-[var(--glass-border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="h-full"
            >
              <TiltCard className="h-full flex flex-col justify-between overflow-hidden group">
                <div>
                  {/* Thumbnail / Visual Header with Browser Chrome */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative h-52 w-full bg-slate-950 overflow-hidden cursor-pointer border-b border-[var(--glass-border)] flex flex-col"
                  >
                    {/* Mini Browser Bar */}
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border-b border-white/10 z-10 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500/90 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-amber-500/90 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500/90 inline-block" />
                      </div>
                      <div className="truncate max-w-[180px] bg-slate-800/80 px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono">
                        {project.liveUrl && project.liveUrl !== '#'
                          ? project.liveUrl.replace(/^https?:\/\//, '')
                          : `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.app`}
                      </div>
                      <div className="w-6" />
                    </div>

                    {/* Screenshot Preview Image */}
                    <div className="relative flex-1 w-full overflow-hidden bg-slate-900">
                      <img
                        src={
                          project.imageUrl ||
                          (project.liveUrl && project.liveUrl !== '#'
                            ? `https://image.thum.io/get/width/1024/crop/700/noanimate/${encodeURIComponent(project.liveUrl)}`
                            : '/images/og-image.svg')
                        }
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          if (project.liveUrl && project.liveUrl !== '#' && !e.currentTarget.src.includes('thum.io')) {
                            e.currentTarget.src = `https://image.thum.io/get/width/1024/crop/700/noanimate/${encodeURIComponent(project.liveUrl)}`;
                          }
                        }}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Quick Eye Lightbox Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-[2px]">
                      <Eye size={16} /> View Details & Live Demo
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)] mb-2.5">
                      <Sparkles size={12} />
                      {project.category || 'Featured Work'}
                    </div>

                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-base font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs text-[var(--foreground-secondary)] line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[var(--glass-bg)] text-[var(--foreground-secondary)] border border-[var(--glass-border)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack?.length > 4 && (
                        <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[var(--glass-bg)] text-[var(--muted)] border border-[var(--glass-border)]">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-5 pb-5 pt-0 flex items-center gap-2.5">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn-outline text-xs py-2 px-3 flex-1 gap-1.5 justify-center"
                  >
                    <Eye size={14} /> Details
                  </button>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs py-2 px-3 gap-1.5"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl glass-card border border-[var(--glass-border)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                      aria-label="GitHub"
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Lightbox Detail Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
