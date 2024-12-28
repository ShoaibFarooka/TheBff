import { User } from '@/models';
import Feedback from '@/models/feedback';
import Session from '@/models/Session'; // Assuming you have a Session model
import { NextRequest, NextResponse } from 'next/server';

// POST API to create feedback
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Parse the request body
    const { session: sessionId, stars, feedback } = body;

    // Validate required fields
    if (!sessionId || !stars || !feedback) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: session, stars, feedback' },
        { status: 400 }
      );
    }

    // Find the session by ID and populate the userId
    const session = await Session.findById(sessionId).populate({
      path: 'userId',
      model: User,
      select: 'name _id', // Select only the required fields
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Session not found' },
        { status: 404 }
      );
    }

    // Extract user details from the populated userId
    const { name: userName, _id: userId } = session.userId;

    if (!userName || !userId) {
      return NextResponse.json(
        { success: false, message: 'User information is missing' },
        { status: 400 }
      );
    }

    // Create feedback document in the database
    const newFeedback = await Feedback.create({
      stars,
      text: feedback,
      image: "", // Default value
      status: false, // Default value
      userId, // Use the extracted userId
      sessionId: session._id,
      name: userName, // Add user name to the feedback
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Feedback created successfully',
        data: newFeedback,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating feedback:', error.message);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
};
