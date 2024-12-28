import Feedback from "@/models/feedback"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Fetch all feedback documents from the database where status is true
    const feedbacks = await Feedback.find({ status: true }).lean(); // Use .lean() for better performance

    // Respond with the fetched feedback data
    return NextResponse.json({ success: true, data: feedbacks });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message ?? "Something went wrong",
    });
  }
};

export const dynamic = "force-dynamic";
