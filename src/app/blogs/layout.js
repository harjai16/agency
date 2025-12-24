import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata: Metadata = {
  title: 'Blog - Web Design & Development Insights | Swagatam Tech',
  description: 'Practical insights from building real websites. Thoughts and learnings on web design, development, performance, and SEO — based on real projects, not theory. Short, useful reads focused on what actually works when building and shipping websites.',
  keywords: [
    'web design blog',
    'web development blog',
    'website development tips',
    'SEO blog',
    'performance optimization blog',
    'Next.js blog',
    'React development blog',
    'web design insights',
    'digital marketing blog',
    'website development articles',
    'web development tutorials',
    'website optimization tips',
    'web design best practices',
    'development insights',
    'website performance blog',
    'SEO tips blog',
    'web development guides'
  ],
  authors: [{ name: 'Swagatam Tech' }],
  creator: 'Swagatam Tech',
  publisher: 'Swagatam Tech',
  openGraph: {
    title: 'Blog - Web Design & Development Insights | Swagatam Tech',
    description: 'Practical insights from building real websites. Thoughts and learnings on web design, development, performance, and SEO — based on real projects, not theory.',
    url: `${siteUrl}/blogs`,
    type: 'website',
    siteName: 'Swagatam Tech',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Swagatam Tech Blog',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Web Design & Development Insights | Swagatam Tech',
    description: 'Practical insights from building real websites. Thoughts and learnings on web design, development, performance, and SEO.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@swagatamtech',
  },
  alternates: {
    canonical: `${siteUrl}/blogs`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
  },
};

export default function BlogsLayout({ children }) {
  return children;
}

