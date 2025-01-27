import { NextRequest, NextResponse } from "next/server";
import { Coupon } from "@/models";
import { getQueryParams } from "@/lib";

export const GET = async (req: NextRequest) => {
  try {
    // Extract the data from the body of the request
    const { id = "" } = getQueryParams(req.url);

    console.log(id);

    // Validate if necessary fields are present
    if (!id) {
      return NextResponse.json(
        { success: false, message: "User Id is not provided" },
        { status: 400 }
      );
    }

    // Find all coupons where userId matches the provided id
    const coupons = await Coupon.find({ userId: id });

    // Respond with success and the retrieved coupons
    return NextResponse.json({
      success: true,
      message: "Coupons retrieved successfully",
      data: coupons,
    });
  } catch (error: any) {
    // Handle errors and respond with an error message
    return NextResponse.json(
      { success: false, message: error.message ?? "Something went wrong" },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
