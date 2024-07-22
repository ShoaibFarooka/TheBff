// coach.model.ts

import mongoose, { Document, Schema } from "mongoose";
import "./Program";

export interface CoachType extends Document {
  name: string;
  specialization: string;
  profileImage: string;
  // add more fields as needed
}

const coachSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    profileImage: { type: String, required: true },
    // programs: [{ type: Schema.Types.ObjectId, ref: "Program" }],
    // add more fields as needed
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// coachSchema.virtual("id").get(function (this: CoachType) {
//   return this._id.toHexString();
// });

coachSchema.virtual("programs", {
  ref: "Program",
  localField: "_id",
  foreignField: "coaches",
  justOne: false,
  match: {
    coaches: { $in: ["$_id"] },
  },
});

const Coach = mongoose.models.Coach || mongoose.model<CoachType>("Coach", coachSchema);

// withDb(async () => {
//   const d = await Coach.findOne({ name: 'John Doe' }).populate('programs', 'name -_id -coaches id')
//   console.log(d)
// });

export default Coach;
