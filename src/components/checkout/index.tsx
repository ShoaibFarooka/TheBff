"use client"
import { Button } from '@/components/ui/button';
import { useAuth, withAuth } from '@/hooks/auth';
import { cookie } from '@/lib/dom';
import { logger } from '@/lib/logger';
import { makeSubscriptionPayment } from '@/lib/subscription/client';
import { createSubscription, verifyPayment } from '@/lib/subscription/server';
import { cn, getServerData } from '@/lib/utils';
import { Offer } from '@/types/offer';
import { Program } from '@/types/program';
import { Plan } from '@/types/subscription';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaCircleCheck } from "react-icons/fa6";
import Offers from './Offers';

// import frame from '@/assets/Frame 3927.png'
// import frame1 from "@/assets/Rectangle 2812.png"
// import frame2 from "@/assets/Rectangle 2812 (1).png"
// import discount from '@/assets/Discount Badge.png'
// import ellipse from '@/assets/Ellipse 203.png'
// import { getPageData } from "@/lib/db";

type CheckoutProps = {
    plan: Plan & { program: Program },
    offers: Offer[]
    suggestedPlans: {
        title: string
        planId: string
    }[]
}

function Checkout({ plan, offers, suggestedPlans }: CheckoutProps) {

    const price = (plan.item.amount ? plan.item.amount / 100 : "").toLocaleString("en-IN", {
        style: "currency",
        currency: plan.item.currency
    });

    const router = useRouter();
    const { user } = useAuth();
    const [isPending, startTransition] = useTransition();

    const handleSubscribe = async () => {
        const tid = toast.loading("Processing...");

        try {
            logger.log(user)
            const { error, subscriptionId } = await getServerData<
                ReturnType<typeof createSubscription>
            >(startTransition, async () => {
                // const fromCookie = cookie.get(`subscription-${plan.id}`);
                // if (fromCookie) return { subscriptionId: fromCookie };

                const res = await createSubscription({ planId: plan.id });
                // logger.log(res)
                return res;
            });

            if (error || !subscriptionId)
                return toast.error(`Failed to create subscription: \n${error}`, {
                    id: tid,
                });

            // save subscription id in cookie for 10 minutes
            // cookie.set(`subscription-${plan.id}`, subscriptionId, 60 * 10);

            toast.loading(
                `Processing payment for subscription ${subscriptionId}...`,
                { id: tid }
            );

            // verifyPayment, returns either error or subscription & payment details
            await makeSubscriptionPayment(subscriptionId, {
                user,
                onSuccess: async (response: any) => {
                    const res = await getServerData<ReturnType<typeof verifyPayment>>(
                        startTransition,
                        async () =>
                            verifyPayment({
                                paymentId: response.razorpay_payment_id,
                                subscriptionId,
                            })
                    );

                    if (res.error) {
                        toast.error(`Failed to verify payment: \n${res.error}`, {
                            id: tid,
                        });
                        return;
                    }

                    toast.success(
                        `You have successfully subscribed to ${plan.item.name}. Redirecting to your dashboard...`,
                        { id: tid }
                    );

                    // delete cookie
                    cookie.delete(`subscription-${plan.id}`);

                    // sleep for 2 seconds
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    router.push("/dashboard");
                },

                onError: async (response: any) => {
                    logger.log(response);
                    toast.error(
                        `Payment failed: \n${response.error}. \nPlease try again or contact us for support.`,
                        { id: tid }
                    );
                },
            });
        } catch (err: any) {
            console.log(err);
            toast.error(err.message ?? "Something went wrong.", { id: tid });
        }
    };

    return (
        <div className='pt-16 md:mt-30'>
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
                            src={plan.program?.image ?? 'https://via.placeholder.com/300'}
                            alt={plan.program?.name}
                            width={300}
                            height={300}
                        />

                        <SuggestedPlans className='hidden md:block mt-8' plans={suggestedPlans} />
                    </div>

                    {/* ===================== {RHS} ===================== */}
                    <div className='w-full md:w-1/2'>
                        <div>
                            <h1 className='text-neutral-100 text-3xl md:text-4xl font-semibold'>{plan.item.name}</h1>
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
                                        onClick={handleSubscribe}
                                        disabled={isPending}
                                    >
                                        {
                                            isPending ? "Processing..." : "Proceed to pay"
                                        }
                                    </Button>
                            }

                        </div>

                        {/* Offers */}
                        {
                            // if plan amount matches the minimum amount of offer
                        }
                        <Offers offers={offers} />


                        <div className='mt-10'>
                            <h1 className='text-white font-semibold text-[2rem]'>How it works</h1>
                            <div className='px-3 text-lg text-white space-y-3'>
                                <div>
                                    <span className='inline-block w-4 h-4 bg-y rounded-full mr-2 my-auto'></span>
                                    Live workouts: Choose from the wide variety of online workouts and join in from anywhere
                                </div>
                                <div>
                                    <span className='inline-block w-4 h-4 bg-y rounded-full mr-2 my-auto'></span>
                                    Live workouts: Choose from the wide variety of online workouts and join in from anywhere
                                </div>
                                <div>
                                    <span className='inline-block w-4 h-4 bg-y rounded-full mr-2 my-auto'></span>
                                    Live workouts: Choose from the wide variety of online workouts and join in from anywhere
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
                        <Link href={`/checkout?plan=${plan.planId}`}>
                            <button className='text-white bg-[#6557FF] px-5 md:px-10 py-2 rounded-xl'>View</button>
                        </Link>
                    </div>
                )) : null
            }
        </div>
    )
}

export default withAuth<CheckoutProps>(Checkout, true);