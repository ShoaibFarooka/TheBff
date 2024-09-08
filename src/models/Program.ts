import { Program as ProgramType } from '@/types/program';
import { Document, Schema, model, models } from "mongoose";
// import './Coach';

import mongoose from 'mongoose';

type ProgramDoc = ProgramType & Document;
type ProgramModel = mongoose.Model<ProgramDoc>;

const programSchema = new Schema<ProgramDoc, ProgramModel>(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true,
            auto: true,
            get: (v: any) => v != null ? v.toString() : v,
        },
        id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        featureTitle: { type: String, required: true },
        featureDescription: { type: String, required: true },
        features: {
            type: [
                {
                    id: { type: String, required: true },
                    previewImage: { type: String, required: false },
                    title: { type: String, required: true },
                    heading: { type: String, required: true },
                    subheading: { type: String, required: true },
                    description: { type: String, required: true },
                    image: { type: String, required: true },
                }
            ],
            required: true
        },
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true }
    }
);

programSchema.virtual('coaches', {
    ref: 'Coach',
    localField: '_id',
    foreignField: 'programs',
    justOne: false,
    match: {
        programs: { $in: ['$_id'] }
    }
})

const Program: ProgramModel = models.Program || model<ProgramDoc, ProgramModel>('Program', programSchema);

// withDb(() => Program.findOne({ id: 'dance' }).populate('coaches', 'name').then((program) => {
//     console.log(program)
// }))

export default Program