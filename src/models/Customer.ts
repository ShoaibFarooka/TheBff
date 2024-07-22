import { Customer } from "@/types/db";
import { Document, Schema, model, models } from "mongoose";
import Stripe from "stripe";

type CustomerDoc = Customer & Document & {
    billing_address: Stripe.Address | null
}

const customerSchema = new Schema<CustomerDoc>(
    {
        _id: { type: String, required: true },
        id: { type: String, required: true },
        stripe_customer_id: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

Schema.ObjectId.get(v => v != null ? v.toString() : v);

export default models.Customer || model<CustomerDoc>('Customer', customerSchema);