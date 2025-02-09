
import mongoose from "mongoose";
export type Session = {
    userId: mongoose.Schema.Types.ObjectId;
    startDate: string | Date;
    endDate: string | Date;
    status: string;
    ignoredBy: [],
    planId: mongoose.Schema.Types.ObjectId;
    subscriptionId: mongoose.Schema.Types.ObjectId;
    trainerAssigned: boolean,
    trainerId: string,
    timeSlot: string,
    days: [],
    sessions: [],
    feedback_submitted: boolean
}