import SocialIcons from '@/components/shared/SocialIcons';

export default function Footer({ profile = {} }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              © {year} {profile.name || 'Ahmad Raza'}. All rights reserved.
            </p>
            <p className="text-xs text-[var(--foreground-secondary)] mt-0.5">
              Engineered with Next.js 15, React 19 & Frosted Glassmorphism.
            </p>
          </div>
          <SocialIcons links={profile.socialLinks} size={18} />
        </div>
      </div>
    </footer>
  );
}
