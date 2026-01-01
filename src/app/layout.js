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
  description: "High-performance website development agency. Strategy, UX, and development focused on leads, conversions, and growth. 10+ projects, 98% satisfaction.",
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
  "description": "Transform your website into a revenue engine. Fast, conversion-focused websites with strategy, UX design, and modern development that drive growth.",
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
