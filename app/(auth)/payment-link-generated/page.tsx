"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { Suspense } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPlus } from "react-icons/fi";
import Cookies from 'js-cookie';

const PaymentLinkGenerated = () => {
    const router = useRouter();
    const paymentLink = Cookies.get('paymentLink') || '#';

    return (
        <Suspense
            fallback={
                <div className="center">
                    <div className="loader">Loading..</div>
                </div>
            }
        >
            <Suspense fallback={
                <div className="center">
                    <div className="loader">Loading..</div>
                </div>
            }>
                <div className="flex-col mt-24 ml-24 text-white">
                    <button
                        onClick={() => router.push("/direct-client-form")}
                        className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                    >
                        Back
                    </button>
                </div>
                <div className="min-h-[70vh] center flex-col mt-24 text-white">
                    <div className="max-w-2xl center flex-col">
                        <h2 className="text-5xl text-center mb-12 font-semibold">Payment Successfully Generated !</h2>

                        <div className="center gap-4 mb-5">
                            <FiMail size={70} className="text-blue-500" />
                            <FiPlus size={40} className="text-white" />
                            <FaWhatsapp size={70} className="text-green-500" />
                        </div>
                        <p className="text-red-400 mt-6 text-lg text-center">
                            Thank you for your request. We've just sent a secure payment link to the email address you provided.
                        </p>
                        <p className="text-red-400 mt-6 text-lg text-center">
                            Please check your inbox for the payment link. If you don't see it, be sure to check your spam or junk folder.
                            Click the link in the email to complete your payment.
                            Once your payment is confirmed, we'll notify you via email.
                            If you encounter any issues or have any questions, feel free to contact our support team.
                        </p>
                        <a
                            href={paymentLink}
                            className="mt-6 text-lg text-center block"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {paymentLink}
                        </a>
                    </div>

                    <Toaster />
                </div>
            </Suspense>
        </Suspense>
    );
};

export default PaymentLinkGenerated;
