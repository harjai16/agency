import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "Portfolio - Our Website Development Projects | Swagatam Tech",
  description: "Portfolio of our website development projects. Work we've shipped for teams that value clarity and performance. A selected set of websites and digital products built across SaaS, e-commerce, non-profits, and service businesses.",
  keywords: [
    "web development portfolio",
    "website design portfolio",
    "case studies",
    "web development projects",
    "Next.js projects",
    "React projects",
    "SaaS website examples",
    "e-commerce websites",
    "WordPress portfolio",
    "custom website examples",
    "web design showcase",
    "website examples",
    "portfolio projects",
    "web development work",
    "website design examples",
    "Next.js portfolio",
    "React portfolio",
    "web development portfolio India",
    "website design portfolio examples",
    "web development projects showcase",
    "website development case studies",
    "web design portfolio India",
    "custom website portfolio",
    "website development examples",
    "web development work samples",
    "website design work portfolio",
    "web development agency portfolio",
    "website development company portfolio",
    "web development projects India",
    "website design projects showcase",
    "web development portfolio samples",
    "website development showcase",
    "web design portfolio examples",
    "website development work portfolio",
    "custom web development portfolio"
  ],
  authors: [{ name: "Swagatam Tech" }],
  creator: "Swagatam Tech",
  publisher: "Swagatam Tech",
  openGraph: {
    title: "Portfolio - Our Website Development Projects | Swagatam Tech",
    description: "Work we've shipped for teams that value clarity and performance. A selected set of websites and digital products built across SaaS, e-commerce, and service businesses.",
    url: `${siteUrl}/portfolio`,
    type: "website",
    siteName: "Swagatam Tech",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - Portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Our Website Development Projects | Swagatam Tech",
    description: "Work we've shipped for teams that value clarity and performance. A selected set of websites and digital products.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@swagatamtech",
  },
  alternates: {
    canonical: `${siteUrl}/portfolio`,
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

export default function PortfolioLayout({ children }) {
  return children;
}

