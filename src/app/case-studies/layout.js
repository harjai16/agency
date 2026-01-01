import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "Case Studies - Real Projects, Real Outcomes | Swagatam Tech",
  description: "Real website projects with measurable results. Explore case studies showing how we transformed websites into revenue engines through strategy, design, and performance optimization.",
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
    "custom website case studies",
    "web development case studies India",
    "website development case studies",
    "web design case studies examples",
    "website redesign case studies",
    "web development project case studies",
    "website development success stories",
    "web development portfolio case studies",
    "website performance case studies",
    "conversion rate optimization case studies",
    "website development examples",
    "web development case study examples",
    "website development project examples",
    "web design case study portfolio",
    "website development case study India",
    "web development success case studies",
    "website development results",
    "web development project results",
    "website development outcomes",
    "web development case study analysis"
  ],
  authors: [{ name: "Swagatam Tech" }],
  creator: "Swagatam Tech",
  publisher: "Swagatam Tech",
  openGraph: {
    title: "Case Studies - Real Projects, Real Outcomes | Swagatam Tech",
    description: "Real website projects with measurable results. Explore case studies showing how we transformed websites into revenue engines.",
    url: `${siteUrl}/case-studies`,
    type: "website",
    siteName: "Swagatam Tech",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - Case Studies",
      },
      {
        url: `${siteUrl}/logo.png`,
        width: 800,
        height: 600,
        alt: "Swagatam Tech Logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies - Real Projects, Real Outcomes | Swagatam Tech",
    description: "Real website projects with measurable results. Explore case studies showing how we transformed websites into revenue engines.",
    images: [`${siteUrl}/logo.png`],
    site: "@swagatamtech",
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

