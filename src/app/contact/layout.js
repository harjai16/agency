import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "Contact Us - Get a Free Website Plan | Swagatam Tech",
  description: "Let's talk about what you're building. Tell us where you are today and what you're trying to achieve. We help teams plan and build modern, high-performance websites with clear goals and realistic timelines. Email: ashwaniharjai.softwaredev@gmail.com. We usually respond within one business day.",
  keywords: [
    "contact web development agency",
    "website consultation",
    "free website plan",
    "web development quote",
    "website development inquiry",
    "contact swagatam tech",
    "web development consultation",
    "website planning",
    "get website quote",
    "web design consultation",
    "website development contact",
    "hire web developers",
    "web agency contact"
  ],
  authors: [{ name: "Swagatam Tech" }],
  creator: "Swagatam Tech",
  publisher: "Swagatam Tech",
  openGraph: {
    title: "Contact Us - Get a Free Website Plan | Swagatam Tech",
    description: "Let's talk about what you're building. We help teams plan and build modern, high-performance websites with clear goals and realistic timelines.",
    url: `${siteUrl}/contact`,
    type: "website",
    siteName: "Swagatam Tech",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - Contact Us",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Get a Free Website Plan | Swagatam Tech",
    description: "Let's talk about what you're building. We help teams plan and build modern, high-performance websites.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@swagatamtech",
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
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

export default function ContactLayout({ children }) {
  return children;
}

