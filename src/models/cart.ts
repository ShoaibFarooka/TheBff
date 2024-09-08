import { CartItem, Cart as CartType } from "@/types/cart";
import mongoose, { Document, Schema } from "mongoose";

export type CartItemDocument = CartItem & Document;
export const itemSchema = new Schema<CartItemDocument>({
    plan: {
        type: Schema.Types.ObjectId,
        ref: "Plan",
        get: (v: Schema.Types.ObjectId) => v != null && 'toString' in v ? v.toString() : v
    },
    price: { type: Number, required: true },
}, {
    timestamps: true,
    _id: false
})


export type CartDocument = CartType & Document;
type CartModel = mongoose.Model<CartDocument>;

export const cartSchema = new Schema<CartDocument, CartModel>({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
        required: true,
        get: (v: Schema.Types.ObjectId) => v != null && 'toString' in v ? v.toString() : v
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        get: (v: Schema.Types.ObjectId) => v != null && 'toString' in v ? v.toString() : v
    },
    items: [itemSchema],
    subTotal: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true }
});


// cartSchema.virtual("user", {
//     ref: "User",
//     localField: "userId",
//     foreignField: "_id",
//     justOne: true
// });

const Cart: CartModel = mongoose.models.Cart || mongoose.model<CartDocument, CartModel>("Cart", cartSchema)

export default Cart;