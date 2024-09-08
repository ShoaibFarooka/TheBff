// import { SubscriptionStatus } from "@/types";
import { SubscriptionStatus, Subscription as SubscriptionType } from "@/types/subscription";
import { Document, Model, model, models, Schema } from 'mongoose';

const setDate = (v: Date | number) => !v ? null : (v instanceof Date ? v : new Date(v * 1000));

type SubscriptionDoc = SubscriptionType & {
  plan: string;
} & Document;
type SubscriptionModel = Model<SubscriptionDoc>;

const SubscriptionSchema = new Schema<SubscriptionDoc, SubscriptionModel>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
      get: (v: any) => v != null ? v?.toString() : v,
    },
    userId: { 
      type: Schema.Types.ObjectId, 
      required: true,
      // set: (v: string) => typeof v == 'string' ? new Schema.Types.ObjectId(v) : v,
    },
    planId: {
      type: Schema.Types.ObjectId, 
      required: true,
      // set: (v: string) => typeof v == 'string' ? new Schema.Types.ObjectId(v) : v,
    },
    programId: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(SubscriptionStatus),
    },
    startDate: { type: Date, required: true, set: setDate },
    endDate: { type: Date, required: true, set: setDate },
    cancelledAt: { type: Date, required: false, set: setDate },
    cancelledReason: { type: String, required: false },
    cancelledBy: { type: String, required: false },
  },
  {
    // versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
  }
);

SubscriptionSchema.virtual("plan", {
  ref: "Plan",
  localField: "planId",
  foreignField: "_id",
  justOne: true,
});

SubscriptionSchema.virtual("program", {
  ref: "Program",
  localField: "programId",
  foreignField: "features.id",
  justOne: true,
})

SubscriptionSchema.virtual("user", {
  ref: "User",
  localField: "userId",
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

const Subscription: SubscriptionModel =
  models.Subscription ||
  model<SubscriptionDoc, SubscriptionModel>("Subscription", SubscriptionSchema);

export default Subscription;
