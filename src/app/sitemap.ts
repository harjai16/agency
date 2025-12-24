/**
 * Sitemap Generator for Next.js
 * 
 * This file automatically generates sitemap.xml at /sitemap.xml
 * Next.js will convert this to XML format automatically.
 * 
 * The sitemap includes:
 * - All static pages (home, about, services, contact, portfolio, case-studies, blogs)
 * - All published blog posts (from MongoDB)
 * - All case studies (from JSON file)
 * 
 * Update frequency and priorities are set based on page importance.
 */

import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Fetch blog posts from database
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { connectToDatabase } = await import('@/lib/mongodb');
    const { db } = await connectToDatabase();
    const blogs = await db.collection('blogs').find({ status: 'published' }).toArray();
    
    if (blogs && blogs.length > 0) {
      blogRoutes = blogs.map((blog) => ({
        url: `${siteUrl}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt 
          ? new Date(blog.updatedAt) 
          : blog.createdAt 
            ? new Date(blog.createdAt) 
            : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
    // Fallback: try API route if database connection fails
    try {
      // Use absolute URL for internal fetch
      const apiUrl = process.env.NEXT_PUBLIC_SITE_URL 
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?status=published`
        : 'http://localhost:3000/api/blogs?status=published';
      
      const response = await fetch(apiUrl, {
        next: { revalidate: 3600 },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.blogs && Array.isArray(data.blogs)) {
          blogRoutes = data.blogs.map((blog) => ({
            url: `${siteUrl}/blogs/${blog.slug}`,
            lastModified: blog.updatedAt 
              ? new Date(blog.updatedAt) 
              : blog.createdAt 
                ? new Date(blog.createdAt) 
                : new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
          }));
        }
      }
    } catch (apiError) {
      console.error('Error fetching blogs via API for sitemap:', apiError);
    }
  }

  // Fetch case studies from JSON file
  let caseStudyRoutes: MetadataRoute.Sitemap = [];
  try {
    const caseStudies = await import('@/data/case-studies.json');
    const caseStudiesData = caseStudies.default || caseStudies;
    
    if (Array.isArray(caseStudiesData)) {
      caseStudyRoutes = caseStudiesData.map((caseStudy) => ({
        url: `${siteUrl}${caseStudy.href || `/case-studies/${caseStudy.id}`}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching case studies for sitemap:', error);
  }

  // Combine all routes
  const allRoutes: MetadataRoute.Sitemap = [
    ...baseRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
  ];

  return allRoutes;
}

