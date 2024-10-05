"use client";
import authImage from "@/assets/Rectangle 77.png";
import { useAuth, withAuth } from "@/hooks/auth";
import { isEmail } from "@/lib";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "./ui/button";

const ResetPassword = dynamic(() => import("@/components/ResetPasswordModal"), {
  ssr: false,
  loading: () => <div> </div>,
});

interface IAuth {
  signup?: boolean;
}

const InputGroup = ({
  label,
  type = "text",
  name,
  placeholder,
  hidden = false,
  extras = {},
}: {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  extras?: Object;
  hidden?: boolean;
}) => {
  return !hidden ? (
    <div className="flex flex-col mt-3 w-full">
      <label className="text-white text-lg mb-1">{label}</label>
      <input
        {...extras}
        type={type}
        name={name}
        placeholder={placeholder ?? `Enter ${label}`}
        className="px-5 py-2 rounded-md bg-white/20 outline-white/80"
        required
      />
    </div>
  ) : null;
};

type AuthFormParams = IAuth & {
  onSuccess?: () => void;
  onFailure?: () => void;
}

export const AuthForm = withAuth<AuthFormParams>(
  ({ signup = false, onSuccess = () => { }, onFailure = () => { } }: AuthFormParams) => {
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const { user } = useAuth();

    useEffect(() => {
      if (!signup) {

        if (searchParams.has("force-login")) {
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          return
        }
      }
    }, [signup, router, searchParams, onSuccess]);

    useEffect(() => {
      if (user)
        toast(<div>
          <p>You{"'"}re already logged in as <b>{user.name}</b>.</p>
          <Button className="mt-2" variant={'outline'} onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
        </div>)
      // router.push("/dashboard");

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //  a function to handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const target = e.target as HTMLFormElement;
      const email = target.email.value,
        password = target.password.value,
        name = target.username?.value,
        phone = target.phone?.value;

      if (signup && (!name || !phone))
        return toast.error("Please enter your name and phone number.");
      if (signup && phone.length < 10)
        return toast.error("Phone number should not be less than 10 characters.");
      if (!email || !password)
        return toast.error("Please enter your email and password.");
      if (!isEmail(email)) return toast.error("Please enter a valid email.");
      if (password.length < 8)
        return toast.error("Password must be at least 8 characters long.");

      setLoading(true);

      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name, phone, signup }),
        });

        if (res.status == 200) {
          const data = await res.json();
          toast.success(
            data.message ??
            (signup
              ? "You have been signed up successfully. Redirecting..."
              : "You have been logged in successfully.")
          );
          onSuccess();
          if (signup) router.push("/onboarding");
          else router.push(searchParams.get("cb") ?? "/dashboard");
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
          onFailure();
        }
      } catch (err: any) {
        toast.error(err.message);
        onFailure();
      } finally {
        setLoading(false);
      }

      // toast.success('You have been logged in successfully.')
    };

    return (
      <div className="h-full center flex-col text-white max-h-full overflow-auto">
        <div className="max-w-max my-3 mx-auto bg-white rounded-full flex p-1">
          <Link href="/login">
            <button
              className={`px-8 py-2 rounded-full ${signup
                ? "bg-transparent text-black"
                : "bg-blue-500 text-white"
                }`}
            >
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button
              className={`px-8 py-2 rounded-full ${signup
                ? " bg-blue-500 text-white"
                : "bg-transparent text-black"
                }`}
            >
              Sign Up
            </button>
          </Link>
        </div>

        <p className="text-lg px-5 py-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <form className="mt-2 w-full px-4 md:px-20" onSubmit={handleSubmit}>
          <InputGroup label="Name" name="username" hidden={!signup} />
          <InputGroup
            label="WhatsApp Number"
            name="phone"
            hidden={!signup}
            extras={{ minLength: 10, maxLength: 10 }}
          />
          <InputGroup label="Email" name="email" type="email" />
          <InputGroup
            label="Password"
            name="password"
            type="password"
            extras={{ minLength: 8, maxLength: 12 }}
          />
          {!signup && <ResetPassword />}

          <div className="mt-5 max-w-max mx-auto">
            <button
              type="submit"
              disabled={loading}
              className="mx-auto px-6 py-2 rounded-full bg-blue-500 center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <span> {signup ? "Sign Up" : "Login"} </span>
              {loading && (
                <span className="border-t-transparent border-solid animate-spin rounded-full border-white border-2 h-5 w-5"></span>
              )}
            </button>
          </div>
        </form>
      </div>

    )
  },
  true
)

const Auth = ({ signup = false }: IAuth) => {

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
                ? "Let's become best friends in fitness, to make you healthy!"
                : " */}
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
          <AuthForm signup={signup} />
        </div>
      </div>

      <Toaster />
    </main>
  );
};

export default Auth;