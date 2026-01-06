import caseStudies from '@/data/case-studies.json';
import { locales } from '@/lib/i18n';

/**
 * Generate static params for case studies
 * This helps with SEO by pre-generating pages at build time
 * 
 * UPDATED: Now generates params for all locales
 */
export async function generateStaticParams() {
  // Generate params for each locale and slug combination
  const params = [];
  for (const locale of locales) {
    for (const caseStudy of caseStudies) {
      params.push({
        locale: locale,
        slug: caseStudy.id,
      });
    }
  }

  return params;
}
