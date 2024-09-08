// define mongoose schema for user model

// import { withDb } from "@/lib/dbConnection";
// import { devLog } from "@/lib/helpers";
import { UserRole, User as UserType } from "@/types/user";
import { Document, Model, Schema, model, models } from 'mongoose';

// a regex to validate email
const mailRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9a-]+.[a-zA-Z0-9-.]+$"
)

// type UserDoc = Omit<UserType, 'billing_address' | 'payment_method'> & Document & { billing_address: Object, payment_method: Object, razorpayCustomerId: string }

type UserDoc = UserType & Document
type UserModel = Model<UserDoc>

const userSchema = new Schema<UserDoc, UserModel>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            auto: true,
            get: (v: Schema.Types.ObjectId) => v != null ? v.toString() : null
        },
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
        },
        avatar_url: {
            type: String,
            required: false,
        },
        billing_address: {
            type: Object,
            required: false,
        },
        razorpayCustomerId: {
            type: String,
            required: false,
        },
        payment_method: {
            type: Object,
            required: false,
        },
        address: {
            house: {
                type: String,
                required: true,
            },
            area: {
                type: String,
                required: true,
            },
            pincode: {
                type: String || Number,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
        }
        // stats: {
        // // weight
        // },
    }, {
    timestamps: true,
    toObject: { virtuals: true },
}
)

userSchema.virtual('subscriptions', {
    ref: 'Subscription',
    localField: '_id',
    foreignField: 'userId',
    justOne: false,
    // options: {
    //     $addFields: {
    //         'productId': '$product_id',
    //     }
    // }
})

// virtuals for stats
userSchema.virtual('stats', {
    ref: 'UserStats',
    justOne: true,
    localField: 'email',
    foreignField: 'email',
})

userSchema.virtual('sessions', {
    ref: 'Session',
    localField: 'email',
    foreignField: 'userEmail',
    justOne: false,
})

const User: UserModel = models.User || model<UserDoc, UserModel>("User", userSchema)

export default User
