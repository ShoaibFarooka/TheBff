// define mongoose schema for user model

// import { withDb } from "@/lib/dbConnection";
// import { devLog } from "@/lib/helpers";
import { withDb } from "@/lib/dbConnection";
import { devLog } from "@/lib/helpers";
import { UserRole, User as UserType } from "@/types/user";
import mongoose, { Document, Schema, model, models } from 'mongoose';

// a regex to validate email
const mailRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
)

type UserDoc = Omit<UserType, 'billing_address' | 'payment_method'> & Document & { billing_address: Object, payment_method: Object, subscriptions: any[] }

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
        },
        avatar_url: {
            type: String,
            required: false,
        },
        billing_address: {
            type: Object,
            required: false,
        },
        stripeCustomerId: {
            type: String,
            required: false,
            unique: true,
        },
        payment_method: {
            type: Object,
            required: false,
        },
        stats: {
        // weight
        }
    }, {
        timestamps: true,
        // toObject: { virtuals: true },
    }
)


userSchema.virtual('classes', {
    ref: 'Class',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
})

userSchema.virtual('subscriptions', {
    ref: 'Subscription',
    localField: 'stripeCustomerId',
    foreignField: 'user_id',
    justOne: false,
    options: {
        $addFields: {
            'productId': '$product_id',
        }
    }
})

// virtuals for products
// userSchema.virtual('product', {
//     ref: 'Product',
//     justOne: true,
//     localField: 'subscriptions.product_id',
//     foreignField: 'id',
// })

const User = models.User || model<UserDoc>("User", userSchema)

// withDb(async () => {
//     mongoose.set('strictPopulate', false)
//     User.findOne({ email: 'siddiquiaffan201@gmail.com' })
//         .populate('subscriptions')
//         .then((user) => {
//             devLog('==================================================')
//             console.log(user)
//             devLog('============================', new Date().toLocaleTimeString())
//         })
// })

export default User 