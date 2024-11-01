import { NextRequest, NextResponse } from "next/server";
import Subscription from "@/models/Subscription"; // Adjust the path according to your folder structure

export const GET = async (req: NextRequest) => {
  try {
    // Extract userId from the query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required",
      }, { status: 400 });
    }

    // Fetch all subscriptions for the given userId
    const subscriptions = await Subscription.find({ userId }).lean();

    if (!subscriptions.length) {
      return NextResponse.json({
        success: false,
        message: "No subscriptions found for this user",
      }, { status: 404 });
    }

    // Respond with the fetched subscription data
    return NextResponse.json({ success: true, data: subscriptions });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message ?? "Something went wrong",
    }, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
