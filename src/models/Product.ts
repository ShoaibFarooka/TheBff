// mongodb model for product
import { Product } from '@/types/db';
import type { Document } from 'mongoose';
import mongoose, { Schema, models } from 'mongoose';

type ProductType = Omit<Product, 'metadata'> & Document & { metadata: Object }

const ProductSchema = new Schema<ProductType>(
    {
        _id: { type: String, required: true },
        id: { type: String, required: true },
        active: { type: Boolean, required: true },
        name: { type: String, required: true },
        description: { type: String, required: false },
        image: { type: String, required: false },
        metadata: { type: Object, required: false },
        // features is an array of objects
        features: [{
            name: { type: String, required: false },
        }],
    },
    {
        versionKey: false,
        timestamps: true,
        toObject: { virtuals: true },
    }
);

// virtuals
ProductSchema.virtual('prices', {
    ref: 'Price',
    localField: 'product_id',
    foreignField: 'id',
    justOne: false,
})

// convert _id to string using post hook
// a regex to match strings starting find

const regex = /^find/;
ProductSchema.post(regex, function (doc) {
    if (!doc ?? !doc?.length) return

    if (Array.isArray(doc)) {
        doc.map((d) => {
            d._id = d._id.toString();
        });
        return doc;
    }
    doc._id = doc._id.toString();
    return doc
});


export default models.Product || mongoose.model<ProductType>('Product', ProductSchema);