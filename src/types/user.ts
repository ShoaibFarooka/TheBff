
export enum UserRole {
    ADMIN = 1,
    COACH,
    USER
}

// ======================= USER =======================
export interface User {
    name: string;
    email: string;
    password: string;
    phone: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: UserRole;
    avatar_url?: string | null
    billing_address: Record<string, any> | null
    payment_method: Record<string, any> | null
    stripeCustomerId: string
    stats: Stats
}
export type UserUpdate = Partial<User>;
export type UserInsert = UserUpdate;

// ======================= STATS =======================
export interface Stats {
    weight: {
        current: number | string;
        goal: number | string;
    },
    bodyFat: {
        current: number | string;
        goal: number | string;
    },
    bodyMeasurements: {
        neck: number | string;
        chest: number | string;
        waist: number | string;
        hips: number | string;
        thigh: number | string;
        calf: number | string;
        bicep: number | string;
        forearm: number | string;
    },
    steps: {
        current: number | string;
        goal: number | string;
    }
}