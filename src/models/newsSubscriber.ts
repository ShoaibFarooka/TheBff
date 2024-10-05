import { Schema, model, models } from 'mongoose';

const newsSubscriberSchema = new Schema({
    _id: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subscribed: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

const NewsSubscriber = models.NewsSubscriber || model('NewsSubscriber', newsSubscriberSchema);

export default NewsSubscriber;