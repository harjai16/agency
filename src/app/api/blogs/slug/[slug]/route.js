import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// GET blog by slug
export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    
    // Handle params - Next.js 13+ may require await
    let slug;
    if (params && typeof params.then === 'function') {
      const resolvedParams = await params;
      slug = resolvedParams.slug;
    } else {
      slug = params?.slug;
    }
    
    if (!slug) {
      console.error('No slug provided in params:', params);
      return NextResponse.json(
        { success: false, error: 'Slug parameter is required' },
        { status: 400 }
      );
    }
    
    // Decode the slug in case it's URL encoded
    const decodedSlug = decodeURIComponent(slug);
    console.log('Fetching blog with slug:', decodedSlug);

    // Get locale from query params
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // Try to find the blog - first with exact slug match and locale
    let query = { slug: decodedSlug };
    
    // Add locale filter - prefer locale-specific blog, but fallback to blogs without locale
    if (locale && locale !== 'en') {
      query.$or = [
        { ...query, locale: locale },
        { ...query, locale: { $exists: false } } // Fallback to blogs without locale
      ];
    } else {
      // For English, prefer 'en' locale or no locale field
      query.$or = [
        { ...query, locale: 'en' },
        { ...query, locale: { $exists: false } }
      ];
    }

    let blog = await db.collection('blogs').findOne(query);

    // If not found with exact match, try case-insensitive search
    if (!blog) {
      console.log('Exact match not found, trying case-insensitive search');
      const caseInsensitiveQuery = {
        $or: [
          { slug: { $regex: new RegExp(`^${decodedSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } },
          { slug: decodedSlug.toLowerCase() }
        ]
      };
      
      // Add locale filter for case-insensitive search too
      if (locale && locale !== 'en') {
        caseInsensitiveQuery.$or = [
          { ...caseInsensitiveQuery.$or[0], locale: locale },
          { ...caseInsensitiveQuery.$or[0], locale: { $exists: false } },
          { ...caseInsensitiveQuery.$or[1], locale: locale },
          { ...caseInsensitiveQuery.$or[1], locale: { $exists: false } }
        ];
      }
      
      blog = await db.collection('blogs').findOne(caseInsensitiveQuery);
    }

    // Also try without status filter to see all blogs (for debugging)
    if (!blog) {
      console.log('Case-insensitive match not found, checking all blogs');
      const allBlogs = await db.collection('blogs').find({}).limit(10).toArray();
      console.log('Available slugs in database:', allBlogs.map(b => ({ slug: b.slug, status: b.status, title: b.title })));
      
      // Try to find by partial match or similar slug
      const similarBlog = allBlogs.find(b => 
        b.slug && (
          b.slug.includes(decodedSlug) || 
          decodedSlug.includes(b.slug) ||
          b.slug.toLowerCase() === decodedSlug.toLowerCase()
        )
      );
      
      if (similarBlog) {
        console.log('Found similar blog:', similarBlog.slug);
        blog = similarBlog;
      }
    }

    // Filter by published status only if blog is found
    if (blog && blog.status !== 'published') {
      // Still return the blog, but the frontend can handle the status
      console.log('Blog found but status is:', blog.status);
    }

    if (!blog) {
      console.error('Blog not found for slug:', decodedSlug);
      return NextResponse.json(
        { success: false, error: 'Blog not found', slug: decodedSlug },
        { status: 404 }
      );
    }

    // Convert MongoDB _id to string for JSON serialization
    if (blog._id) {
      blog._id = blog._id.toString();
    }

    console.log('Blog found successfully:', blog.title);
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog', details: error.message },
      { status: 500 }
    );
  }
}

