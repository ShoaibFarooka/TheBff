import { Coupon } from "@/types/db";
import { Document, Schema, model, models } from "mongoose";

type CouponDoc = Omit<Coupon, 'metadata'> & Document & {
    metadata: Object | null
}

const couponSchema = new Schema<CouponDoc>(
    {
        _id: { type: String, required: true },
        id: { type: String, required: true },
        amount_off: { type: Number, required: false },
        currency: { type: String, required: false },
        duration: { type: String, required: false },
        duration_in_months: { type: Number, required: false },
        metadata: { type: Object, required: false },
        name: { type: String, required: false },
        percent_off: { type: Number, required: false },
        redeem_by: { type: Number, required: false },
        times_redeemed: { type: Number, required: false },
        valid: { type: Boolean, required: false },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default models.Coupon || model<CouponDoc>('Coupon', couponSchema);