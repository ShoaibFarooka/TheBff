
import mongoose from "mongoose";
export type Session = {
    userId: mongoose.Schema.Types.ObjectId;
    startDate: string | Date;
    endDate: string | Date;
    planId: mongoose.Schema.Types.ObjectId;
    subscriptionId: mongoose.Schema.Types.ObjectId;
    trainerAssigned: boolean,
    trainerId: string,
    timeSlot: String,
    days: [],
    sessions: []
}