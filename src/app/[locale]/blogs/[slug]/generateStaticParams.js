import { connectToDatabase } from '@/lib/mongodb';
import { locales } from '@/lib/i18n';

/**
 * Generate static params for blog posts
 * This helps with SEO by pre-generating pages at build time
 * 
 * UPDATED: Now generates params for all locales
 */
export async function generateStaticParams() {
  try {
    const { db } = await connectToDatabase();
    const blogs = await db.collection('blogs')
      .find({ status: 'published' })
      .project({ slug: 1 })
      .toArray();

    // Generate params for each locale and slug combination
    const params = [];
    for (const locale of locales) {
      for (const blog of blogs) {
        params.push({
          locale: locale,
          slug: blog.slug,
        });
      }
    }

    return params;
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
    // Return empty array if database fails
    return [];
  }
}
