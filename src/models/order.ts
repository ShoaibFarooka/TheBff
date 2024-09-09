import { model, models, Schema } from 'mongoose';

const orderSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
        get: (v: any) => v != null ? v.toString() : v,
        index: true,
    },
}, {
    strict: false, // allow any other fields,
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
    toObject: {
        virtuals: true,
        getters: true,
    }
})

const Order: typeof models.Order = models.Order || model('Order', orderSchema);

export default Order;