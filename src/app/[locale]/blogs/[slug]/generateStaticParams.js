import { connectToDatabase } from '@/lib/mongodb';
import { locales } from '@/lib/i18n';
import { getAllStaticBlogSlugs } from '@/lib/staticBlogs';

/**
 * Generate static params for blog posts
 * This helps with SEO by pre-generating pages at build time
 * 
 * UPDATED: Now generates params for all locales
 */
export async function generateStaticParams() {
  const slugs = new Set(getAllStaticBlogSlugs());
  try {
    const { db } = await connectToDatabase();
    const blogs = await db.collection('blogs')
      .find({ status: 'published' })
      .project({ slug: 1 })
      .toArray();
    for (const blog of blogs) {
      if (blog?.slug) {
        slugs.add(blog.slug);
      }
    }
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
  }

  // Generate params for each locale and slug combination
  const params = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({
        locale: locale,
        slug,
      });
    }
  }
  return params;
}
