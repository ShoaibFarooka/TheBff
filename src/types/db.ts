import Stripe from "stripe";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ======================= CUSTOMER =======================
export interface Customer {
  id: string;
  stripe_customer_id: string | null;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod;
}
export type CustomerUpdate = Partial<Customer>;
export type CustomerInsert = CustomerUpdate & Pick<Customer, "id">;

// ======================= PRICE =======================
export interface Price {
  id: string;
  active: boolean | null;
  currency: string | null;
  description: string | null;
  interval: PricingPlanIntervalEnum | null;
  interval_count: number | null;
  metadata: Json | null;
  product_id: string | null;
  trial_period_days: number | null;
  type: typeof PricingTypeEnum | null;
  unit_amount: number | null;
}
export type PriceUpdate = Partial<Price>;
export type PriceInsert = PriceUpdate & Pick<Price, "id">;

// ======================= PRODUCT =======================
export interface Product {
  active: boolean;
  description: string | null;
  id: string;
  image: string | null;
  metadata: Record<string, any> | null;
  name: string | null;
  features:
    | {
        name: string;
      }[]
    | null;
}
export type ProductUpdate = Partial<Product>;
export type ProductInsert = ProductUpdate & Pick<Product, "id">;

// ===========================================================
export interface ProductWithPrices extends Product {
  prices: Price[];
}
// ===========================================================

interface ABCD extends Stripe.SubscriptionItem {}

// ======================= SUBSCRIPTION =======================
export interface Subscription {
  cancel_at: number | Date | null;
  cancel_at_period_end: boolean | null;
  canceled_at: number | Date | null;
  created: number | Date | null;
  current_period_end: number | Date | null;
  current_period_start: number | Date | null;
  ended_at: number | Date | null;
  id: string;
  metadata: Record<string, any> | null;
  price_id: string | null;
  product_id: string | null;
  quantity: number | null;
  status: typeof SubscriptionStatus | null;
  trial_end: number | Date | null;
  trial_start: number | Date | null;
  user_id: string;
  user_email: string;
}
export type SubscriptionUpdate = Partial<Subscription>;
export type SubscriptionInsert = SubscriptionUpdate & Pick<Subscription, "id">;

export enum PricingPlanIntervalEnum {
  day = "day",
  week = "week",
  month = "month",
  year = "year",
}

// "day" | "week" | "month" | "year";
export enum PricingTypeEnum {
  one_time = "one_time",
  recurring = "recurring",
}
// = "one_time" | "recurring";
export enum SubscriptionStatus {
  trialing = "trialing",
  active = "active",
  canceled = "canceled",
  incomplete = "incomplete",
  incomplete_expired = "incomplete_expired",
  past_due = "past_due",
  unpaid = "unpaid",
  paused = "paused",
}
