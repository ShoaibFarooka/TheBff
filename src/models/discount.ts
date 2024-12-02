import type { Discount as DiscountType } from '@/types/discount';
import { Model, Schema, model, models } from 'mongoose';

type DiscountDoc = DiscountType & Document;
type DiscountModel = Model<DiscountDoc>;

const discountSchema = new Schema<DiscountDoc, DiscountModel>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['percentage', 'fixed'], // Updated enum values
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});

const Discount = models.Discount || model<DiscountDoc, DiscountModel>('Discount', discountSchema);

export default Discount;
