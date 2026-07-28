import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolioarm-new.netlify.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ahmad Raza | MERN Stack Developer',
    template: '%s | Ahmad Raza',
  },
  description:
    'MERN stack developer crafting fast, modern web apps with React, Next.js, Node.js, and MongoDB.',
  keywords: [
    'MERN Stack',
    'Developer',
    'React.js',
    'Node.js',
    'Next.js',
    'Portfolio',
    'Ahmad Raza',
    'AI Developer',
  ],
  authors: [{ name: 'Ahmad Raza' }],
  creator: 'Ahmad Raza',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Ahmad Raza Portfolio',
    title: 'Ahmad Raza | MERN Stack Developer',
    description: 'Skilled developer building polished, high-performance web experiences.',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 630, alt: 'Ahmad Raza Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmad Raza | MERN Stack Developer',
    description: 'Skilled developer building polished, high-performance web experiences.',
    images: ['/images/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ahmad Raza',
              jobTitle: 'MERN Stack Developer',
              url: siteUrl,
              email: 'ahmadraza20416@gmail.com',
              telephone: '+923079618398',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lahore',
                addressRegion: 'Punjab',
                addressCountry: 'Pakistan',
              },
              sameAs: [
                'https://github.com/AhmadRazaCodeBits',
                'https://linkedin.com/in/ahmad-raza416',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--card)',
                color: 'var(--foreground)',
                border: '1px solid var(--card-border)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
