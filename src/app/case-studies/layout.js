import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata: Metadata = {
  title: "Case Studies - Real Projects, Real Outcomes | Swagatam Tech",
  description: "A closer look at websites we've designed and built — focused on speed, stability, and usability. From faster load times to smoother flows and clearer content, these are shipped projects, not concepts. Detailed case studies showing challenges, solutions, and measurable results.",
  keywords: [
    "web development case studies",
    "website design case studies",
    "project case studies",
    "website redesign examples",
    "Next.js case studies",
    "performance optimization case studies",
    "conversion optimization examples",
    "WordPress case studies",
    "e-commerce case studies",
    "SaaS case studies",
    "website redesign case study",
    "web development success stories",
    "website performance case study",
    "SEO case studies",
    "custom website case studies"
  ],
  authors: [{ name: "Swagatam Tech" }],
  creator: "Swagatam Tech",
  publisher: "Swagatam Tech",
  openGraph: {
    title: "Case Studies - Real Projects, Real Outcomes | Swagatam Tech",
    description: "A closer look at websites we've designed and built — focused on speed, stability, and usability. Real projects, not concepts.",
    url: `${siteUrl}/case-studies`,
    type: "website",
    siteName: "Swagatam Tech",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - Case Studies",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies - Real Projects, Real Outcomes | Swagatam Tech",
    description: "A closer look at websites we've designed and built — focused on speed, stability, and usability.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@swagatamtech",
  },
  alternates: {
    canonical: `${siteUrl}/case-studies`,
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

export default function CaseStudiesLayout({ children }) {
  return children;
}

