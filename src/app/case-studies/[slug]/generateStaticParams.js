import caseStudies from '@/data/case-studies.json';

/**
 * Generate static params for case studies
 * This helps with SEO by pre-generating pages at build time
 */
export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.id,
  }));
}

