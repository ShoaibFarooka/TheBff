import { Plan, User } from "@/models";
import Session from "@/models/Session"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req: NextRequest) => {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);
    const trainerId = searchParams.get("trainerId");
    const userId = searchParams.get("userId");
    const subscriptionId = searchParams.get("subscriptionId");

    // Validate required parameters
    if (!trainerId || !userId || !subscriptionId) {
      return NextResponse.json(
        { success: false, message: "All parameters (trainer_id, user_id, subscription_id) are required" },
        { status: 400 }
      );
    }

    // Ensure the parameters are treated as ObjectId
    const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const subscriptionObjectId = new mongoose.Types.ObjectId(subscriptionId);

    // Fetch sessions based on the criteria
    const sessions = await Session.find({
      trainerId: trainerObjectId,
      userId: userObjectId,
      subscriptionId: subscriptionObjectId,
    })
      .populate({
        path: "userId",
        model: User,
        select: "name email address", // Populate user details if needed
      })
      .populate({
        path: "planId",
        model: Plan,
        select: "name programId startDate endDate amount",
      })
      .lean();

    // Return the filtered sessions
    return NextResponse.json({ success: true, data: sessions });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "Something went wrong",
      },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
