import { Coupon as CouponType } from "@/types/coupon";
import { Document, Model, model, models, Schema } from 'mongoose';

type CouponDoc = CouponType & Document;
type CouponModel = Model<CouponDoc>;

const couponSchema = new Schema<CouponDoc, CouponModel>({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
        required: true,
        get: (v: Schema.Types.ObjectId) => v != null && 'toString' in v ? v.toString() : v
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    status: {
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