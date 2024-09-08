import type { Plan as PlanType } from '@/types/subscription';
// import type { ObjectId } from 'mongoose';
import { Document, Model, Schema, model, models } from 'mongoose';

type PlandDoc = PlanType & Document;
type PlanModel = Model<PlandDoc>;

const planSchema = new Schema<PlandDoc, PlanModel>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
        get: (v: any) => v != null ? v.toString() : v,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: false,
    },
    currency: {
        type: String,
        required: false,
    },
    period: {
        type: String,
        required: true,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    interval: {
        type: Number,
        required: true,
        min: 1,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    programId: {
        type: String,
        required: true,
    },
    features: [
        {
            type: String,
            required: true,
        }
    ],
    premium: {
        type: Boolean,
        required: false,
    }
}, {
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
});

planSchema.virtual('program', {
    ref: 'Program',
    localField: 'programId', // this field should match with program.features[].id
    foreignField: 'features.id',
    justOne: true,
    match: {
        id: '$programId',
    },
})

planSchema.virtual('subscriptions', {
    ref: 'Subscription',
    localField: 'id',
    foreignField: 'planId',
    justOne: false,
})

const Plan: PlanModel = models.Plan || model<PlandDoc, PlanModel>('Plan', planSchema);

export default Plan;
