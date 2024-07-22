// slot.model.ts

import mongoose, { Document, Schema, models } from 'mongoose';

type Id = mongoose.Types.ObjectId | string;

export interface SlotType {
    coach: Id;
    startTime: Date;
    endTime: Date;
}
// program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },

export interface SlotDocument extends Document, SlotType { }

const slotSchema: Schema = new Schema({
    coach: { type: Schema.Types.ObjectId, ref: 'Coach', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
}, {
    timestamps: true,
    // toObject: { virtuals: true },
    // toJSON: { virtuals: true },
});

const Slot = models.Slot || mongoose.model<SlotType>('Slot', slotSchema);

export default Slot;


// 9 AM to 8 PM, 1 hour slots for a coach
// coach = 60b6b4c7a6d1e2b9f8e2b3b7 (John Doe)

export async function generateAndSaveSlots(coach: Id) {
    const slots: SlotType[] = [];

    for (let i = 0; i < 11; i++) {
        const startTime = new Date('2024-01-01T09:00:00.000Z');
        startTime.setHours(9 + i, 0, 0, 0);

        const endTime = new Date('2024-01-01T09:00:00.000Z');
        endTime.setHours(10 + i, 0, 0, 0);
        slots.push({
            coach: coach,
            startTime,
            endTime,
        });
    }

    // console.log(slots);

    // const s = new Slot(slots[0]);
    // console.log(s);

    const d = await Slot.insertMany(slots);
    return d;
}

// generateAndSaveSlots('658fdb00532831bd006d8b4b',)