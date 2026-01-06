import { locales, defaultLocale } from '@/lib/i18n';

/**
 * Sitemap Generator
 * 
 * UPDATED: Now generates sitemap entries for all supported locales
 */
export default async function sitemap() {
  const baseUrl = "https://swagatamtech.com";

  // 1️⃣ Static pages (without locale prefix)
  const staticPages = [
    "",
    "/about",
    "/services",
    "/contact",
    "/blogs",
    "/portfolio",
    "/case-studies",
    "/careers",
    "/bussines-consultancy",
  ];

  // 2️⃣ Fetch ONLY published blogs
  const res = await fetch(
    `${baseUrl}/api/blogs?status=published`,
    { cache: "no-store" }
  );

  const data = await res.json();

  const entries = [];

  // Generate entries for each locale
  for (const locale of locales) {
    const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

    // Static pages
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}${localePrefix}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: locales.reduce((acc, loc) => {
            const locPrefix = loc === defaultLocale ? '' : `/${loc}`;
            acc[loc] = `${baseUrl}${locPrefix}${page}`;
            return acc;
          }, {}),
        },
      });
    }

    // Blog pages
    for (const blog of data.blogs || []) {
      entries.push({
        url: `${baseUrl}${localePrefix}/blogs${blog.slug}`,
        lastModified: blog.updatedAt || blog.createdAt,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: locales.reduce((acc, loc) => {
            const locPrefix = loc === defaultLocale ? '' : `/${loc}`;
            acc[loc] = `${baseUrl}${locPrefix}/blogs${blog.slug}`;
            return acc;
          }, {}),
        },
      });
    }
  }

  return entries;
}
