import { Schema, model, models } from 'mongoose';

const classScema = new Schema({
    _id: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    coach: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Coache'
    },
    program: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Program'
    },
    meetLink: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    slot: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Slot'
    }
}, {
    timestamps: true
});

const Class = models.Class || model('Class', classScema);

// const c = new Classes({
//     user: 'siddiquiaffan201@gmail.com',
//     coach: 'coach1@cyncept.com',
//     meetLink: 'https://meet.google.com/lookup/abc',
//     date: new Date(),
// })

// c.save();

export default Class;


// withDb(async () => {
//     const c = new Class({
//         user: '6574346304698589b881c154',
//         coach: '658fdb00532831bd006d8b4b',
//         program: '6581259f935edd463a3bcfa9',
//         meetLink: 'https://meet.google.com/lookup/abc',
//         date: new Date(),
//         slot: '60f0a0b3e1b0b1a1b0b1a1b0',
//     })
// })