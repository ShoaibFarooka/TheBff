import type { Plan as PlanType } from '@/types/subscription';
// import type { ObjectId } from 'mongoose';
import { Document, Schema, model, models } from 'mongoose';

type ModelType = PlanType & Document;

const planSchema = new Schema<ModelType>({
    // _id: {
    //     type: String,
    //     required: true,
    //     auto: true,
    //     get: (v: ObjectId) => v.toString()
    // },
    id: {
        type: String,
        required: true,
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
    program: {
        type: String,
        required: true,
    },
    features: [
        {
            type: String,
            required: true,
        }
    ],

    // reference to the subscriptions model for the plan
    subscriptions: [{
        type: String,
        ref: 'Subscription',
        refPath: 'plan_id',
    }],
}, {
    timestamps: true,
    toObject: { virtuals: true },
});

const Plan = models.Plan || model<ModelType>('Plan', planSchema);

export default Plan;
