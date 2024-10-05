import { User } from "@/types/user";
import { toast } from 'react-hot-toast';
import { logger } from "../logger";

export const makeSubscriptionPayment = async (
    subscriptionId: string,
    {
        user,
        onSuccess,
        onError,
    }: {
        user: User;
        onSuccess?: Function;
        onError?: Function;
    }
) => {
    try {
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
            alert("Razorpay key not found")
            return
        }


        const options = {
            "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            "subscription_id": subscriptionId,
            "name": `Payment for ${subscriptionId}`,
            "description": `Auth txn for ${subscriptionId}`,
            "handler": async function (response: any) {
                toast(response.razorpay_payment_id);
                if (!response.razorpay_payment_id) {
                    onError && await onError(response)
                    return
                }
                onSuccess && await onSuccess(response)
            },
            prefill: {
                "name": user.name,
                "email": user.email,
                "contact": user.phone
            },
            modal: {
                confirm_close: true,
                ondismiss: () => {
                    onError && onError({ error: 'Payment cancelled.' })
                }
            }
        }

        const win = window as any

        var rzp1 = new win.Razorpay(options);
        rzp1.open();
    } catch (error) {
        console.log(error)

        onError && await onError(error)
        return
    }
}


export const makeOrderPayment = async (
    {
        orderId,
        amount,
        user,
        onSuccess,
        onError,
    }: {
        /**
         * Amount in paisa
        */
        amount: number;
        orderId: string;
        user: User;
        onSuccess?: Function;
        onError?: Function;
    }
) => {
    try {
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
            alert("Razorpay key not found")
            return
        }


        const options = {
            "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            "order_id": orderId,
            "name": `Payment for ${orderId}`,
            "description": `Auth txn for ${orderId}`,
            "handler": async function (response: any) {
                // toast(response.razorpay_payment_id);

                if (!response.razorpay_payment_id) {
                    onError && await onError(response)
                    return
                }
                logger.log(response)
                onSuccess && await onSuccess(response)
            },
            prefill: {
                "name": user.name,
                "email": user.email,
                "contact": user.phone
            },
            modal: {
                confirm_close: true,
                ondismiss: () => {
                    onError && onError({ error: 'Payment cancelled.' })
                }
            }
        }

        const win = window as any

        var rzp1 = new win.Razorpay(options);
        rzp1.open();
    } catch (error) {
        console.log(error)

        onError && await onError(error)
        return
    }
}