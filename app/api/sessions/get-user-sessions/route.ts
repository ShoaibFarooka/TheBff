import { NextRequest, NextResponse } from "next/server";
import Session from "@/models/Session"; // Adjust the path according to your folder structure
import Plan from "@/models/plan"; // Ensure you import Plan if needed
import Trainer from "@/models/trainer"; // Import the Trainer model if available

export const GET = async (req: NextRequest) => {
  try {
    // Extract userId from the query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    // Fetch all sessions for the given userId and populate planId
    const sessions = await Session.find({ userId })
      .populate({
        path: "planId", // Field in Session schema referring to Plan model
        model: Plan, // Specify the model to populate from
        select: "name programId startDate endDate", // Select fields from Plan if needed
      })
      .lean();

    // If trainerId exists in any session, fetch trainer details
    for (const session of sessions) {
      if (session.trainerId) {
        // Fetch trainer details based on the string `trainerId`
        const trainer = await Trainer.findOne({ _id: session.trainerId })
          .select("name email contactNumber currentAddress") // Add fields you want to include
          .lean();
        session.trainerId = trainer || null; // Add trainer details or set null if not found
      } else {
        session.trainerId = null; // Set trainer as null if no trainerId exists
      }
    }

    // Respond with the fetched session data
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
