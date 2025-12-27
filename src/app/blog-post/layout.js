import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export const metadata = {
  title: "Blog Admin Panel | Swagatam Tech",
  description: "Admin panel for managing blog posts. Create, edit, and manage blog content with SEO optimization tools.",
  keywords: [
    "blog admin",
    "content management",
    "blog management system",
    "CMS admin panel",
    "blog editor",
    "content editor",
    "blog post management"
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
    title: "Blog Admin Panel | Swagatam Tech",
    description: "Admin panel for managing blog posts",
    url: `${siteUrl}/blog-post`,
    type: "website",
    siteName: "Swagatam Tech",
  },
  alternates: {
    canonical: `${siteUrl}/blog-post`,
  },
};

export default function BlogPostLayout({ children }) {
  return <>{children}</>;
}

