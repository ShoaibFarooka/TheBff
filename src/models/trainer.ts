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
    availableTimeSlot: string;
    isRegisterTrainer: boolean;
    emailVerified: boolean;
    phoneVerified: boolean;
    aadharFileUrl?: string;
    agreementFileUrl?: string;
    certificationFileUrl?: string;
    profilePhotoFileUrl?: string;
    optionalFileUrl?: string;
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
            type: String,
            required: true,
        },
        currentAddress: {
            type: String,
            required: true,
        },
        currentLocation: {
            type: String,
            required: true,
        },
        availableTimeSlot: {
            type: String,
            required: true,
        },
        isRegisterTrainer: {
            type: Boolean,
            default: false,
        },
        emailVerified: {
            type: Boolean,
            default: true,
        },
        phoneVerified: {
            type: Boolean,
            default: true,
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
        certificationFileUrl: [String],
        profilePhotoFileUrl: {
            type: String,
            required: true,
        },
        optionalFileUrl: {
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
