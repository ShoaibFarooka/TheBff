// coach.model.ts

import mongoose, { Document, Schema } from "mongoose";
// import "./Program";

export interface CoachType {
  name: string;
  email: string;
  profileImage: string;
  calendarLink: string;
  /**
   * Program ids along with subids separated by . (dot)
   * @example ```json
   * ["dance.fitness", "dance.dance-styles"] // where dance is the program id and fitness is the subid ()
   * ``` 
   */
  programIds: string[];
  calendlyToken: string;
  // add more fields as needed
}

const coachSchema: Schema = new Schema<CoachType & Document>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImage: { type: String, required: true },
    calendarLink: { type: String, required: true },
    calendlyToken: { type: String, required: true },
    programIds: [
      {
        type: String,
        ref: "Program",
      },
    ],
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

const Coach =
  mongoose.models.Coach ||
  mongoose.model<CoachType & Document>("Coach", coachSchema);

// withDb(async () => {
//   const d = await Coach.findOne({ name: 'John Doe' }).populate('programs', 'name -_id -coaches id')
//   console.log(d)
// });

export default Coach;
