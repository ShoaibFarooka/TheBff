import { NextRequest, NextResponse } from "next/server";
import Session from "@/models/Session"; // Adjust the import path according to your project structure
import { Subscription } from "@/models";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId query parameter" },
        { status: 400 }
      );
    }

    // Fetch sessions where all elements in `sessions` array have `status` === "completed"
    const completedSessions = await Session.find({
      userId: userId,
      feedback_submitted: { $exists: false }, // Fetch documents where the `feedback_submitted` field does not exist
      sessions: {
        $not: {
          $elemMatch: { status: { $ne: "completed" } }, // Exclude documents with any non-completed status
        },
      },
    })
      .populate("subscriptionId") // Replace with the correct reference if it's different
      .populate({
        path: "subscriptionId",
        model: Subscription,
        select: "_id userId planId programId", // Ensure address is populated for comparison
      })
      .lean(); // Using `.lean()` for plain JS objects instead of Mongoose documents    

    return NextResponse.json({
      success: true,
      message: "Completed sessions retrieved successfully",
      data: completedSessions,
    });
  } catch (error: any) {
    console.error("Error fetching completed sessions:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred while fetching completed sessions",
      },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
