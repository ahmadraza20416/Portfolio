import { Github, Linkedin, Twitter } from 'lucide-react';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function SocialIcons({ links = [], size = 20, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((link) => {
        const Icon = iconMap[link.icon] || Github;
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground-secondary)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--foreground)]"
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
