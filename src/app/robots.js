import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/blog-post/',
          '/request-query/',
          '/test/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

