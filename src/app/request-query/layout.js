import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "Request Query Management | Swagatam Tech",
  description: "Admin panel for managing form submissions and contact requests from across the website.",
  keywords: [
    "form submissions",
    "contact request management",
    "admin panel",
    "query management",
    "form management system",
    "contact form admin",
    "submission management"
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
    title: "Request Query Management | Swagatam Tech",
    description: "Admin panel for managing form submissions and contact requests",
    url: `${siteUrl}/request-query`,
    type: "website",
    siteName: "Swagatam Tech",
  },
  alternates: {
    canonical: `${siteUrl}/request-query`,
  },
};

export default function RequestQueryLayout({ children }) {
  return children;
}

