import { locales } from '@/lib/i18n';

/**
 * Generate static params for service detail pages
 * This helps with SEO by pre-generating pages at build time
 */
export async function generateStaticParams() {
  // Service IDs from services-page.json
  const serviceIds = [
    'strategy',
    'ux-ui',
    'development',
    'cms',
    'performance',
    'support'
  ];

  // Generate params for each locale and serviceId combination
  const params = [];
  for (const locale of locales) {
    for (const serviceId of serviceIds) {
      params.push({
        locale: locale,
        serviceId: serviceId,
      });
    }
  }

  return params;
}
