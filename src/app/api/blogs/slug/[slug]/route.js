import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// GET blog by slug
export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { slug } = await params;

    const blog = await db.collection('blogs').findOne({ slug, status: 'published' });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

