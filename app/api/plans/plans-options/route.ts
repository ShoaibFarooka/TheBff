import { NextRequest, NextResponse } from "next/server";
import Plan from "@/models/plan"; // Adjust the path according to your folder structure

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const selectedProgram = searchParams.get("selectedProgram"); // Extract selectedProgram from the query

    try {
        // Fetch plans that match the selected program (i.e., programId starts with selectedProgram)
        const plans = await Plan.find({
            programId: { $regex: `^${selectedProgram}` } // Use regex to find matching programIds
        }).select("_id programId name").lean(); // Select only the _id, programId, and name fields

        // Respond with the fetched plan data
        return NextResponse.json({ success: true, data: plans });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message ?? "Something went wrong",
        });
    }
};

export const dynamic = "force-dynamic";
