import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// GET single job
export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params;

    const job = await db.collection('jobs').findOne({ _id: new ObjectId(id) });

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      job: { ...job, _id: job._id.toString() } 
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

// PUT update job
export async function PUT(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      department,
      type,
      location,
      description,
      requirements = [],
      status
    } = body;

    // Validate required fields
    if (!title || !department || !type || !location || !description) {
      return NextResponse.json(
        { success: false, error: 'Title, department, type, location, and description are required' },
        { status: 400 }
      );
    }

    // Generate ID from title
    const newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Check if new ID conflicts with another job
    const existingJob = await db.collection('jobs').findOne({ 
      id: newId,
      _id: { $ne: new ObjectId(id) }
    });
    if (existingJob) {
      return NextResponse.json(
        { success: false, error: 'A job with this title already exists' },
        { status: 400 }
      );
    }

    const updateData = {
      id: newId,
      title,
      department,
      type,
      location,
      description,
      requirements: Array.isArray(requirements) ? requirements : [],
      status,
      updatedAt: new Date(),
    };

    const result = await db.collection('jobs').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    const updatedJob = await db.collection('jobs').findOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      job: { ...updatedJob, _id: updatedJob._id.toString() },
    });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE job
export async function DELETE(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params;

    const result = await db.collection('jobs').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete job' },
      { status: 500 }
    );
  }
}

