"use client"

import { Button } from "@/components/ui/button"
import { calculateDiscount } from "@/lib"
import { makeOrderPayment } from "@/lib/subscription/client"
import { api } from "@/trpc/react"
import { Coupon } from "@/types/coupon"
import Script from 'next/script'
import { useRouter } from "nextjs-toploader/app"
import { useCallback, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import Spinner from "../ui/Spinner"
import { Input } from "../ui/input"


type PaymentProps = {
    amount: number
}

const Payment = ({ amount }: PaymentProps) => {

    const [isLoading, setIsLoading] = useState(false)
    const [couponCode, setCouponCode] = useState('')
    const [coupon, setCoupon] = useState<Coupon | null>(null)

    const router = useRouter()
    const utils = api.useUtils()

    const { isFetching: isCouponLoading } =
        api.coupon.get.useQuery(couponCode, {
            enabled: !!couponCode,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            onSettled(data) {
                if (data && 'error' in data) {
                    toast.error(data.error ?? "Failed to get coupon")
                } else {
                    setCoupon(() => data!)
                }
            },
        })

    const { data: user, isLoading: isUserLoading } = api.user.get.useQuery(undefined, {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    const { mutateAsync: createOrder, data: orderData, isLoading: isOrderPending } = api.payment.createOrder.useMutation({
        async onSettled(data) {
            if (data && 'error' in data) {
                return toast.error(data.error ?? "Failed to create order")
            }

        }
    })

    const { mutateAsync: verifyPayment, isLoading: isVerificationPending } = api.payment.verifyPayment.useMutation({
        async onSettled(data) {
            if (data && 'error' in data) {
                return toast.error(data.error ?? "Failed to verify the payment. Please try again. If the issue persists, contact support.")
            } else {
                toast.success("Payment successful")
                router.push('/dashboard')
            }
        }
    })

    const placeOrder = useCallback(async () => {
        if (!user)
            return

        let order = orderData && 'error' in orderData! ? null : orderData

        try {
            setIsLoading(() => true)
            if (!order) {
                const data = await createOrder({
                    couponCode: coupon?.code
                })
                order = data && 'error' in data ? null : data

                if (!order) {
                    toast.error(data.error ?? "Failed to create order")
                    return
                }
            }

            await makeOrderPayment({
                orderId: order.orderId,
                amount: order.amount as number,
                user: {} as any,
                onSuccess: (response: any) => {
                    // set orderData to null to force createOrder to be called again
                    utils.payment.invalidate();

                    verifyPayment({
                        orderId: order!.orderId,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature
                    })
                },
                onError: (error: any) => {
                    toast.error(error.error ?? "Failed to process payment")
                }
            })
        } catch (error: any) {

        } finally {
            setIsLoading(() => false)
        }

    }, [user, orderData, createOrder, verifyPayment, coupon, utils.payment]
    )

    const isPending = isUserLoading || isOrderPending || isVerificationPending || isLoading

    const finalAmount = useMemo(() => {
        if (!coupon || 'error' in coupon) {
            return amount
        }

        const discount = calculateDiscount(amount, {
            type: coupon.type,
            discount: coupon.discount
        })

        return amount - discount
    }, [amount, coupon])

    return (
        <div className="">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />



            {/* Coupon */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Have a coupon code?</h3>
                <div className="flex items-center gap-2">
                    <form
                        className="flex items-center gap-2"
                        onSubmit={(e) => {
                            e.preventDefault()
                            setCouponCode(() => (e.target as any).coupon.value)
                        }}
                    >
                        <Input
                            type="text"
                            placeholder="Enter coupon code"
                            className="border bg-neutral-100 border-gray-300 rounded-lg px-4 py-2 text-neutral-900"
                            defaultValue={couponCode}
                            name="coupon"
                        />
                        <Button
                            variant='default'
                            className='text-white bg-[#6557FF] hover:bg-[#6557FF]/80 text-lg'
                            size='lg'
                            disabled={isCouponLoading}
                            type="submit"
                        >
                            Apply
                            {
                                isCouponLoading && <Spinner size={20} className='ml-2' />
                            }
                        </Button>
                    </form>
                </div>
                {
                    coupon && 'error' in coupon ? <p className="text-red-500 text-sm">{coupon.error as any}</p> :
                        // Applied coupon
                        coupon && (
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">Coupon applied:</p>
                                <p className="font-semibold text-[#F2BD4D]">{coupon.code}</p>
                                {/* A cross button to remove */}
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                        setCoupon(() => null)
                                        setCouponCode(() => '')
                                    }}
                                >
                                    <RxCross2 />
                                </button>
                            </div>
                        )
                }
            </div>

            {/* Amount */}
            <div className="mt-8 mb-2">
                <h1 className="text-2xl font-semibold">Total: {
                    (finalAmount / 100).toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR'
                    })
                }</h1>
            </div>

            <Button
                variant='default'
                // className="bg-y text-black px-8 text-lg font-semibold hover:bg-y/80"
                className='text-white bg-[#6557FF] hover:bg-[#6557FF]/80 text-lg'
                size='lg'
                onClick={placeOrder}
                disabled={isPending}
            >
                Proceed to payment
                {
                    isPending && <Spinner size={20} className='ml-2' />
                }
            </Button>
        </div>
    )
}

export default Payment