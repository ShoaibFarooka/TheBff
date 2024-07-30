import { Session as SesionType } from "@/types/session";
import mongoose, { Document, Schema } from "mongoose";

const sessionScema = new Schema<SesionType & Document>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    coachEmail: {
      type: String,
      required: true,
    },
    meetLink: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

sessionScema.virtual("user", {
  ref: "User",
  localField: "userEmail",
  foreignField: "email",
  justOne: true,
});

sessionScema.virtual("coach", {
  ref: "Coach",
  localField: "coachEmail",
  foreignField: "email",
  justOne: true,
});

sessionScema.virtual("programDetails", {
  ref: "Program",
  localField: "program",
  foreignField: "_id",
  justOne: true,
});

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
