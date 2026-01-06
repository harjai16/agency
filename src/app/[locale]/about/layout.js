import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "About Website Dev Agency | Fast Performance | Swagatam Tech",
  description: "Website development agency built for fast performance and business growth. We built a modern web studio transforming websites into revenue engines. Small, senior team building high-performance websites. Started 2024.",
  keywords: [
    "web development agency",
    "website design studio",
    "about swagatam tech",
    "web development team",
    "modern web agency",
    "website development company",
    "Next.js developers",
    "React developers",
    "custom website development",
    "web design agency India",
    "website development services",
    "professional web developers",
    "senior web development team",
    "web development company about",
    "website design agency team",
    "experienced web developers",
    "web development studio India",
    "website development experts",
    "web design professionals",
    "custom website developers",
    "full-stack web developers",
    "web development agency profile",
    "website development company team",
    "web design studio team",
    "web development services provider",
    "website development agency India",
    "web development company culture",
    "website design agency values",
    "web development team expertise"
  ],
  authors: [{ name: "Swagatam Tech" }],
  creator: "Swagatam Tech",
  publisher: "Swagatam Tech",
  openGraph: {
    title: "About Website Dev Agency | Fast Performance | Swagatam",
    description: "Website development agency built for fast performance and business growth. We built a modern web studio transforming websites into revenue engines. Small, senior team building high-performance websites. Started 2024.",
    url: `${siteUrl}/about`,
    type: "website",
    siteName: "Swagatam Tech",
    images: [
      {
        url: `${siteUrl}/logo.jpeg`,
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - About Us",
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
    title: "About Website Dev Agency | Fast Performance | Swagatam",
    description: "Website development agency built for fast performance and business growth. We built a modern web studio transforming websites into revenue engines. Small, senior team building high-performance websites.",
    images: [`${siteUrl}/logo.jpeg`],
    site: "@swagatamtech",
    creator: "@swagatamtech",
  },
  alternates: {
    canonical: `${siteUrl}/about`,
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

export default function AboutLayout({ children }) {
  return children;
}

