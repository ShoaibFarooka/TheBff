import Razorpay from "razorpay";

const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET!;
const NEXT_PUBLIC_RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

Object.entries({
    RAZORPAY_SECRET,
    NEXT_PUBLIC_RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET,
}).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Please provide ${key} in environment variables`);
    }
});

export const razorpay = new Razorpay({
    key_id: NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: RAZORPAY_KEY_SECRET!,
});

export {
    NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_SECRET
};

