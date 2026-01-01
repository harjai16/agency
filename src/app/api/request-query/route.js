import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// GET all form submissions
export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get('pageName'); // Optional filter by page name

    let query = {};
    if (pageName) {
      query.pageName = pageName;
    }

    const submissions = await db.collection('request_queries').find(query).sort({ createdAt: -1 }).toArray();
    
    // Convert ObjectId to string for JSON serialization
    const serializedSubmissions = submissions.map(sub => ({
      ...sub,
      _id: sub._id.toString()
    }));
    
    return NextResponse.json({ success: true, submissions: serializedSubmissions });
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch form submissions' },
      { status: 500 }
    );
  }
}

// POST create new form submission
export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      projectType,
      message,
      pageName
    } = body;

    // Validate required fields
    if (!name || !email || !pageName) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and pageName are required' },
        { status: 400 }
      );
    }

    const submission = {
      name,
      email,
      phone: phone || '',
      company: company || '',
      projectType: projectType || '',
      message: message || '',
      pageName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('request_queries').insertOne(submission);

    return NextResponse.json({
      success: true,
      submission: { ...submission, _id: result.insertedId },
    });
  } catch (error) {
    console.error('Error creating form submission:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create form submission' },
      { status: 500 }
    );
  }
}

