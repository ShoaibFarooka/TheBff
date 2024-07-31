import { Stats } from "@/types/user";
import { Document, Schema, model, models } from "mongoose";

type StatsDoc = Stats & Document;

// Schema for User Stats
const UserStatsSchema = new Schema<StatsDoc>(
  {
    _id: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // add more fields from Stats
    weight: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
    bodyFat: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
    neck: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
    chest: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
    waist: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
    hips: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
    thigh: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
    calf: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
    bicep: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
    forearm: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
    steps: {
      current: { type: Number, required: true },
      goal: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

UserStatsSchema.virtual("user", {
  ref: "User",
  localField: "email",
  foreignField: "email",
  justOne: true,
});

const UserStats = models.UserStats || model("UserStats", UserStatsSchema);

export default UserStats;