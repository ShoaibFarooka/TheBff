import { Price, PricingPlanIntervalEnum, PricingTypeEnum } from '@/types/db';
import type { Document } from 'mongoose';
import mongoose, { Schema, models } from 'mongoose';

type PriceType = Omit<Price, 'metadata'> & Document & { metadata: Object }

const PriceSchema = new Schema<PriceType>(
    {
        _id: { type: String, required: true },
        id: { type: String, required: true },
        active: { type: Boolean, required: true },
        currency: { type: String, required: true },
        description: { type: String, required: false },
        interval: { type: String, required: true, enum: PricingPlanIntervalEnum, },
        interval_count: { type: Number, required: true },
        metadata: { type: Object, required: false },
        product_id: { type: String, required: true, ref: 'Product' },
        trial_period_days: { type: Number, required: false },
        type: { type: String, required: true, enum: PricingTypeEnum, default: PricingTypeEnum.recurring as any },
        unit_amount: { type: Number, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
        toObject: { virtuals: true }
    }
);

// virtuals
PriceSchema.virtual('product', {
    ref: 'Profuct',
    localField: 'id',
    foreignField: 'product_id',
    justOne: true
})

// convert _id to string using post hook
// a regex to match strings starting find

const regex = /^find/;

PriceSchema.post(regex, function (doc) {
    if (!doc ?? !doc?.length) return

    if (Array.isArray(doc)) {
        doc.map((d) => {
            d._id = d._id.toString();
        });
        return doc;
    }
    doc._id = doc._id.toString();
    return doc
});



export default models.Price || mongoose.model<PriceType>('Price', PriceSchema);