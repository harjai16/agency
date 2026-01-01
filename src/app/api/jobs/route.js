import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// GET all jobs
export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'active' or 'closed'
    const department = searchParams.get('department');

    let query = {};
    if (status) {
      query.status = status;
    }
    if (department) {
      query.department = department;
    }

    const jobs = await db.collection('jobs').find(query).sort({ createdAt: -1 }).toArray();
    
    // Convert ObjectId to string for JSON serialization
    const serializedJobs = jobs.map(job => ({
      ...job,
      _id: job._id.toString()
    }));
    
    return NextResponse.json({ success: true, jobs: serializedJobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST create new job
export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    const {
      title,
      department,
      type,
      location,
      description,
      requirements = [],
      status = 'active'
    } = body;

    // Validate required fields
    if (!title || !department || !type || !location || !description) {
      return NextResponse.json(
        { success: false, error: 'Title, department, type, location, and description are required' },
        { status: 400 }
      );
    }

    // Generate ID from title
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Check if ID already exists
    const existingJob = await db.collection('jobs').findOne({ id });
    if (existingJob) {
      return NextResponse.json(
        { success: false, error: 'A job with this title already exists' },
        { status: 400 }
      );
    }

    const job = {
      id,
      title,
      department,
      type,
      location,
      description,
      requirements: Array.isArray(requirements) ? requirements : [],
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('jobs').insertOne(job);

    return NextResponse.json({
      success: true,
      job: { ...job, _id: result.insertedId.toString() },
    });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create job' },
      { status: 500 }
    );
  }
}

