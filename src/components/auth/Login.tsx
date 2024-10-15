"use client"
import authImage from "@/assets/Rectangle 77.png";
import { isEmail } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ResetPassword from "../ResetPasswordModal";
import InputGroup from "./InputGroup";

type LoginFormProps = {
    onSuccess?: Function;
    onFailure?: Function;
}

export const LoginForm = ({ onSuccess, onFailure }: LoginFormProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setLoading] = useState(false)

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

            const res = await fetch("/api/auth", {
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

                const role = data?.role;
                role === 3 && router.push(searchParams.get("cb") ?? "/dashboard");
                (role === 4 || role === 1) && router.push("/direct-client-registration");
            } else {
                const data = await res.json();
                const { emailVerified, phoneVerified } = data;

                // || phoneVerified == false) {
                if (emailVerified == false) {
                    const params = new URLSearchParams();
                    // if (phoneVerified == false) params.append("phone", phone);

                    if (emailVerified == false) params.append("email", email);
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

    return <>
        <div className="h-full center flex-col text-white max-h-full overflow-auto">
            <div className="max-w-max my-3 mx-auto bg-white rounded-full flex p-1">
                <Link href="/login">
                    <button
                        className="px-8 py-2 rounded-full bg-blue-500 text-white"
                    >
                        Login
                    </button>
                </Link>
                <Link href="/signup">
                    <button
                        className="px-8 py-2 rounded-full bg-transparent text-black"
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


    </>

}

const Login = () => {

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
                    <LoginForm />
                </div>
            </div>

            <Toaster />
        </main>
    );
};

export default Login;
