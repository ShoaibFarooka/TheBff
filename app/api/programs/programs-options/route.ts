import { NextRequest, NextResponse } from "next/server";
import Program from "@/models/Program"; // Adjust the path according to your folder structure

export const GET = async (req: NextRequest) => {
  try {
    // Fetch all programs from the database, including _id, id, and name
    const programs = await Program.find({}).select("_id id name").lean();

    // Respond with the fetched program data
    return NextResponse.json({ success: true, data: programs });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message ?? "Something went wrong",
    });
  }
};

export const dynamic = "force-dynamic";
