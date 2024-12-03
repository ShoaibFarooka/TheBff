import { NextRequest, NextResponse } from "next/server";
import Session from "@/models/Session"; // Adjust the import path according to your project structure
import { Subscription } from "@/models";

export const GET = async (req: NextRequest) => {
  try {
    // Fetch sessions with `status` set to "completed" and populate `subscriptionId`
    const completedSessions = await Session.find({
      "sessions.status": "completed",
    })
      .populate("subscriptionId") // Replace with the correct reference if it's different
      .populate({
        path: "subscriptionId",
        model: Subscription,
        select: "_id userId planId programId", // Ensure address is populated for comparison
      })
      .lean(); // Using `.lean()` for plain JS objects instead of Mongoose documents

    if (!completedSessions || completedSessions.length === 0) {
      return NextResponse.json(
        { success: true, message: "No completed sessions found", data: [] },
        { status: 200 }
      );
    }

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
