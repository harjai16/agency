import { connectToDatabase } from '@/lib/mongodb';

/**
 * Generate static params for blog posts
 * This helps with SEO by pre-generating pages at build time
 */
export async function generateStaticParams() {
  try {
    const { db } = await connectToDatabase();
    const blogs = await db.collection('blogs')
      .find({ status: 'published' })
      .project({ slug: 1 })
      .toArray();

    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
    // Return empty array if database fails
    return [];
  }
}

