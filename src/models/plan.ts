import { Schema, model, models } from 'mongoose';

const planSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
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
    duration: {
        // duration in days
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

const Plan = models.Plan || model('Plan', planSchema);

// const c = new Plan({
//     name: 'Plan 1',
//     price: 100,
//     description: 'Description 1',
//     image: 'Image 1',
//     duration: 30,
// })

// c.save();

export default Plan;
