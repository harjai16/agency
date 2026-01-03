/**
 * SEO Utility Functions
 * Backend and frontend SEO helpers for dynamic metadata generation
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.swagatamtech.com';

/**
 * Generate base metadata for any page
 */
export function generateBaseMetadata({
  title,
  description,
  keywords = [],
  path = '/',
  image = '/logo.jpeg',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Swagatam Tech',
  noindex = false,
}) {
  const fullTitle = title.includes('Swagatam Tech') ? title : `${title} | Swagatam Tech`;
  const url = `${siteUrl}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return {
    title: fullTitle,
    description: description.substring(0, 160), // Ensure description is within limit
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    authors: [{ name: author }],
    creator: 'Swagatam Tech',
    publisher: 'Swagatam Tech',
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': noindex ? undefined : -1,
        'max-image-preview': noindex ? undefined : 'large',
        'max-snippet': noindex ? undefined : -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: description.substring(0, 160),
      url,
      type,
      siteName: 'Swagatam Tech',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      ...(publishedTime && { publishedTime: new Date(publishedTime).toISOString() }),
      ...(modifiedTime && { modifiedTime: new Date(modifiedTime).toISOString() }),
      ...(type === 'article' && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description.substring(0, 160),
      images: [imageUrl],
      creator: '@swagatamtech',
    },
    alternates: {
      canonical: url,
    },
    other: {
      'geo.region': 'IN',
      'geo.placename': 'India',
    },
  };
}

/**
 * Generate article metadata (for blog posts, case studies)
 */
export function generateArticleMetadata({
  title,
  description,
  keywords = [],
  path,
  image,
  publishedTime,
  modifiedTime,
  author = 'Swagatam Tech',
  section = 'Web Development',
  noindex = false,
}) {
  const baseMetadata = generateBaseMetadata({
    title,
    description,
    keywords,
    path,
    image,
    type: 'article',
    publishedTime,
    modifiedTime,
    author,
    noindex,
  });

  return {
    ...baseMetadata,
    other: {
      ...baseMetadata.other,
      'article:author': author,
      'article:section': section,
      'article:tag': Array.isArray(keywords) ? keywords.join(',') : keywords,
    },
  };
}

/**
 * Extract keywords from text content
 */
export function extractKeywords(text, additionalKeywords = []) {
  if (!text) return additionalKeywords;
  
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'been', 'be',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word));

  const wordFreq = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });

  const sortedWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);

  return [...new Set([...additionalKeywords, ...sortedWords])];
}

/**
 * Generate meta description from content
 */
export function generateMetaDescription(content, maxLength = 160) {
  if (!content) return '';
  
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (text.length <= maxLength) return text;
  
  // Try to cut at sentence boundary
  const truncated = text.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastPeriod > maxLength * 0.7) {
    return truncated.substring(0, lastPeriod + 1);
  }
  
  if (lastSpace > maxLength * 0.7) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated.substring(0, maxLength - 3) + '...';
}

/**
 * Generate structured data for different page types
 */
export function generateStructuredData(type, data) {
  const baseUrl = siteUrl;

  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Swagatam Tech',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.jpeg`,
          width: 512,
          height: 512,
        },
        description: data.description || 'High-performance website development agency',
        sameAs: data.sameAs || [
          'https://twitter.com/swagatamtech',
          'https://linkedin.com/company/swagatamtech',
          'https://instagram.com/swagatamtech',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'contact@swagatamtech.com',
          contactType: 'Customer Service',
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
        },
      };

    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.description,
        image: data.image ? (data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`) : `${baseUrl}/logo.jpeg`,
        datePublished: data.publishedTime ? new Date(data.publishedTime).toISOString() : new Date().toISOString(),
        dateModified: data.modifiedTime ? new Date(data.modifiedTime).toISOString() : new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: data.author || 'Swagatam Tech',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Swagatam Tech',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.jpeg`,
            width: 512,
            height: 512,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}${data.path}`,
        },
        keywords: Array.isArray(data.keywords) ? data.keywords.join(', ') : data.keywords,
        articleSection: data.section || 'Web Development',
        inLanguage: 'en-US',
      };

    case 'caseStudy':
      return {
        '@context': 'https://schema.org',
        '@type': 'CaseStudy',
        name: data.title,
        description: data.description,
        url: `${baseUrl}${data.path}`,
        image: data.image ? (data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`) : `${baseUrl}/logo.jpeg`,
        author: {
          '@type': 'Organization',
          name: 'Swagatam Tech',
        },
        about: {
          '@type': 'Thing',
          name: data.industry,
        },
        client: {
          '@type': 'Organization',
          name: data.client,
        },
        mainEntity: {
          '@type': 'WebPage',
          '@id': `${baseUrl}${data.path}`,
        },
      };

    case 'service':
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: data.serviceType || 'Website Development',
        provider: {
          '@type': 'Organization',
          name: 'Swagatam Tech',
        },
        areaServed: 'Worldwide',
        description: data.description,
      };

    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
        })),
      };

    default:
      return null;
  }
}

/**
 * Get page-specific SEO configuration
 */
export function getPageSEOConfig(pageType) {
  const configs = {
    home: {
      priority: 1.0,
      changeFrequency: 'weekly',
      keywords: [
        'website development agency',
        'custom website design',
        'Next.js development',
        'React development',
        'web design services',
        'SEO optimization',
      ],
    },
    about: {
      priority: 0.8,
      changeFrequency: 'monthly',
      keywords: [
        'web development agency',
        'website design studio',
        'about swagatam tech',
        'web development team',
      ],
    },
    services: {
      priority: 0.9,
      changeFrequency: 'weekly',
      keywords: [
        'website development services',
        'web design services',
        'custom website development',
        'UX UI design',
      ],
    },
    contact: {
      priority: 0.7,
      changeFrequency: 'monthly',
      keywords: [
        'contact web development agency',
        'website consultation',
        'free website plan',
      ],
    },
    portfolio: {
      priority: 0.8,
      changeFrequency: 'weekly',
      keywords: [
        'web development portfolio',
        'website design portfolio',
        'case studies',
      ],
    },
    blogs: {
      priority: 0.9,
      changeFrequency: 'daily',
      keywords: [
        'web design blog',
        'web development blog',
        'SEO blog',
      ],
    },
    caseStudies: {
      priority: 0.9,
      changeFrequency: 'weekly',
      keywords: [
        'web development case studies',
        'website design case studies',
        'project case studies',
      ],
    },
  };

  return configs[pageType] || configs.home;
}

