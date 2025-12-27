import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "Website Development Services | Swagatam Tech",
  description: "Website services built to generate leads, sales, and real growth. Strategy, design, and development focused on performance — fast websites that convert visitors into customers.",
  keywords: [
    "website development services",
    "web design services",
    "custom website development",
    "UX UI design",
    "CMS development",
    "website strategy",
    "performance optimization",
    "SEO services",
    "website support",
    "Next.js development",
    "React development",
    "WordPress development",
    "e-commerce development",
    "SaaS website development",
    "website redesign services",
    "conversion optimization",
    "web development pricing",
    "website maintenance",
    "headless CMS",
    "custom web applications",
    "website development packages",
    "web design and development",
    "website development solutions",
    "custom web development services",
    "responsive website development",
    "website development consultation",
    "website development planning",
    "website development strategy",
    "professional website development",
    "website development agency services",
    "website development company services",
    "website development outsourcing",
    "website development India",
    "affordable website development",
    "website development support",
    "website development maintenance",
    "website development updates",
    "website development training",
    "website development consulting"
  ],
  authors: [{ name: "Swagatam Tech" }],
  creator: "Swagatam Tech",
  publisher: "Swagatam Tech",
  openGraph: {
    title: "Website Development Services | Swagatam Tech",
    description: "Website services built to generate leads, sales, and real growth. Strategy, design, and development focused on performance — fast websites that convert visitors into customers.",
    url: `${siteUrl}/services`,
    type: "website",
    siteName: "Swagatam Tech",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - Website Development Services",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Services | Swagatam Tech",
    description: "Website services built to generate leads, sales, and real growth. Strategy, design, and development focused on performance.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@swagatamtech",
  },
  alternates: {
    canonical: `${siteUrl}/services`,
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

export default function ServicesLayout({ children }) {
  return children;
}

