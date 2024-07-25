import { Program as ProgramType } from '@/types/program';
import { Document, Schema, model, models } from "mongoose";
// import './Coach';

import mongoose from 'mongoose';

type ProgramDoc = ProgramType & Document;

const programSchema = new Schema<ProgramDoc>(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true,
            auto: true,
            get: (v: any) => v.toString()
        },
        id: { type: String, required: true },
        name: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        caption: { type: String, required: false },
        featureTitle: { type: String, required: true },
        featureDescription: { type: String, required: true },
        features: {
            type: [
                {
                    id: { type: String, required: true },
                    previewImage: { type: String, required: false },
                    name: { type: String, required: true },
                    title: { type: String, required: true },
                    description: { type: String, required: true },
                    image: { type: String, required: true },
                }
            ],
            required: true
        },
        // coaches: {
        //     type: [
        //         {
        //             type: mongoose.Types.ObjectId,
        //             ref: 'Coach',
        //             required: true,
        //         }
        //     ],
        //     required: true,
        //     default: []
        // },
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: { virtuals: true },
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

const Program = models.Program || model<ProgramDoc>('Program', programSchema);

// withDb(() => Program.findOne({ id: 'dance' }).populate('coaches', 'name').then((program) => {
//     console.log(program)
// }))

export default Program