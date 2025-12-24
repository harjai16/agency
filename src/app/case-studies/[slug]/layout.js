import { Metadata } from 'next';
import caseStudies from '@/data/case-studies.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export async function generateMetadata({ params }): Promise<Metadata> {
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

  const metaTitle = `${heroTitle || title} | Swagatam Tech Case Study`;
  const metaDescription = `${snippet} ${challenge ? `Challenge: ${challenge.substring(0, 100)}...` : ''} ${solution ? `Solution: ${solution.substring(0, 100)}...` : ''}`.substring(0, 160);
  const caseStudyUrl = `${siteUrl}/case-studies/${slug}`;
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`;

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
  ];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords.join(', '),
    authors: [{ name: 'Swagatam Tech' }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: caseStudyUrl,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${client} - ${title}`,
        },
      ],
      siteName: 'Swagatam Tech',
      publishedTime: new Date().toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
      creator: '@swagatamtech',
    },
    alternates: {
      canonical: caseStudyUrl,
    },
    other: {
      'article:author': 'Swagatam Tech',
      'article:section': industry,
      'article:tag': keywords.join(','),
    },
  };
}

export default function CaseStudySlugLayout({ children }) {
  return children;
}

