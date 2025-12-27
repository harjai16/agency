import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "About Us - Modern Web Studio | Swagatam Tech",
  description: "About Swagatam Tech - Modern web studio. We're a small, senior team focused on building high-performance websites that become revenue engines. Started in 2024, we challenge the 'agency way' with lean execution, clear communication, and accountability.",
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
    title: "About Us - Modern Web Studio | Swagatam Tech",
    description: "We're a small, senior team focused on building high-performance websites that become revenue engines. Started in 2024, we challenge the 'agency way' with lean execution, clear communication, and accountability.",
    url: `${siteUrl}/about`,
    type: "website",
    siteName: "Swagatam Tech",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - About Us",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Modern Web Studio | Swagatam Tech",
    description: "We're a small, senior team focused on building high-performance websites that become revenue engines.",
    images: [`${siteUrl}/og-image.jpg`],
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

