import { loadStripe, Stripe as StripeCLient } from '@stripe/stripe-js';
import Stripe from "stripe";

export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
    {
        appInfo: {
            name: 'TheBFF',
        }
    }
);


let stripePromise: Promise<StripeCLient | null>;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
            ''
        );
    }

    return stripePromise;
};
