import { Plan, Trainer, User } from "@/models";
import Session from "@/models/Session"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Extract the trainer ID from the URL
    const { searchParams } = new URL(req.url);
    const trainerId = searchParams.get("id");

    if (!trainerId) {
      return NextResponse.json(
        { success: false, message: "Trainer ID is required" },
        { status: 400 }
      );
    }

    // Fetch sessions where trainerAssigned is true
    const sessions = await Session.find({ trainerAssigned: true })
      .populate({
        path: "userId",
        model: User,
        select: "name email address", // Populate user details if needed
      }).populate({
        path: "planId",
        model: Plan,
        select: "name programId startDate endDate amount",
      })
      .lean();

    // Filter sessions for the given trainer ID
    const filteredSessions = sessions.filter(
      (session) => session.trainerId?.toString() === trainerId
    );

    // Return the filtered sessions
    return NextResponse.json({ success: true, data: filteredSessions });
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
