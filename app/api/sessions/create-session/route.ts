import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose"; // Import mongoose to access ObjectId
import Session from "@/models/Session"; // Adjust the path according to your folder structure

export const POST = async (req: NextRequest) => {
  try {
    const { startDate, endDate, userId, subscriptionId, planId, trainerAssigned = false } = await req.json();

    // Validate required fields
    if (!startDate || !endDate || !userId || !subscriptionId || !planId) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert IDs to ObjectId
    const convertedUserId = new  mongoose.Types.ObjectId(userId);
    const convertedSubscriptionId =  new mongoose.Types.ObjectId(subscriptionId);
    const convertedPlanId = new mongoose.Types.ObjectId(planId);

    // Create a new session
    const session = new Session({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId: convertedUserId,
      subscriptionId: convertedSubscriptionId,
      planId: convertedPlanId,
      trainerAssigned: trainerAssigned
    });

    // Save the session to the database
    await session.save();

    // Respond with the created session data
    return NextResponse.json(
      { success: true, data: session },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating session:", error); // Log the error for debugging
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create session" },
      { status: 500 }
    );
  }
};
