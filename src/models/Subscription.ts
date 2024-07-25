import { SubscriptionStatus } from "@/types/db";
import { Subscription as SubscriptionType } from "@/types/subscription";
import { Document, model, models, Schema, Types } from 'mongoose';

// use "Date | number" for date fields

type SubscriptionDoc = SubscriptionType & {
  plan: string;
} & Document;

const SubscriptionSchema = new Schema<SubscriptionDoc>(
  {
    _id: {
      type: String,
      auto: true,
      required: true,
      get: (v: Types.ObjectId) => v.toString(),
    },
    id: { type: String, required: true },
    plan_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      required: true,
    },
    current_start: { type: Date, required: true },
    current_end: { type: Date, required: true },
    ended_at: { type: Date, required: false },
    quantity: { type: Number, required: true },
    notes: { type: Schema.Types.Mixed, required: true },
    charge_at: { type: Date, required: true },
    start_at: { type: Date, required: true },
    end_at: { type: Date, required: true },
    auth_attempts: { type: Number, required: false },
    total_count: { type: Number, required: true },
    paid_count: { type: Number, required: true },
    customer_notify: { type: Boolean, required: true },
    created_at: { type: Date, required: true },
    expire_by: { type: Date, required: true },
    short_url: { type: String, required: false },
    has_scheduled_changes: { type: Boolean, required: true },
    change_scheduled_at: { type: Date, required: false },
    source: { type: String, enum: ["api", "checkout"], required: true },
    offer_id: { type: String, required: true },
    remaining_count: { type: Number, required: true },

    // plan: { type: String, ref: "Plan", refPath: "id" },
  },
  {
    // versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
  }
);

SubscriptionSchema.virtual("plan", {
  ref: "Plan",
  localField: "plan_id",
  foreignField: "id",
  justOne: true,
});

SubscriptionSchema.virtual("email", {
  ref: "User",
  localField: "user_email",
  foreignField: "email",
  justOne: true,
});

SubscriptionSchema.virtual("user", {
  ref: "User",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});

// convert to plain object using post hook
// const regex = /^find/;
// SubscriptionSchema.post(regex, function (doc) {
//   if (!doc ?? !doc?.length) return;

//   if (Array.isArray(doc)) {
//     doc.map((d) => {
//       d._id = d._id.toString();
//     });
//     return doc;
//   }
//   doc._id = doc._id.toString();
//   return doc;
// });

// SubscriptionSchema.set("toObject", { virtuals: true });

const Subscription =
  models.Subscription ||
  model<SubscriptionDoc>("Subscription", SubscriptionSchema);

export default Subscription;
