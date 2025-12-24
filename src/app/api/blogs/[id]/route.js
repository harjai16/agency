import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// GET single blog
export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params;

    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      metaTitle,
      metaDescription,
      keywords,
      status,
      featuredImage,
      customSchemaJson,
    } = body;

    // Check if slug already exists (excluding current blog)
    if (slug) {
      const existingBlog = await db.collection('blogs').findOne({
        slug,
        _id: { $ne: new ObjectId(id) },
      });
      if (existingBlog) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    const updateData = {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content && { content }),
      ...(metaTitle && { metaTitle }),
      ...(metaDescription !== undefined && { metaDescription }),
      ...(keywords !== undefined && { keywords }),
      ...(status && { status }),
      ...(featuredImage !== undefined && { featuredImage }),
      ...(customSchemaJson !== undefined && { customSchemaJson }),
      updatedAt: new Date(),
    };

    const result = await db.collection('blogs').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    const updatedBlog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params;

    const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

