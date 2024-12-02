import Coupon from '@/models/coupon';
import Discount from '@/models/discount';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { discountId } = await req.json();

        // Find the discount based on the discountId received
        const discount = await Discount.findById(discountId);

        if (!discount) {
            return NextResponse.json({ success: false, message: 'Discount not found.' }, { status: 404});
        }

        // Generate a coupon code based on the discount details
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

        return NextResponse.json({ success: true, couponCode }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
    }
}

// Function to generate a random coupon code based on type and value
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