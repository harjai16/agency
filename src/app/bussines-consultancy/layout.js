import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "Business Consulting Services | Strategic Business Consulting | Swagatam Tech",
  description: "Expert business consulting services to help you make better decisions, optimize operations, and scale your business. Digital strategy, market research, process improvement, and growth consulting. Data-driven insights that deliver measurable results.",
  keywords: [
    "business consulting",
    "business consultancy",
    "strategic business consulting",
    "business strategy consulting",
    "digital strategy consulting",
    "market research consulting",
    "business model optimization",
    "growth consulting",
    "scaling business",
    "process improvement consulting",
    "technology consulting",
    "business transformation",
    "operational efficiency",
    "business planning",
    "business development consulting",
    "startup consulting",
    "business advisory services",
    "management consulting",
    "business optimization",
    "strategic planning",
    "business analysis",
    "competitive analysis",
    "market analysis",
    "business intelligence",
    "digital transformation consulting",
    "business process improvement",
    "organizational development",
    "change management consulting",
    "business consulting India",
    "consulting services",
    "business consultant",
    "strategic consultant",
    "business growth strategy",
    "revenue optimization",
    "cost optimization",
    "business efficiency",
    "scalable business model",
    "business expansion strategy",
    "startup strategy",
    "SaaS consulting",
    "e-commerce consulting",
    "D2C consulting",
    "professional services consulting"
  ],
  authors: [{ name: "Swagatam Tech" }],
  creator: "Swagatam Tech",
  publisher: "Swagatam Tech",
  openGraph: {
    title: "Business Consulting Services | Strategic Business Consulting | Swagatam Tech",
    description: "Expert business consulting services to help you make better decisions, optimize operations, and scale your business. Digital strategy, market research, and growth consulting.",
    url: `${siteUrl}/bussines-consultancy`,
    type: "website",
    siteName: "Swagatam Tech",
    images: [
      {
        url: `${siteUrl}/logo.jpeg`,
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - Business Consulting Services",
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
    title: "Business Consulting Services | Strategic Business Consulting | Swagatam Tech",
    description: "Expert business consulting services to help you make better decisions, optimize operations, and scale your business.",
    images: [`${siteUrl}/logo.jpeg`],
    site: "@swagatamtech",
    creator: "@swagatamtech",
  },
  alternates: {
    canonical: `${siteUrl}/bussines-consultancy`,
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

export default function BusinessConsultancyLayout({ children }) {
  return children;
}

