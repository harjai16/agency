import { locales } from '@/lib/i18n';

const serviceIds = ['strategy', 'ux-ui', 'development', 'cms', 'performance', 'support'];

/**
 * Sitemap Generator – SEO: URLs must match actual routes (all locales in path, including /en)
 * so canonicals and sitemap align; excludes admin/redirect-only pages.
 */
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.swagatamtech.com';

  let caseStudySlugs = [];
  try {
    const caseStudies = (await import('@/data/case-studies.json')).default;
    caseStudySlugs = Array.isArray(caseStudies) ? caseStudies.map((cs) => cs.id).filter(Boolean) : [];
  } catch {
    caseStudySlugs = [];
  }

  // Static paths (no leading locale – we add /locale for each)
  const staticPaths = [
    '',
    '/about',
    '/services',
    '/contact',
    '/blogs',
    '/portfolio',
    '/case-studies',
    '/careers',
    '/bussines-consultancy',
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

  // One entry set per locale – URLs match actual routes (e.g. /en, /en/services)
  for (const locale of locales) {
    const localePrefix = `/${locale}`;

    for (const path of staticPaths) {
      const urlPath = path ? `${localePrefix}${path}` : localePrefix;
      entries.push({
        url: `${baseUrl}${urlPath}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [`${loc}`, `${baseUrl}/${loc}${path}`])
          ),
        },
      });
    }

    for (const serviceId of serviceIds) {
      entries.push({
        url: `${baseUrl}${localePrefix}/services/${serviceId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [`${loc}`, `${baseUrl}/${loc}/services/${serviceId}`])
          ),
        },
      });
    }

    for (const slug of caseStudySlugs) {
      entries.push({
        url: `${baseUrl}${localePrefix}/case-studies/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [`${loc}`, `${baseUrl}/${loc}/case-studies/${slug}`])
          ),
        },
      });
    }

    for (const blog of blogData) {
      if (!blog.slug) continue;
      const slugPath = blog.slug.startsWith('/') ? blog.slug : `/${blog.slug}`;
      entries.push({
        url: `${baseUrl}${localePrefix}/blogs${slugPath}`,
        lastModified: blog.updatedAt || blog.createdAt ? new Date(blog.updatedAt || blog.createdAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [`${loc}`, `${baseUrl}/${loc}/blogs${slugPath}`])
          ),
        },
      });
    }
  }

  return entries;
}
