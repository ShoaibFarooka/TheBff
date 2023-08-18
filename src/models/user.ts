// define mongoose schema for user model

import { Schema, model, models, Document } from "mongoose";
import type { User } from "@/types/user"

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 50,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            maxlength: 100
        },
        phone: {
            type: String,
            required: false,
            trim: true,
            minlength: 10,
            maxlength: 10
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        phoneVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ['user', 'coach', 'admin'],
            default: 'user',
            required: true
        }
    }, {
        timestamps: true
    },
)

export default models.User || model<User & Document>("User", userSchema)
