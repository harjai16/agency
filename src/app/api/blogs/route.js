import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// GET all blogs
export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'draft' or 'published'
    const search = searchParams.get('search'); // Search query

    let query = {};
    if (status) {
      query.status = status;
    }

    // Add search functionality
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { keywords: searchRegex },
        { content: searchRegex }
      ];
    }

    const blogs = await db.collection('blogs').find(query).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST create new blog
export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      metaTitle,
      metaDescription,
      keywords,
      status = 'draft',
      featuredImage,
      author = 'Admin',
      customSchemaJson
    } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingBlog = await db.collection('blogs').findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const blog = {
      title,
      slug,
      excerpt: excerpt || '',
      content,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt || '',
      keywords: keywords || '',
      status,
      featuredImage: featuredImage || '',
      author,
      customSchemaJson: customSchemaJson || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('blogs').insertOne(blog);

    return NextResponse.json({
      success: true,
      blog: { ...blog, _id: result.insertedId },
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog' },
      { status: 500 }
    );
  }
}

