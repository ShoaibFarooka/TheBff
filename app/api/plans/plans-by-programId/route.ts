import Plan from "@/models/plan";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { programId } = await req.json();

    if (!programId) {
      return NextResponse.json({
        success: false,
        message: "Program ID is required",
      });
    }

    const plans = await Plan.find({ 
      programId,
      amount: { 
        $exists: true, 
        $ne: null,
        $gt: 0
      }
    }).sort({ amount: 1 });

    if (!plans || plans.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No plans found for this program",
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: plans 
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message ?? "Something went wrong",
    });
  }
};

export const dynamic = "force-dynamic";
