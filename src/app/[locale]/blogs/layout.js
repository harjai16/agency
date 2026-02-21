import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n';
import { locales } from '@/lib/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  // Get locale-specific translations or fallback to English
  const title = t?.blogs?.metaTitle || t?.blogs?.title || 'Blog - Web Design & Development Insights | Swagatam Tech';
  const description = t?.blogs?.metaDescription || t?.blogs?.description || 'Learn from real website projects. Practical insights on web design, development, performance, and SEO from building conversion-focused websites. Real projects, not theory.';

  // Generate hreflang alternates – use actual URL (all locales in path, including /en)
  const alternates = {
    canonical: `${siteUrl}/${locale}/blogs`,
    languages: {},
  };

  for (const loc of locales) {
    alternates.languages[loc] = `${siteUrl}/${loc}/blogs`;
  }

  // Map locale to OpenGraph locale format
  const ogLocaleMap = {
    en: 'en_US',
    hi: 'hi_IN',
    ar: 'ar_SA',
    fr: 'fr_FR',
    es: 'es_ES',
    de: 'de_DE',
    pt: 'pt_BR',
    ru: 'ru_RU',
    ja: 'ja_JP',
    ko: 'ko_KR',
    zh: 'zh_CN',
    it: 'it_IT',
  };

  return {
    title,
    description,
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
      'web development guides',
      'web development blog India',
      'website development blog',
      'web design articles',
      'web development insights',
      'website development tutorials',
      'web development tips and tricks',
      'website performance optimization blog',
      'SEO optimization blog',
      'web development best practices',
      'website development guides',
      'web design tutorials',
      'website development resources',
      'web development learning',
      'website development education',
      'web development industry insights',
      'website development trends',
      'web development case studies blog',
      'website development news',
      'web development expert blog'
    ],
    authors: [{ name: 'Swagatam Tech' }],
    creator: 'Swagatam Tech',
    publisher: 'Swagatam Tech',
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/blogs`,
      type: 'website',
      siteName: 'Swagatam Tech',
      images: [
        {
          url: `${siteUrl}/logo.jpeg`,
          width: 1200,
          height: 630,
          alt: 'Swagatam Tech Blog',
        },
        {
          url: `${siteUrl}/logo.jpeg`,
          width: 800,
          height: 600,
          alt: 'Swagatam Tech Logo',
        },
      ],
      locale: ogLocaleMap[locale] || 'en_US',
      alternateLocale: locales.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/logo.jpeg`],
      site: '@swagatamtech',
      creator: '@swagatamtech',
    },
    alternates,
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
}

export default function BlogsLayout({ children }) {
  return children;
}

