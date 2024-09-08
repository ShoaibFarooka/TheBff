import { Coupon as CouponType } from "@/types/coupon";
import { Document, Model, model, models, Schema } from 'mongoose';

type CouponDoc = CouponType & Document;
type CouponModel = Model<CouponDoc>;

const couponSchema = new Schema<CouponDoc, CouponDoc>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
        get: (v: any) => v != null ? v.toString() : v,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    discount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['percentage', 'flat'],
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
        set: (v: any) => v != null ? v : new Date(v),
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true }
});

const Coupon: CouponModel = models.Coupon || model<CouponDoc, CouponModel>('Coupon', couponSchema);

export default Coupon;