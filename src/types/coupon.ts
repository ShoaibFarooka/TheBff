import { ObjectId } from "mongoose";

// A coupon code schema
/* 
The discount can be of two types:
1. Percentage discount - discount is a percentage of the total amount
2. Flat discount - discount is a fixed amount
*/

export type Coupon = {
    _id: string | ObjectId;
    code: string;
    description?: string;
    discount: number;
    type: 'percentage' | 'flat';
    expiryDate: Date;
    active: boolean;
}