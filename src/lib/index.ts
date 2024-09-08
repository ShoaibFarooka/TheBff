// Write a function to verify if a string is a valid email address. Use regex of common email patterns.

import { Coupon } from "@/types/coupon";
import { Plan } from "@/types/subscription";

export function isEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return regex.test(email)
}

// A funciton to get query params from url in the form of object

export const getQueryParams = <T = Record<string, string>>(url: string): T => {

    const searchParams = new URL(url).searchParams;
    const params: any = {};
    for (const [key, value] of searchParams as any) {
        params[key] = value;
    }

    return params as T;

}

export const periodMap: { [key: string]: string } = {
    daily: 'day',
    weekly: 'week',
    monthly: 'month',
    yearly: 'year',
};

export const getDurationText = (period: Plan['period'], interval: number) => {
    const periodText = periodMap[period] ?? period;

    if (interval === 1) {
        return `${interval} ${periodText}`;
    } else {
        return `${interval} ${periodText}s`;
    }
}

// type a = Coupon
export const calculateDiscount = (amount: number, coupon: {
    discount: Coupon['discount'],
    type: Coupon['type']
}) => {
    if (coupon.type === 'percentage') {
        return amount * coupon.discount / 100;
    } else {
        return coupon.discount;
    }
}