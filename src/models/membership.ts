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

export default MemberShip;
