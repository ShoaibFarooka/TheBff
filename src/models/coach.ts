import { Schema, model, models } from 'mongoose';

const coachScema = new Schema({
    name: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    bookingLink: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Coach = models.Coach || model('Coach', coachScema);

export default Coach;
