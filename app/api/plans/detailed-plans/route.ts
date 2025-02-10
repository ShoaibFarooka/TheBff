import Plan from "@/models/plan";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const plans = await Plan.aggregate([
      {
        $match: {
          amount: {
            $exists: true,
            $ne: null,
            $gt: 0  // Only include amounts greater than 0
          },
          isPopular: true
        }
      },
      { $sort: { amount: 1 } },
      {
        $group: {
          _id: "$programId",
          plans: {
            $first: {
              _id: "$_id",
              image: "$image",
              description: "$description",
              features: "$features",
              name: "$name",
              amount: "$amount"
            }
          }
        }
      }
    ]);

    console.log('Fetched Popular Plans: ', plans);

    return NextResponse.json({ success: true, data: plans });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message ?? "Something went wrong",
    });
  }
};

export const dynamic = "force-dynamic";