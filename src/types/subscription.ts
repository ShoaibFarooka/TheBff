import { ObjectId } from "mongoose";

export type Plan = {
    _id: string | ObjectId;
    name: string;
    description: string;
    amount?: number;
    currency?: string;
    period: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    image?: string;
    category: string;
    /**
     * Program ID to which this plan belongs.
     * This must include program id and its the feature id separated by a . (dot).
     * @example "dance.fitness"
     */
    programId: string;
    features: string[];
    premium?: boolean;
}


// use "Date | number" for date fields
export type Subscription = {
    _id: string | ObjectId;
    planId: string | ObjectId;
    userId: string | ObjectId;
    programId: string;
    status: SubscriptionStatus;
    price: number;
    reference_id: string;
    startDate: Date | number;
    endDate: Date | number;
    cancelledAt?: Date | number;
    cancelledReason?: string;
    cancelledBy?: string;
}

export type PlanWithSubscriptions = Plan & {
    subscriptions: Subscription[]
}

export type SubscriptionWithPlan = Subscription & {
    plan: Plan
}

export enum SubscriptionStatus {
    pending = 'pending',
    active = 'active',
    cancelled = 'cancelled',
    expired = 'expired',
    paused = 'paused',
}
