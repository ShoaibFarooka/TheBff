"use client"
import authImage from "@/assets/Rectangle 77.png";
import { isEmail } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Separator } from "../ui/separator";
import InputGroup from "../auth/InputGroup";

type RegisterFormProps = {
    onSuccess?: Function;
    onFailure?: Function;
}

type MyFormData = {
    name: string;
    username: string;
    email: string;
    phone: string;
    isDirectClient: boolean;
    address: {
        house: string;
        area: string;
        pincode: string;
        city: string;
        state: string;
    }
}

const RegisterForm = ({ onSuccess, onFailure }: RegisterFormProps) => {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        // convert data to MyFormData format
        const { username: name, email, phone, isDirectClient = true, address } = Object.entries(Object.fromEntries(formData)).reduce((acc, [key, value]) => {
            if (key.includes('.')) {
                const [parent, child] = key.split('.')
                if (!acc[parent]) acc[parent] = {}
                acc[parent][child] = value
                return acc
            }

            acc[key] = value
            return acc
        }, {} as Record<string, any>) as MyFormData

        if (!name || !phone)
            return toast.error("Please enter your name and phone number.");

        if (phone.length < 10)
            return toast.error("Phone number should not be less than 10 characters.");

        if (!isEmail(email)) return toast.error("Please enter a valid email.");


        setLoading(true);

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, isDirectClient, name, phone, password: "default123", address, signup: true }),
            });

            if (res.status == 200) {
                const data = await res.json();
                toast.success(
                    data.message ?? "You have been signed up successfully. Redirecting..."
                );
                onSuccess?.();
                router.push("/onboarding");
            } else {
                const data = await res.json();
                const { emailVerified, phoneVerified } = data;

                if (emailVerified == false || phoneVerified == false) {
                    const params = new URLSearchParams();
                    if (emailVerified == false) params.append("email", email);
                    if (phoneVerified == false) params.append("phone", phone);
                    router.push(`/verify?${params.toString()}`);
                }

                toast.error(data.message ?? "Something went wrong.");
                onFailure?.();
            }
        } catch (err: any) {
            toast.error(err.message);
            onFailure?.();
        } finally {
            setLoading(false);
        }
    }

    return <div className="max-h-[80vh] overflow-auto custom-scroll-bar pb-5">
        <div className="h-full center flex-col text-white">
            <form className="mt-2 w-full px-4 md:px-20 space-y-3" onSubmit={handleSubmit}>
                <InputGroup label="Name" name="username" />
                <InputGroup
                    label="WhatsApp Number"
                    name="phone"
                    extras={{ minLength: 10, maxLength: 10 }}
                />
                <InputGroup label="Email" name="email" type="email" />
                {/* Address */}
                <Separator className="my-3 bg-zinc-600" />
                <h3 className="text-lg text-white text-center">Address</h3>

                <InputGroup label="House" name="address.house" />
                <InputGroup label="Area" name="address.area" />
                <InputGroup label="Pincode" name="address.pincode" />
                <InputGroup label="City" name="address.city" />
                <InputGroup label="State" name="address.state" />

                <div className="mt-5 max-w-max mx-auto">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mx-auto px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-500/80 center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                        <span> Register Client </span>
                        {isLoading && (
                            <span className="border-t-transparent border-solid animate-spin rounded-full border-white border-2 h-5 w-5"></span>
                        )}
                    </button>
                </div>
            </form>
        </div>


    </div>
}


const SalesForm = () => {

    return (
        <main className="mt-[5.5rem] min-h-[70vh] px-5 md:px-14 lg:px-40">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full backdrop-blur-md rounded-lg">
                {/* ================= { LHS } ================= */}
                <div className="col-span-1 w-full h-full relative hidden md:block">
                    <Image
                        src={authImage}
                        width={500}
                        className="max-h-full"
                        alt="Auth"
                    />

                    <div className="absolute bottom-0 left-0 w-10/12 pl-10 pb-10">
                        <h2 className="text-3xl font-semibold text-[#FED25B]">
                            {/* {signup
                  ? "Sign Up and join for fitness" */}
                            {/* : " */}
                            {/* "} */}
                            Start your fitness journey with best friend in fitness.
                        </h2>
                        {/* <p className="text-white mt-1 text-lg">
                            {" "}
                            Sunt aute cupidatat excepteur aliquip ad enim tempor.{" "}
                        </p> */}
                    </div>
                </div>

                {/* ================= { RHS } ================= */}
                <div className="col-span-1">
                    {/* <AuthForm signup={signup} /> */}
                    <RegisterForm />
                </div>
            </div>

            <Toaster />
        </main>
    );
};

export default SalesForm;