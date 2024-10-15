"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPlus, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Cookies from "js-cookie";
const PaymentLinkGenerated = () => {
    const router = useRouter();

    const [paymentLink, setPaymentLink] = useState<string | null>(null);

    useEffect(() => {
        const link = Cookies.get('paymentLink') ?? null; // Fetch paymentLink from cookie
        setPaymentLink(link);
    }, []);
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
                <div className="min-h-[70vh] center flex-col mt-24 text-white relative">
                    <Link href="/direct-client-registration" passHref>
                        <button
                            className="absolute top-4 left-40 p-5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center gap-1"
                            aria-label="Go back to dashboard"
                        >
                            <FiArrowLeft size={24} /> <p>Back</p>
                        </button>
                    </Link>
                    <div className="max-w-2xl center flex-col">
                        <h2 className="text-5xl text-center mb-12 font-semibold">Payment Successfully Generated !</h2>

                        {/* Display the payment link if it exists */}
                        {paymentLink && (
                            <p className="text-white mt-6 mb-10 text-lg text-center">
                                Client's Payment Link: <a href={paymentLink} target="_blank" className="underline text-blue-500">{paymentLink}</a>
                            </p>
                        )}

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
                    </div>

                    <Toaster />
                </div>
            </Suspense>
        </Suspense>
    );
};

export default PaymentLinkGenerated;
