"use client"
import { Button } from '@/components/ui/button';
import { useAuth, withAuth } from '@/hooks/auth';
import { getDurationText } from '@/lib';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import { Program } from '@/types/program';
import { Plan } from '@/types/subscription';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaCircleCheck } from "react-icons/fa6";

type CheckoutProps = {
    plan: Plan & { program: Program },
    suggestedPlans: {
        title: string
        planId: string
    }[]
}

function PlanDetails({ plan, suggestedPlans }: CheckoutProps) {

    const price = (plan.amount ? plan.amount / 100 : "").toLocaleString("en-IN", {
        style: "currency",
        currency: plan.currency
    });

    const { user } = useAuth();

    const mutation = api.cart.addItem.useMutation({
        onSettled(data) {
            toast.dismiss('add-to-cart');
            if (data && 'error' in data) {
                toast.error(
                    <div>
                        {data.error ?? 'Failed to add to cart'}
                        <Link href="/cart" prefetch={false}>
                            <Button variant='link' className="text-blue-500">Go to cart</Button>
                        </Link>
                    </div>,
                    { id: 'add-to-cart', duration: 2000 }
                );
            } else {
                toast.success(
                    <div className="flex items-center gap-2">
                        <p>Added to cart</p>

                        <Link href="/cart" prefetch={false}>
                            <Button variant='link' className="text-blue-500">View Cart</Button>
                        </Link>
                    </div>,
                    { id: 'add-to-cart', duration: 5000 }
                );

            }
        },
    });

    return (
        <div className='pt-16 md:pt-24'>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className='relative grid grid-cols-2 mb-10 md:mb-0'>
                <div className="col-span-1 pl-5 my-auto">
                    <Link href='/programs'>
                        <button className='bg-gray-800 rounded-full p-3'>
                            <FaArrowLeft className='text-zinc-400 text-lg md:text-xl' />
                        </button>
                    </Link>
                </div>
                <div className="col-span-1">
                    <h1 className="max-w-max font-semibold text-[2.5rem] lg:text-[5rem] text-[#F2BD4D] -translate-x-1/2">Checkout</h1>
                </div>
            </div>

            <div className='px-5 container pt-10 md:pt-16'>
                <div className='flex flex-col md:flex-row justify-around md:gap-24 gap-8'>
                    <div className='w-full md:w-1/2'>
                        <Image
                            className='w-full max-h-80 rounded shadow-xl shadow-y/10'
                            src={plan.image ?? 'https://via.placeholder.com/300'}
                            alt={plan.name}
                            width={300}
                            height={300}
                        />

                        <SuggestedPlans className='hidden md:block mt-8' plans={suggestedPlans} />
                    </div>

                    {/* ===================== {RHS} ===================== */}
                    <div className='w-full md:w-1/2'>
                        <div>
                            <h1 className='text-neutral-100 text-3xl md:text-4xl font-semibold'>{plan.name}</h1>
                            {/* Duration */}
                            <p className='text-neutral-400 font-semibold text-lg'>
                                {getDurationText(plan.period, plan.interval)}
                            </p>

                            <div className='flex items-center my-3'>
                                <h2 className='text-white text-[32px] font-bold'>{price}</h2>

                                {/* <h2 className='ml-5 text-[#ABABAB] text-[32px] font-bold line-through'>{prices.offeredPrice}</h2> */}
                                {/* <button className="text-white bg-[#6557FF] px-1 rounded-md ml-5">
                                    {prices.percentage}
                                </button> */}
                            </div>



                            {/* <p className='text-white'>
                                {prices.description}
                            </p> */}
                            <ul className='list-none gap-2 text-zinc-200'>
                                {plan.features?.map((feature, i) => (
                                    <p
                                        className="space-x-2 mb-2 flex"
                                        key={`product-${plan.programId}-feature-${i}`}
                                    >
                                        <FaCircleCheck size={20} className="mt-1 text-green-400" />
                                        <span className="">{feature}</span>
                                    </p>
                                ))}
                            </ul>

                            {
                                !user ? (
                                    <>
                                        <p className='text-white mt-5'>
                                            Please login to continue
                                        </p>
                                        <Link href='/login'>
                                            <Button className='text-white my-1 bg-[#6557FF] hover:bg-[#6557FF]/80'>
                                                Login
                                            </Button>
                                        </Link>
                                    </>
                                ) :
                                    <Button
                                        className='text-white bg-[#6557FF] my-5 hover:bg-[#6557FF]/80'
                                        // onClick={handleSubscribe}
                                        // disabled={isPending}
                                        onClick={() => mutation.mutate({ planId: plan._id as string })}
                                        disabled={mutation.isLoading}
                                    >
                                        {mutation.isLoading ? "Adding..." : "Add to cart"}
                                    </Button>
                            }

                        </div>

                        <div className='mt-10'>
                            <h1 className='text-white font-semibold text-[2rem]'>How it works</h1>
                            <div className='px-3 text-lg text-white space-y-3'>
                                <div>
                                    <span className='inline-block w-4 h-4 bg-y rounded-full mr-2 my-auto'></span>
                                    <b>Purchase Confirmation</b>: Once you purchase a plan, you will receive a confirmation email with all the details, including information about your assigned trainer.
                                </div>
                                <div>
                                    <span className='inline-block w-4 h-4 bg-y rounded-full mr-2 my-auto'></span>
                                    <b>Personalized Call</b>: Our support team will give you a call to discuss your specific requirements and preferences to ensure we tailor the experience to your needs.
                                </div>
                                <div>
                                    <span className='inline-block w-4 h-4 bg-y rounded-full mr-2 my-auto'></span>
                                    <b>Scheduling Your Sessions</b>:
                                    For online plans, your sessions will be scheduled and you’ll receive all the details via email, including the links for virtual classes.
                                    For in-home services, your trainer will visit your location for the first session at the scheduled time.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <SuggestedPlans className='md:hidden w-full md:w-1/2' plans={suggestedPlans} />

            </div >
        </div >
    )
}


function SuggestedPlans({ className, plans }: { className?: string, plans: CheckoutProps['suggestedPlans'] }) {
    return (
        <div className={cn('', className)}>
            <h1 className='text-white text-[32px] font-[600] mb-2'>Suggested Plans</h1>

            {/* <Image src={images[2]} width={100} height={100} alt=" " /> */}
            {/* <div className='flex flex-row justify-between px-3 py-4 rounded-xl items-center  bg-gradient-to-r from-[#4A2F70] to-[#344363]'>
                <p className='text-[10px] md:text-base text-white'>1 Month Premium - Dance</p>
                <Link href='/programs?program=dance'>
                    <button className='text-white bg-[#6557FF] px-5 md:px-10 py-2 rounded-xl'>View</button>
                </Link>
            </div> */}

            {
                plans?.length > 0 ? plans.map((plan, i) => (
                    <div key={i} className='flex flex-row justify-between px-3 py-4 rounded-xl items-center  bg-gradient-to-r from-[#4A2F70] to-[#344363]'>
                        <p className='text-[10px] md:text-base text-white'>{plan.title}</p>
                        <Link href={`/checkout?plan=${plan.planId}`} prefetch={false}>
                            <button className='text-white bg-[#6557FF] px-5 md:px-10 py-2 rounded-xl'>View</button>
                        </Link>
                    </div>
                )) : null
            }
        </div>
    )
}

export default withAuth<CheckoutProps>(PlanDetails, true);