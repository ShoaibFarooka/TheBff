import { Schema, Types, model, models } from 'mongoose';

const membershipSchema = new Schema({
    _id: { type: String, required: true },
    user: {
        type: String,
        required: true,
    },
    plan: {
        type: Types.ObjectId,
        ref: 'plans',
    }
}, {
    timestamps: true
});

const MemberShip = models.MemberShip || model('MemberShip', membershipSchema);

// const c = new MemberShip({
//     user: 'siddiquiaffan201@gmail.com',
//     plan: '60f0a0b3e1b0b1a1b0b1a1b0',
// })

// c.save();

export default MemberShip;
