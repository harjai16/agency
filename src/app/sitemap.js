import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import caseStudies from '@/data/case-studies.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export default async function sitemap() {
  const baseUrl = siteUrl;
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic case study pages
  const caseStudyPages = caseStudies.map((caseStudy) => ({
    url: `${baseUrl}${caseStudy.href || `/case-studies/${caseStudy.id}`}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic blog pages from database
  let blogPages = [];
  try {
    const { db } = await connectToDatabase();
    const blogs = await db.collection('blogs')
      .find({ status: 'published' })
      .sort({ createdAt: -1 })
      .toArray();
    
    blogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : blog.createdAt ? new Date(blog.createdAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
    // Continue without blog pages if database fails
  }

  return [...staticPages, ...caseStudyPages, ...blogPages];
}

