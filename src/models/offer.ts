import { Offer as OfferType } from "@/types/offer";
import { Document, model, models, Schema } from 'mongoose';

type ModelType = OfferType & Document;

const offerSchema = new Schema<ModelType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
        get: (v: any) => v != null ? v.toString() : v,
    },
    id: {
        type: String,
        required: true,
    },
    offerName: {
        type: String,
        required: true,
    },
    displayText: {
        type: String,
        required: true,
    },
    terms: {
        type: String,
        required: true,
    },
    minPayment: {
        type: Number,
        required: true,
    },
    maxDiscount: {
        type: Number,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
        set: (v: any) => v != null ? v : new Date(v),
    },
    discountType: {
        type: String,
        required: true,
        enum: ['Flat', 'Percentage'],
    },
    discountWorth: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true }
});

const Offer = models.Offer || model<ModelType>('Offer', offerSchema);

export default Offer;