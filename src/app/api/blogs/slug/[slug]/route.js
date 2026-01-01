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

    // Try to find the blog - first with exact slug match
    let blog = await db.collection('blogs').findOne({ 
      slug: decodedSlug
    });

    // If not found with exact match, try case-insensitive search
    if (!blog) {
      console.log('Exact match not found, trying case-insensitive search');
      blog = await db.collection('blogs').findOne({ 
        $or: [
          { slug: { $regex: new RegExp(`^${decodedSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } },
          { slug: decodedSlug.toLowerCase() }
        ]
      });
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

