import { NextRequest, NextResponse } from "next/server";
import Subscription from "@/models/Subscription"; // Adjust the path according to your folder structure
import Plan from "@/models/plan"; // Ensure you import Plan if needed

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

    // Fetch all subscriptions for the given userId and populate planId with Plan details
    const subscriptions = await Subscription.find({ userId })
      .populate({
        path: "planId", // Field in Subscription schema referring to Plan model
        model: Plan, // Specify the model to populate from
        select: "name description price startDate endDate period interval features", // Select fields from Plan if needed
      })
      .lean();

    // Respond with the fetched subscription data
    return NextResponse.json({ success: true, data: subscriptions });
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
