export enum UserRole {
  ADMIN = 1,
  COACH = 2,
  USER = 3,
  SALES = 4
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
  avatar_url?: string | null;
  billing_address: Record<string, any> | null;
  payment_method: Record<string, any> | null;
  razorpayCustomerId: string;
  stats: Stats;
  address: {
    house: string;
    area: string;
    pincode: string | number;
    city: string;
    state: string;
  }
}
export type UserUpdate = Partial<User>;
export type UserInsert = UserUpdate;

// ======================= STATS =======================
export interface Stats {
  email: string;
  weight: {
    current: number;
    goal: number;
  };
  bodyFat: {
    current: number;
    goal: number;
  };
  neck: {
    current: number;
    goal: number;
  };
  chest: {
    current: number;
    goal: number;
  };
  waist: {
    current: number;
    goal: number;
  };
  hips: {
    current: number;
    goal: number;
  };
  thigh: {
    current: number;
    goal: number;
  };
  calf: {
    current: number;
    goal: number;
  };
  bicep: {
    current: number;
    goal: number;
  };
  forearm: {
    current: number;
    goal: number;
  };
  steps: {
    current: number;
    goal: number;
  };
}


export const statsKeys: Array<keyof Omit<Stats, "email">> = [
  "weight",
  "bodyFat",
  "neck",
  "chest",
  "waist",
  "hips",
  "thigh",
  "calf",
  "bicep",
  "forearm",
  "steps",
];