import { Metadata } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

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

    return {
      title: `${blog.metaTitle || blog.title} | Swagatam Tech Blog`,
      description: blog.metaDescription || blog.excerpt || blog.title,
      keywords: blog.keywords || '',
      openGraph: {
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt || '',
        type: 'article',
        images: blog.featuredImage ? [blog.featuredImage] : [],
        publishedTime: blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
        authors: blog.author ? [blog.author] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt || '',
        images: blog.featuredImage ? [blog.featuredImage] : [],
      },
    };
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

