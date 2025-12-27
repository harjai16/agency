import { Metadata } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { generateArticleMetadata as generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const { db } = await connectToDatabase();
    const blog = await db.collection('blogs').findOne({ slug, status: 'published' });

    if (!blog) {
      return {
        title: 'Blog Post Not Found | Swagatam Tech',
        description: 'The blog post you are looking for does not exist.',
      };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';
    const blogUrl = `/blogs/${slug}`;
    
    // Use SEO utility for consistent metadata generation
    const keywords = blog.keywords 
      ? (typeof blog.keywords === 'string' ? blog.keywords.split(',').map(k => k.trim()) : blog.keywords)
      : [];
    
    return generateSEO({
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt || blog.title,
      keywords,
      path: blogUrl,
      image: blog.featuredImage || '/og-image.jpg',
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt || blog.createdAt,
      author: blog.author || 'Swagatam Tech',
      section: 'Web Development',
      noindex: blog.status !== 'published',
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Swagatam Tech',
      description: 'Read our latest blog post.',
    };
  }
}

export default function BlogSlugLayout({ children }) {
  return children;
}

