"use client"

import { Button } from "@/components/ui/button"
import { getDurationText } from "@/lib"
import { api } from "@/trpc/react"
import { RouterOutputs } from "@/trpc/shared"
import toast from "react-hot-toast"
import Payment from "./Payment"


type CartProps = {
    cart: RouterOutputs['cart']['get']
}

const Cart = ({ cart: initialData }: CartProps) => {

    // useDebug('cart.items.length', initialData?.items?.length! < 1)
    // useDebug('cart', initialData)

    const { data: cart, refetch } = api.cart.get.useQuery(undefined, {
        initialData,
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    const mutation = api.cart.removeItem.useMutation({
        onSettled(data) {
            if (data && 'error' in data) {
                return toast.error(data.error ?? "Failed to remove item from cart")
            }
            // router.refresh()
            refetch()
        },
    })

    const removeItem = async (planId: string) => {
        toast(
            (t) => <div>
                <p>Are you sure you want to remove this item from your cart?</p>
                <div className="flex justify-center gap-4 mt-4">
                    <Button
                        variant='destructive'
                        onClick={() => {
                            mutation.mutate({ planId })
                            toast.dismiss(t.id)
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        variant='default'
                        onClick={() => toast.dismiss(t.id)}
                    >
                        No
                    </Button>
                </div>
            </div>,
            {
                duration: 20 * 1000,
            }
        )
    }

    if (cart?.items?.length! < 1) {
        return (<>
            <div className="container mx-auto mt-10">
                <div className="text-center">
                    <h1 className="text-2xl md:text-4xl font-bold">Your cart is empty</h1>
                    <p className="text-gray-200 text-primary-foreground/70">Looks like you haven{"'"}t added any items to your cart yet.</p>
                </div>
            </div>
        </>)
    }

    return (
        <div className="container mx-auto !pb-24 pt-16 md:pt-24">
            <div className="text-center mb-16">
                <h1 className="text-2xl md:text-4xl font-bold">Your Cart</h1>
                <p className="text-gray-300">Here are the items in your cart</p>
            </div>

            <div className="gap-4 mb-16 space-y-4">
                {cart?.items.map((item, i) => (
                    <div key={`item-${i + 1}`} className="gradient-bg p-4 md:px-10 shadow-md rounded-md flex justify-between">
                        <div className="">
                            <h2 className="text-xl font-semibold">{item.plan?.name}</h2>
                            {
                                item.plan?.amount && (
                                    <p className="text-gray-300">
                                        Price: ₹{(item.plan.amount / 100)?.toLocaleString('en-IN')} {' '}
                                        | {getDurationText(item.plan?.period, item.plan?.interval)}
                                    </p>
                                )
                            }
                        </div>
                        <div className="">
                            <Button
                                variant='destructive'
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={() => removeItem(item.plan?._id as string)}
                                disabled={mutation.isLoading}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout */}
            <Payment amount={cart?.subTotal!} />
        </div>
    )
}

export default Cart