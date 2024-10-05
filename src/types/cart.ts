import { ObjectId } from "mongoose";

export type Cart = {
    _id: string | ObjectId;
    user: string | ObjectId;
    items: CartItem[];
    subTotal: number;
}

export type CartItem = {
    plan: string | ObjectId;
    price: number;
}