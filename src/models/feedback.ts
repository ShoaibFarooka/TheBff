import type { Feedback as FeedbackType } from '@/types/feedback'; // Adjust the path according to your folder structure
import { Document, Model, Schema, model, models } from 'mongoose';

type FeedbackDoc = FeedbackType & Document;
type FeedbackModel = Model<FeedbackDoc>;

const feedbackSchema = new Schema<FeedbackDoc, FeedbackModel>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
        get: (v: any) => v != null ? v?.toString() : v,
    },
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Assuming you have a User model to reference
    },
    status: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Assuming a rating scale of 1 to 5
    },
    image: {
        type: String,
        required: false,
    }
});

// Create the Feedback model
const Feedback: FeedbackModel = models.Feedback || model<FeedbackDoc, FeedbackModel>('Feedback', feedbackSchema);

export default Feedback;
