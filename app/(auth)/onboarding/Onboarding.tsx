"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPlus } from "react-icons/fi";

const Onboarding = () => {
  const [loading, setLoading] = React.useState(false);

  const [showResendEmail, setShowResendEmail] = React.useState(false);
  //   const [showResendPhone, setShowResendPhone] = React.useState(false);
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  React.useEffect(() => {
    if (email) setTimeout(() => setShowResendEmail(true), 10000);
  }, [email]);

  //   React.useEffect(() => {
  //     if (phone) setTimeout(() => setShowResendPhone(true), 10000);
  //   }, [phone]);

  const handleResend = async (method: "e" | "w" = "w") => {
    if (method == "e" && !email) return;
    if (method == "w" && !phone) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/rvl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ method, email, phone }),
      });

      if (res.status == 200) {
        toast.success("Email sent successfully!");
      } else {
        const data = await res.json();
        toast.error(data.message ?? "Something went wrong.");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // const

  return (
    <Suspense fallback={
      // loader
      <div className="center">
        <div className="loader">Loading..</div>
      </div>
    }>
      <div className="min-h-[70vh] center flex-col mt-24 text-white">
        <div className="max-w-2xl center flex-col">
          <h2 className="text-5xl text-center mb-12 font-semibold">Welcome !</h2>

          <div className="center gap-4 mb-5">
            <FiMail size={70} className="text-blue-500" />
            <FiPlus size={40} className="text-white" />
            <FaWhatsapp size={70} className="text-green-500" />
          </div>

          {email && (
            <h2 className="text-2xl flex text-center">
              An <FiMail size={25} className="text-blue-500 ml-2 mr-1 mt-1" />{" "}
              email with the verification link has been sent to you.
            </h2>
          )}
          {/* {
                      phone && <h2 className="text-2xl flex text-center mt-4">
                          A <FaWhatsapp size={25} className="text-green-500 ml-2 mr-1 mt-1" /> WhatsApp message with the verification link has been sent to you. 
                      </h2>
                  } */}

          <p className="text-red-400 mt-6 text-lg">
            You won&#39;t be able to use your account until you verify your email
            address.
          </p>

          <div className="center gap-5">
            {showResendEmail && (
              <Button
                onClick={() => handleResend("e")}
                disabled={loading}
                className="mt-7 center gap-3 disabled:cursor-not-allowed"
                variant={"secondary"}
              >
                <FiMail className="text-blue-500" /> Resend Email
              </Button>
            )}

            {/* {
                          showResendPhone && <Button onClick={() => handleResend('w')} disabled={loading} className="mt-7 center gap-3 disabled:cursor-not-allowed" variant={'secondary'}>
                              <FaWhatsapp className="text-green-400" /> Resend WA Message
                          </Button>
                      } */}
          </div>
        </div>

        <Toaster />
      </div>
    </Suspense>
  );
};

export default Onboarding;
