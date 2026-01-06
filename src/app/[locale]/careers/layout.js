import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "Careers at Website Dev Agency | Fast Performance | Swagatam Tech",
  description: "Join Swagatam Tech and build amazing digital experiences. We're hiring talented developers, designers, and marketing specialists. Remote positions available. Competitive salary and great culture.",
  keywords: [
    "careers",
    "jobs",
    "hiring",
    "web developer jobs",
    "frontend developer jobs",
    "UI UX designer jobs",
    "remote jobs",
    "tech jobs",
    "web development careers",
    "design jobs",
    "full stack developer jobs",
    "SEO jobs",
    "digital agency careers",
    "software engineer jobs",
    "career opportunities",
    "job openings",
    "work at Swagatam Tech",
    "join our team"
  ],
  authors: [{ name: "Swagatam Tech" }],
  creator: "Swagatam Tech",
  publisher: "Swagatam Tech",
  openGraph: {
    title: "Careers at Website Dev Agency | Fast Performance | Swagatam",
    description: "Join Swagatam Tech and build amazing digital experiences. We're hiring talented developers, designers, and marketing specialists.",
    url: `${siteUrl}/careers`,
    type: "website",
    siteName: "Swagatam Tech",
    images: [
      {
        url: `${siteUrl}/logo.jpeg`,
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - Careers",
      },
      {
        url: `${siteUrl}/logo.jpeg`,
        width: 800,
        height: 600,
        alt: "Swagatam Tech Logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Website Dev Agency | Fast Performance | Swagatam",
    description: "Join Swagatam Tech and build amazing digital experiences. Remote positions available.",
    images: [`${siteUrl}/logo.jpeg`],
    site: "@swagatamtech",
    creator: "@swagatamtech",
  },
  alternates: {
    canonical: `${siteUrl}/careers`,
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

export default function CareersLayout({ children }) {
  return children;
}

