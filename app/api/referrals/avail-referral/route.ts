import { NextRequest, NextResponse } from "next/server";
import { Coupon } from "@/models";
import { sendEmail } from "@/lib/email";

interface User {
  email: string;
  name?: string; // Optional, if `name` might not exist
}

export const POST = async (req: NextRequest) => {
  try {
    // Extract the data from the body of the request
    const { code = "", userId = "" } = await req.json();

    // Validate if the required fields are provided
    if (!code) {
      return NextResponse.json(
        { success: false, message: "Coupon code is not provided" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is not provided" },
        { status: 400 }
      );
    }

    // Fetch the coupon by code and populate the userId field
    // const coupon = await Coupon.findOne({ code }).populate("userId");
    const coupon = await Coupon.findOne({ code }).populate<{ userId: User }>("userId");


    if (!coupon) {
      return NextResponse.json(
        { success: false, message: "The coupon entered is invalid" },
        { status: 404 }
      );
    }

    if (coupon.status === true) {
      return NextResponse.json(
        { success: false, message: "The coupon has already been used" },
        { status: 400 }
      );
    }

    // Update the coupon status to true and save it
    coupon.status = true;
    await coupon.save();

    // Generate a unique coupon code for the referral
    const couponCode = generateRandomCouponCode(10);

    const newReferral = await Coupon.create({
      code: couponCode,
      type: "percentage",
      value: "10",
      status: false,
      userId,
    });

    // Send email to the populated user email
    const user = coupon?.userId as User;
    if (user?.email) {
      const userEmailPromise = await sendEmail({
        from: `TheBFF Subscriptions <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Your coupon has been successfully redeemed",
        text: `Dear ${user.name || "User"}, your coupon has been redeemed successfully.`,
        html: `<p>Dear ${user.name || "User"},</p>
              <p>Your coupon code <strong>${code}</strong> has been redeemed successfully. A new referral code has been created for you: <strong>${couponCode}</strong>.</p>
              <p>Thank you for being a part of our platform!</p>`,
      });

      await Promise.all([userEmailPromise]);
    }

    // Respond with success, including the updated coupon and referral details
    return NextResponse.json({
      success: true,
      message: "Coupon status updated, referral created, and email sent successfully",
      data: {
        coupon,
        newCoupon: newReferral,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message ?? "Something went wrong" },
      { status: 500 }
    );
  }
};

// Function to generate a random referral code
function generateRandomCouponCode(value: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let couponCode = "REFERRAL";

  // Add discount value to the coupon code
  couponCode += value.toString();

  // Generate a random alphanumeric coupon code
  for (let i = 0; i < 5; i++) {
    couponCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return couponCode;
}

export const dynamic = "force-dynamic";
