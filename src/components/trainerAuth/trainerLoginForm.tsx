"use client"
import { isEmail } from "@/lib";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import ResetPassword from "../ResetPasswordModal";
import InputGroup from "../auth/InputGroup";

type LoginFormProps = {
    onSuccess?: Function;
    onFailure?: Function;
}

export const LoginForm = ({ onSuccess, onFailure }: LoginFormProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setLoading] = useState(false)
    const pathname = usePathname()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const email = form.email.value
        const password = form.password.value

        if (password.length < 6)
            return toast.error("Password must be at least 6 characters long.");

        if (!isEmail(email)) return toast.error("Please enter a valid email.");

        // mutation.mutate({
        //     email: form.email.value,
        //     password: form.password.value
        // })

        try {
            setLoading(true);

            const res = await fetch("/api/auth/login-trainer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, }),
            });

            if (res.status == 200) {
                const data = await res.json();
                toast.success(
                    data.message ??
                    "You have been logged in successfully.")
                onSuccess?.();
                router.push('/trainer/dashboard'); // Redirect to trainer dashboard or appropriate page
            }

        } catch (err: any) {
            toast.error(err.message);
            onFailure?.();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-full center flex-col text-white max-h-full overflow-auto">
            <h3 className="text-4xl text-white text-center mb-6 pt-10">Trainer Login</h3>
            <div className="max-w-max my-3 mx-auto bg-white rounded-full flex p-1">
                <Link href="/trainer/login">
                    <button
                        className={`px-8 py-2 rounded-full ${
                            pathname === '/trainer/login' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-transparent text-black'
                        }`}
                    >
                        Login
                    </button>
                </Link>
                <Link href="/trainer/signup">
                    <button
                        className={`px-8 py-2 rounded-full ${
                            pathname === '/trainer/signup' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-transparent text-black'
                        }`}
                    >
                        Sign Up
                    </button>
                </Link>
            </div>

            <form className="mt-2 w-full px-4 md:px-20 space-y-3" onSubmit={handleSubmit}>
                <InputGroup label="Email" name="email" type="email" />
                <InputGroup
                    label="Password"
                    name="password"
                    type="password"
                    extras={{ minLength: 8, maxLength: 12 }}
                />
                <ResetPassword />

                <div className="mt-5 max-w-max mx-auto">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mx-auto px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-500/80 center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                        <span> Login </span>
                        {isLoading && (
                            <span className="border-t-transparent border-solid animate-spin rounded-full border-white border-2 h-5 w-5"></span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

const TrainerLogin: React.FC = () => {
    return (
        <main className="mt-[5.5rem] min-h-[70vh] px-5 md:px-14 lg:px-40">
            <div className="grid grid-cols-1 w-full h-full backdrop-blur-md rounded-lg">
                {/* ================= { RHS } ================= */}
                <div className="col-span-1">
                    <LoginForm />
                </div>
            </div>

            <Toaster />
        </main>
    );
};

export default TrainerLogin;
