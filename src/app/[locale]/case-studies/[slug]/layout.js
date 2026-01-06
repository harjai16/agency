import { Metadata } from 'next';
import caseStudies from '@/data/case-studies.json';
import { generateArticleMetadata as generateSEO } from '@/lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.id === slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Swagatam Tech',
      description: 'The case study you are looking for does not exist.',
    };
  }

  const {
    client,
    industry,
    title,
    heroTitle,
    snippet,
    challenge,
    solution,
    impact,
    services,
    metric,
    liveUrl,
    image,
  } = caseStudy;

  const metaTitle = heroTitle || title;
  const metaDescription = `${snippet} ${challenge ? `Challenge: ${challenge.substring(0, 100)}...` : ''} ${solution ? `Solution: ${solution.substring(0, 100)}...` : ''}`.substring(0, 160);
  const caseStudyUrl = `/case-studies/${slug}`;
  const imageUrl = image || '/logo.jpeg';

  const keywords = [
    'case study',
    'web development case study',
    'website design case study',
    client,
    industry.toLowerCase(),
    ...(services || []).map(s => s.toLowerCase()),
    'website redesign',
    'custom website development',
    'Next.js case study',
    'React case study',
    'WordPress case study',
    'performance optimization',
    'SEO case study',
    'website development case study',
    'web design case study example',
    'website redesign case study',
    'web development project case study',
    'website development success story',
    'web development portfolio case study',
    'website performance case study',
    'conversion optimization case study',
    'website development example',
    'web development case study India',
    'website development project example',
    'web design case study portfolio',
    'website development results',
    'web development project results',
    'website development outcomes',
    'web development case study analysis',
    'website development before and after',
    'web development transformation',
    'website development improvement',
    'web development ROI case study',
  ];

  return generateSEO({
    title: metaTitle,
    description: metaDescription,
    keywords,
    path: caseStudyUrl,
    image: imageUrl,
    publishedTime: new Date().toISOString(),
    author: 'Swagatam Tech',
    section: industry,
  });
}

export default function CaseStudySlugLayout({ children }) {
  return children;
}

