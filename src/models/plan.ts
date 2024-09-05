import type { Plan as PlanType } from '@/types/subscription';
// import type { ObjectId } from 'mongoose';
import { Document, Schema, model, models } from 'mongoose';

type ModelType = PlanType & Document;

const planSchema = new Schema<ModelType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
        get: (v: any) => v != null ? v.toString() : v,
    },
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    item: {
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
            default: 'INR',
        }
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
    active: {
        type: Boolean,
        default: true,
    },
    // reference to the subscriptions model for the plan
    subscriptions: [{
        type: String,
        ref: 'Subscription',
        refPath: 'plan_id',
    }],
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { getters: true }
});

planSchema.virtual('program', {
    ref: 'Program',
    localField: 'programId',
    foreignField: 'id',
    justOne: true,
    match: {
        id: '$programId',
    },
})

const Plan = models.Plan || model<ModelType>('Plan', planSchema);

export default Plan;
