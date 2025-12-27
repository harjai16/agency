import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "Test Page | Swagatam Tech",
  description: "Test page for Open Library book search functionality.",
  keywords: [
    "test page",
    "book search",
    "Open Library",
    "testing",
    "development test"
  ],
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Test Page | Swagatam Tech",
    description: "Test page for Open Library book search functionality",
    url: `${siteUrl}/test`,
    type: "website",
    siteName: "Swagatam Tech",
  },
  alternates: {
    canonical: `${siteUrl}/test`,
  },
};

export default function TestLayout({ children }) {
  return children;
}

