
export type Plan = {
    id: string
    item: {
        name: string
        amount: number
        currency: string
    }
    period: 'daily' | 'weekly' | 'monthly' | 'yearly'
    interval: number
    description?: string
    image?: string
    /** 
     * Program id along with subid separated by . (dot)
     * @example ```json
     * "dance.fitness" // where dance is the program id and fitness is the subid
     * ```
     */ 
    programId: string
    active: boolean
    features: string[]
    subscriptions: string[]
}


// use "Date | number" for date fields
export type Subscription = {
    id: string
    plan_id: string
    customer_id: string
    status: SubscriptionStatus
    current_start: Date | number
    current_end: Date | number
    ended_at: Date | number | null
    quantity: number
    notes: Record<string, string>
    charge_at: Date | number
    start_at: Date | number
    end_at: Date | number
    auth_attempts: number
    total_count: number
    paid_count: number
    customer_notify: boolean
    created_at: Date | number
    expire_by: Date | number
    short_url: string | null
    has_scheduled_changes: boolean
    change_scheduled_at: Date | number | null
    source: 'api' | 'checkout'
    offer_id: string
    remaining_count: number

    programId: string
}

export type PlanWithSubscriptions = Plan & {
    subscriptions: Subscription[]
}

export type SubscriptionWithPlan = Subscription & {
    plan: Plan
}

export enum SubscriptionStatus {
    active = 'active',
    inactive = 'inactive',
    cancelled = 'cancelled'
}