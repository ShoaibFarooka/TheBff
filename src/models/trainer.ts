import { Document, Model, Schema, model, models } from 'mongoose';

// Define TrainerDoc and TrainerModel types
type TrainerDoc = Document & {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    permanentAddress: string;
    currentAddress: string;
    currentLocation: string;
    availableTimeSlots: [string];
    emailVerified: boolean;
    phoneVerified: boolean;
    aadharFileUrl: string;
    agreementFileUrl: string;
    certificationFileUrls: [string];
    profilePhotoFileUrl: string;
    verificationFileUrl?: string;
};

type TrainerModel = Model<TrainerDoc>;

// Define the Trainer Schema
const trainerSchema = new Schema<TrainerDoc, TrainerModel>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            auto: true,
            get: (v: Schema.Types.ObjectId) => (v != null ? v.toString() : null)
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
                validator: (email: string) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email),
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
        mobileNumber: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 15
        },
        permanentAddress: {
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
        },
        currentAddress: {
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
        },
        availableTimeSlots: [String],
        emailVerified: {
            type: Boolean,
            default: false,
        },
        phoneVerified: {
            type: Boolean,
            default: false,
        },
        // File URLs stored in S3
        aadharFileUrl: {
            type: String,
            required: true,
        },
        agreementFileUrl: {
            type: String,
            required: true,
        },
        certificationFileUrls: [String],
        profilePhotoFileUrl: {
            type: String,
            required: true,
        },
        verificationFileUrl: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

// Define a virtual for referencing stats (if needed)
trainerSchema.virtual('stats', {
    ref: 'TrainerStats',
    localField: 'email',
    foreignField: 'trainerEmail',
    justOne: true,
});

const Trainer: TrainerModel = models.Trainer || model<TrainerDoc, TrainerModel>('Trainer', trainerSchema);

export default Trainer;
