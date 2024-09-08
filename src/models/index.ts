import mongoose from "mongoose";

// Convert _id to string
mongoose.Schema.ObjectId.get(v => v != null ? v.toString() : v);

// Also convert nested _id to string
mongoose.Schema.Types.ObjectId.get(v => v != null ? v.toString() : v);


export { default as Cart } from "./cart";
export { default as Coach } from "./coach";
export { default as Coupon } from "./coupon";
export { default as NewsSubscriber } from "./newsSubscriber";
export { default as Plan } from "./plan";
export { default as Program } from "./program";
export { default as Session } from "./session";
export { default as Subscription } from "./subscription";
export { default as User } from "./user";
export { default as UserStats } from "./userstats";

