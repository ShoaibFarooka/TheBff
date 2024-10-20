import { NextRequest, NextResponse } from "next/server";
import Plan from "@/models/plan"; // Ensure the correct path to the model

export const GET = async (req: NextRequest) => {
    // As before, you extracted the search parameters from the request
    const { searchParams } = new URL(req.url);
    const selectedPlan = searchParams.get("selectedPlan"); // The selected plan
    const selectedPeriod = searchParams.get("selectedPeriod"); // The selected period

    try {
        // Now you needed to find all documents matching both selectedPlan and selectedPeriod
        const plans = await Plan.find({
            programId: selectedPlan, // Here we match the exact planId
            period: selectedPeriod    // And here we match the specific period
        }).select("_id programId name period interval").lean(); // Selecting fields to retrieve

        // The successful retrieval of plans was to be followed by this response:
        return NextResponse.json({ success: true, data: plans });
    } catch (error: any) {
        // If anything went wrong, you were ready to send an error message
        return NextResponse.json({
            success: false,
            message: error.message ?? "Something went wrong",
        });
    }
};

export const dynamic = "force-dynamic";
