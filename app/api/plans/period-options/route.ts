import { NextRequest, NextResponse } from "next/server";
import Plan from "@/models/plan"; // Adjust the path according to your folder structure

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const programId = searchParams.get("selectedPlan"); // Extract programId from the query
    console.log(programId)

    try {
        // Fetch periods that match the specified programId
        const periods = await Plan.find({
            programId: programId // Match the programId directly
        }).select("_id programId period").lean(); // Select only the _id, programId, and duration fields

        // Respond with the fetched period data
        return NextResponse.json({ success: true, data: periods });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message ?? "Something went wrong",
        });
    }
};

export const dynamic = "force-dynamic";
