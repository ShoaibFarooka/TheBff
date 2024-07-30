import { Schema, model, models } from 'mongoose';

const newsLetterSchema = new Schema({
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

const NewsLetter = models.NewsLetter || model('NewsLetter', newsLetterSchema);

export default NewsLetter;