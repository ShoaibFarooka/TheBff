import { sendEmail } from "@/lib/email"; // Adjust the path according to your folder structure
import Coupon from "@/models/coupon";
import Discount from '@/models/discount';
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, discountId } = await req.json(); // Extract email and couponId from the request body

    // Validate input
    if (!email || !discountId) {
      return NextResponse.json({ success: false, message: "Email and coupon ID are required." }, { status: 400 });
    }

    // Fetch the coupon from the database
    const discount = await Discount.findById(discountId);

    if (!discount) {
      return NextResponse.json({ success: false, message: "Coupon not found." }, { status: 404 });
    }

    const couponCode = generateRandomCouponCode(discount.type, discount.value);

    // Create a new coupon object
    const newCoupon = new Coupon({
        code: couponCode,
        type: discount.type,
        value: discount.value,
        status: false, // Set status to false by default
    });

    // Save the new coupon object
    await newCoupon.save();

    // Prepare the email content
    const emailContent = `
      <h1>Your Coupon Code</h1>
      <p>Here is your coupon code: <strong>${newCoupon.code}</strong></p>
      <p>Type: ${newCoupon.type}</p>
      <p>Value: ${newCoupon.value}</p>
      <p>Status: ${newCoupon.status ? 'Active' : 'Inactive'}</p>
    `;

    // Send the coupon code to the provided email
    await sendEmail({
      to: email,
      subject: "Your Coupon Code",
      html: emailContent,
    });

    // Respond with success
    return NextResponse.json({ success: true, message: "Coupon code sent successfully." });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message ?? "Something went wrong",
    });
  }
};

function generateRandomCouponCode(type: string, value: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let couponCode = 'COUPON';
  
  // Add discount value to the coupon code
  couponCode += value.toString();

  // Generate a random alphanumeric coupon code
  for (let i = 0; i < 5; i++) {
      couponCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return couponCode;
}

export const dynamic = "force-dynamic";
