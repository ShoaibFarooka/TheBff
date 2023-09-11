import { Schema, model, models } from 'mongoose';

const classesScema = new Schema({
    user: {
        type: String,
        required: true,
    },
    coach: {
        type: String,
        required: true,
    },
    meetLink: {
        type: String,
        required: true,
    },
    date: {
        type: Date || String,
        required: true,
    },
}, {
    timestamps: true
});

const Classes = models.Classes || model('Classes', classesScema);

// const c = new Classes({
//     user: 'siddiquiaffan201@gmail.com',
//     coach: 'coach1@cyncept.com',
//     meetLink: 'https://meet.google.com/lookup/abc',
//     date: new Date(),
// })

// c.save();

export default Classes;
