import Discount from "@/models/discount"; // Adjust the path according to your folder structure
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Fetch all active discounts from the database
    const discounts = await Discount.find({}); // Adjust the query as needed

    if (discounts.length === 0) {
      return NextResponse.json({ success: false, message: "No discounts available." });
    }

    // Select a random discount from the fetched discounts
    const randomIndex = Math.floor(Math.random() * discounts.length);
    const randomDiscount = discounts[randomIndex];

    console.log(typeof randomDiscount._id); // Check the type of _id

    // Respond with the selected random discount
    return NextResponse.json({ success: true, data: { ...randomDiscount.toObject(), _id: randomDiscount._id.toString() } });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message ?? "Something went wrong",
    });
  }
};

export const dynamic = "force-dynamic"; 