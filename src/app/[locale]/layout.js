/**
 * Locale-specific Layout
 * 
 * STATIC EXPORT COMPATIBLE:
 * - Uses generateStaticParams to pre-generate all locale pages at build time
 * - Translations are loaded at build time via dynamic imports
 * - Metadata is generated statically for each locale
 * - No runtime dependencies or SSR-only features
 * 
 * This layout wraps all locale-specific routes.
 * It receives the locale from the [locale] segment and:
 * - Sets the <html lang=""> attribute dynamically
 * - Supports RTL layout automatically for Arabic
 * - Provides locale context to child components
 * - Generates static pages for all 12 supported locales
 */

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import ConditionalLayout from "../ConditionalLayout";
import StructuredData from "@/componenets/global/StructuredData";
import GoogleAnalytics from "@/componenets/global/GoogleAnalytics";
import LocaleHtmlAttributes from "@/componenets/global/LocaleHtmlAttributes";
import { locales, defaultLocale, isRTL } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import { TranslationsProvider } from "@/lib/translations-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.swagatamtech.com';

// Generate metadata for each locale
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const translations = await getTranslations(validLocale);

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

  const ogLocale = ogLocaleMap[validLocale] || 'en_US';

  // Build hreflang alternates for all supported languages
  // For default locale (en), use root path; for others, use /locale path
  const canonicalPath = validLocale === defaultLocale ? '' : `/${validLocale}`;
  const alternates = {
    canonical: `${siteUrl}${canonicalPath}`,
    languages: {},
  };

  // Add hreflang for all locales
  locales.forEach((loc) => {
    const langPath = loc === defaultLocale ? '' : `/${loc}`;
    alternates.languages[loc] = `${siteUrl}${langPath}`;
  });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: translations.seo?.defaultTitle || "Website Dev Agency | Fast Performance | Swagatam Tech",
      template: "%s | Swagatam Tech"
    },
    description: translations.seo?.defaultDescription || "Website development agency building fast performance websites for business growth. We built high-performance websites with strategy, UX design, and development focused on leads, conversions, and measurable growth. 10+ projects, 98% satisfaction.",
    keywords: [
      "website development",
      "web design agency",
      "Next.js development",    
      "React development",
      "custom website design",
      "SEO optimization",
      "performance optimization",
      "conversion optimization",
      "web development services",   
      "digital agency",
      "SaaS website development",
      "e-commerce development"
    ],
    authors: [{ name: "Swagatam Tech" }],
    creator: "Swagatam Tech",
    publisher: "Swagatam Tech",
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
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `${siteUrl}${canonicalPath}`,
      siteName: "Swagatam Tech",
      title: translations.seo?.defaultTitle || "Website Dev Agency | Fast Performance | Swagatam Tech",
      description: translations.seo?.defaultDescription || "Website development agency building fast performance websites for business growth. We built high-performance websites with strategy, UX design, and development focused on leads, conversions, and measurable growth.",
      images: [
        {
          url: "/logo.jpeg",
          width: 1200,
          height: 630,
          alt: "Swagatam Tech - Website Development Agency",
        },
        {
          url: "/logo.jpeg",
          width: 800,
          height: 600,
          alt: "Swagatam Tech Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: translations.seo?.defaultTitle || "Website Dev Agency | Fast Performance | Swagatam Tech",
      description: translations.seo?.defaultDescription || "Website development agency building fast performance websites for business growth. We built high-performance websites with strategy, UX design, and development focused on leads, conversions, and measurable growth.",
      images: ["/logo.jpeg"],
      creator: "@swagatamtech",
      site: "@swagatamtech",
    },
    alternates: alternates,
    icons: {
      icon: [
        { url: '/faviconicon.png', sizes: 'any' },
        { url: '/faviconicon.png', sizes: '16x16', type: 'image/png' },
        { url: '/faviconicon.png', sizes: '32x32', type: 'image/png' },
        { url: '/faviconicon.png', sizes: '192x192', type: 'image/png' },
        { url: '/faviconicon.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: [
        { url: '/faviconicon.png' },
      ],    
      other: [
        { rel: 'mask-icon', url: '/apple-touch-icon.png', color: '#000000' },
        { rel: 'manifest', url: '/site.webmanifest' },
      ],
    },
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
  };
}

/**
 * Generate static params for all locales
 * 
 * STATIC EXPORT COMPATIBLE:
 * - This function runs at build time
 * - Generates static pages for all 12 supported locales
 * - Each locale gets its own pre-rendered pages
 * - Works perfectly with `next export` or `output: 'export'`
 */
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale: locale,
  }));
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Swagatam Tech",
  "url": siteUrl,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteUrl}/logo.jpeg`,
    "width": 512,
    "height": 512
  },
  "image": [
    {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.jpeg`,
      "width": 1200,
      "height": 630
    },
    {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.jpeg`,
      "width": 512,
      "height": 512
    }
  ],
  "description": "Transform your website into a revenue engine. Fast, conversion-focused websites with strategy, UX design, and modern development that drive growth.",
  "sameAs": [
    "https://twitter.com/swagatamtech",
    "https://linkedin.com/company/swagatamtech",
    "https://instagram.com/swagatamtech"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@swagatamtech.com",
    "contactType": "Customer Service",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressLocality": "India"
  },
  "foundingDate": "2024",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "5-10"
  }
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const dir = isRTL(validLocale) ? 'rtl' : 'ltr';
  
  // Load translations for this locale
  const translations = await getTranslations(validLocale);

  return (
    <>
      <LocaleHtmlAttributes locale={validLocale} dir={dir} />
      <StructuredData data={organizationSchema} />
      <div className={`${geistSans.variable} ${geistMono.variable} bg-white text-black min-h-screen`}>
        <GoogleAnalytics />
        <TranslationsProvider translations={translations}>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </TranslationsProvider>
      </div>
    </>
  );
}

