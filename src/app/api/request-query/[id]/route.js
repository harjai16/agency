import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// DELETE a form submission
export async function DELETE(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission ID' },
        { status: 400 }
      );
    }

    const result = await db.collection('request_queries').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting form submission:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete form submission' },
      { status: 500 }
    );
  }
}

