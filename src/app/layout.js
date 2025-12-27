import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ConditionalLayout from "./ConditionalLayout";
import StructuredData from "@/componenets/global/StructuredData";
     
  


export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.swagatamtech.com'),
  title: {
    default: "Swagatam Tech - Website Development Agency",
    template: "%s | Swagatam Tech"
  },
  description: "High-performance website development agency. Strategy, UX, and development focused on leads, conversions, and growth. 10+ projects delivered.",
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
    locale: "en_US",
    url: "/",
    siteName: "Swagatam Tech",
    title: "Swagatam Tech - Website Development Agency",
    description: "High-performance website development agency. Strategy, UX, and development focused on leads, conversions, and growth.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - Website Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swagatam Tech - Website Development Agency",
    description: "High-performance website development agency. Strategy, UX, and development focused on leads, conversions, and growth.",
    images: ["/og-image.jpg"],
    creator: "@swagatamtech",
  },
  alternates: {
    canonical: "https://www.swagatamtech.com/",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [
      { url: '/favicon.ico' },
    ],
    other: [
      { rel: 'mask-icon', url: '/logo.png', color: '#000000' },
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.swagatamtech.com';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Swagatam Tech",
  "url": siteUrl,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteUrl}/logo.png`,
    "width": 200,
    "height": 200
  },
  "image": `${siteUrl}/logo.png`,
  "description": "High-performance website development agency focused on strategy, UX, and development that drives leads, conversions, and measurable growth.",
  "sameAs": [
    "https://twitter.com/swagatamtech",
    "https://linkedin.com/company/swagatamtech",
    "https://instagram.com/swagatamtech"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "ashwaniharjai.softwaredev@gmail.com",
    "contactType": "Customer Service"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={organizationSchema} />
      </head>
      <body className="bg-white text-black" suppressHydrationWarning>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
