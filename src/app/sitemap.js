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
  // STATIC EXPORT NOTE: For static export, API routes don't work
  // You need to either:
  // 1. Import blog data directly from a JSON file/data source
  // 2. Use ISR (Incremental Static Regeneration)
  // 3. Fetch from external API at build time
  // 
  // For now, we'll try to fetch but handle gracefully if it fails
  let blogData = [];
  try {
    // Only fetch if not in static export mode
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
      const res = await fetch(
        `${baseUrl}/api/blogs?status=published`,
        { cache: "no-store" }
      );
      const data = await res.json();
      blogData = data.blogs || [];
    }
  } catch (error) {
    // In static export, API routes aren't available
    // You should import blog data directly instead
    console.warn('Could not fetch blogs for sitemap (expected in static export)');
    blogData = [];
  }

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
    for (const blog of blogData) {
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
