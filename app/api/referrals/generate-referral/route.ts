import { NextRequest, NextResponse } from "next/server";
import { Coupon } from "@/models";

export const POST = async (req: NextRequest) => {
  try {
    // Extract the data from the body of the request
    const { userId = "" } = await req.json();

    console.log(userId);

    // Validate if necessary fields are present
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User Id is not provided" },
        { status: 400 }
      );
    }

    // Generate a unique coupon code
    const couponCode = generateRandomCouponCode(10);

    // Create a new coupon with the provided details
    const newCoupon = await Coupon.create({
      code : couponCode,
      type: "percentage",
      value: "10",
      status: false,
      userId,
    });

    // Respond with success and the created coupon
    return NextResponse.json({
      success: true,
      message: "Coupon created successfully",
      data: newCoupon,
    });
  } catch (error: any) {
    // Handle errors and respond with an error message
    return NextResponse.json(
      { success: false, message: error.message ?? "Something went wrong" },
      { status: 500 }
    );
  }
};

// Function to generate a random coupon code based on type and value
function generateRandomCouponCode(value: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let couponCode = 'REFERRAL';
  
  // Add discount value to the coupon code
  couponCode += value.toString();

  // Generate a random alphanumeric coupon code
  for (let i = 0; i < 5; i++) {
      couponCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return couponCode;
}


export const dynamic = "force-dynamic";