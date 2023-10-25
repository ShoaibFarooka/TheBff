// define mongoose schema for user model

import { Schema, model, models, Document } from "mongoose";
import { User, UserRole } from "@/types/user"

// a regex to validate email
const mailRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
)

type UserDoc = User & Document

const userSchema = new Schema<UserDoc>(
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
            lowercase: true,
            validate: {
                validator: (email: string) => mailRegex.test(email),
                message: "Invalid email"
            }
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
            type: Number,
            enum: UserRole,
            default: UserRole.USER,
            required: true
        }
    }, {
        timestamps: true
    },
)

export default models.User || model<User & Document>("User", userSchema)
