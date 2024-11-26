import { NextRequest, NextResponse } from "next/server";
import Session from "@/models/Session"; // Ensure this is the correct path to your model

export const POST = async (req: NextRequest) => {
  try {
    // Extract the data from the body of the request
    const { record, trainerId } = await req.json();

    // Validate if necessary fields are present
    if (!record || !trainerId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the session document based on the session ID (or another unique identifier from the record)
    const session = await Session.findById(record._id);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session not found" },
        { status: 404 }
      );
    }

    // Ensure the ignoredBy array exists
    if (!Array.isArray(session.ignoredBy)) {
      session.ignoredBy = [];
    }

    // Add the trainerId to the ignoredBy array if not already present
    if (!session.ignoredBy.includes(trainerId)) {
      session.ignoredBy.push(trainerId);
    }

    // Save the updated session document
    await session.save();

    // Respond with success and the updated session data
    return NextResponse.json({
      success: true,
      message: "Trainer ID added to ignoredBy successfully",
      data: session,
    });
  } catch (error: any) {
    // Handle errors and respond with an error message
    return NextResponse.json(
      { success: false, message: error.message ?? "Something went wrong" },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
