import { Session as SesionType } from "@/types/session";
import mongoose, { Document, Schema } from "mongoose";
import { string } from "zod";

const sessionScema = new Schema<SesionType & Document>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    trainerAssigned: {
      type: Boolean,
      required: true
    },
    trainerId: {
      type: String,
      required: false
    },
    timeSlot: {
      type: String,
      required: true
    },
    days : {
      type: [],
      required: true,
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

// sessionScema.virtual("user", {
//   ref: "User",
//   localField: "userId",
//   foreignField: "_id",
//   justOne: true,
// });

// sessionScema.virtual("subscription", {
//   ref: "Subscription",
//   localField: "subscriptionId",
//   foreignField: "_id",
//   justOne: true,
// });

// sessionScema.virtual("coach", {
//   ref: "Coach",
//   localField: "coachId",
//   foreignField: "_id",
//   justOne: true,
// });

// sessionScema.virtual("programDetails", {
//   ref: "Program",
//   localField: "program",
//   foreignField: "_id",
//   justOne: true,
// });

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionScema);

export default Session;

// withDb(async () => {
//     const c = new Class({
//         user: '6574346304698589b881c154',
//         coach: '658fdb00532831bd006d8b4b',
//         program: '6581259f935edd463a3bcfa9',
//         meetLink: 'https://meet.google.com/lookup/abc',
//         date: new Date(),
//         slot: '60f0a0b3e1b0b1a1b0b1a1b0',
//     })
// })
