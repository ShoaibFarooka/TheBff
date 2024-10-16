"use client"
import authImage from "@/assets/Rectangle 77.png";
import { isEmail } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Separator } from "../ui/separator";
import InputGroup from "../auth/InputGroup";
import { getAuthUser } from "@/lib/auth";

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
    amount: number;
    planId: string;
    program: string;
    period: string;
    interval: string;
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
    type ProgramOption = {
        id: string;
        name: string;
    };
    type PlanOption = {
        programId: string;
        name: string;
    };
    type PeriodOption = {
        period : string;
    };
    type IntervalOption = {
        interval : string;
    };
    const [programOptions, setProgramOptions] = useState<ProgramOption[]>([]);
    const [selectedProgram, setSelectedProgram] = useState<string>("");
    const [planOptions, setPlanOptions] = useState<PlanOption[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<string>("");
    const [periodOptions, setPeriodOptions] = useState<PeriodOption[]>([]);
    const [selectedPeriod, setSelectedPeriod] = useState<string>("");
    const [intervalOptions, setIntervalOptions] = useState<IntervalOption[]>([]);
    const [selectedInterval, setSelectedInterval] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const getProgramOptions = async() => {
        const res = await fetch('/api/programs/programs-options')
        const data = await res.json()
        setProgramOptions(data?.data)
    }
    const getPlanOptions = async () => {
        const res = await fetch(`/api/plans/plans-options?selectedProgram=${selectedProgram}`);
        const data = await res.json();

        if (data?.success) {
            // Use a Set to track unique programIds
            const uniqueProgramIds = new Set<string>();

            const uniquePlans = data.data.filter((plan: PlanOption) => {
                if (!uniqueProgramIds.has(plan.programId)) {
                    uniqueProgramIds.add(plan.programId);
                    return true; // Keep this plan
                }
                return false; // Filter out duplicate programIds
            });

            setPlanOptions(uniquePlans);
        } else {
            // Handle error accordingly
            console.error("Failed to fetch plan options:", data?.message);
        }
    }

    const getPeriodOptions = async () => {
        const res = await fetch(`/api/plans/period-options?selectedPlan=${selectedPlan}`);
        const data = await res.json();

        if (data?.success) {
            // Use a Set to track unique periods
            const uniquePeriods = new Set<string>();

            const uniquePeriodOptions = data.data.filter((option: PeriodOption) => {
                if (!uniquePeriods.has(option.period)) {
                    uniquePeriods.add(option.period);
                    return true; // Keep this period option
                }
                return false; // Filter out duplicate periods
            });

            setPeriodOptions(uniquePeriodOptions);
        } else {
            // Handle error accordingly
            console.error("Failed to fetch period options:", data?.message);
        }
    }

    const getIntervalOptions = async () => {
        try {
            // Fetch the interval options based on selectedPlan and selectedPeriod
            const res = await fetch(`/api/plans/interval-options?selectedPeriod=${selectedPeriod}&selectedPlan=${selectedPlan}`);
            const data = await res.json();

            if (data?.success) {
                // Use a Set to track unique intervals
                const uniqueIntervals = new Set<string>();

                const uniqueIntervalOptions = data.data.filter((option: IntervalOption) => {
                    if (!uniqueIntervals.has(option.interval)) {
                        uniqueIntervals.add(option.interval);
                        return true; // Keep this interval option
                    }
                    return false; // Filter out duplicate intervals
                });

                setIntervalOptions(uniqueIntervalOptions);
            } else {
                // Handle error accordingly
                console.error("Failed to fetch interval options:", data?.message);
            }
        } catch (error) {
            console.error("Error fetching interval options:", error);
        }
    };

    const hasPermission = async() => {
        const user = await getAuthUser()
        const role = user?.user?.role
        if(role === 3){
            return router.push("/dashboard");
        }
    }


    useEffect(() => {
        hasPermission()
        getProgramOptions()
    }, [])
    useEffect(() => {
        selectedProgram && getPlanOptions();
    }, [selectedProgram])
    useEffect(() => {
        selectedProgram && selectedPlan && getPeriodOptions();
    }, [selectedProgram, selectedPlan])
    useEffect(() => {
        selectedPeriod && selectedProgram && selectedPlan && getIntervalOptions();
    }, [selectedProgram, selectedPlan, selectedPeriod])


    const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProgram(e.target.value); // Set the selected program
    };
    const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlan(e.target.value); // Set the selected plan
    };
    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPeriod(e.target.value); // Set the selected plan
    };
    const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedInterval(e.target.value); // Set the selected plan
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        // convert data to MyFormData format
        const { username: name, email, phone, isDirectClient = true, address, amount = 0, program, planId = null, period, interval} = Object.entries(Object.fromEntries(formData)).reduce((acc, [key, value]) => {
            if (key.includes('.')) {
                const [parent, child] = key.split('.')
                if (!acc[parent]) acc[parent] = {}
                acc[parent][child] = value
                return acc
            }

            acc[key] = value
            return acc
        }, {} as Record<string, any>) as MyFormData

        if (!planId || !program || !period || !interval){
            return toast.error("Please enter plan information.");
        }
        if(!amount){
            return toast.error("Please enter the amount for the plan.")
        }
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
                body: JSON.stringify({ email, isDirectClient, amount, planId, program, interval, period, name, phone, password: "", address, signup: true }),
            });

            if (res.status == 200) {
                const data = await res.json();
                toast.success(
                    data.message ?? "You have been signed up successfully. Redirecting..."
                );
                onSuccess?.();
                localStorage.setItem("paymentLink", data.paymentLink)
                router.push("/payment-link-generated");
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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        console.log("input", input)
        const digits = input.replace(/\D/g, ""); // Keep only digits
        console.log("digits", digits)
      
        if (digits.length <= 10) {
          setPhone(digits);  // Allow up to 10 digits only
        }
      };

    return <div className="max-h-[80vh] overflow-auto custom-scroll-bar pb-5">
        <div className="h-full center flex-col text-white">
            <form className="mt-2 w-full px-4 md:px-20 space-y-3" onSubmit={handleSubmit}>
                <InputGroup label="Name" name="username" />
                <div style={{ display: 'flex', alignItems: 'center' }} className="flex flex-col w-full">
                    <label className="text-white text-lg mb-1">{"WhatsApp Number"}</label>
                    <div style={{ display: "flex", width: '100%' }} className="w-full">
                        <span style={{ marginRight: '5px', marginTop: "3px" }}>+91</span>
                        <input
                            className="px-5 py-2 rounded-md bg-white/20 outline-white/80 flex-grow"
                            type="text"
                            value={phone}
                            name="phone"
                            onChange={handlePhoneChange}
                            placeholder="Enter 10-digit number"
                            maxLength={10}
                            minLength={10}
                            style={{ padding: '5px' }}
                            required
                        />
                    </div>
                </div>
                <InputGroup label="Email" name="email" type="email" />
                <h3 className="text-lg text-white text-center">Plan Information</h3>

                <div className="flex flex-col w-full">
                    <label className="text-white text-lg mb-1">{"Program Name"}</label>
                    <select
                        className="px-5 py-2 rounded-md bg-gray-800 text-white outline-none" // Set the background color
                        value={selectedProgram}
                        name="program"
                        onChange={handleProgramChange}
                    >
                        <option className="bg-gray-700 text-white" value="">
                            Select a program
                        </option>
                        {programOptions.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-white text-lg mb-1">{"Plan Name"}</label>
                    <select
                        className="px-5 py-2 rounded-md bg-gray-800 text-white outline-none" // Set the background color
                        value={selectedPlan}
                        name="planId"
                        onChange={handlePlanChange}
                    >
                        <option className="bg-gray-700 text-white" value="">
                            Select a plan
                        </option>
                        {planOptions.map((option, index) => (
                            <option key={index} value={option.programId}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-white text-lg mb-1">{"Period"}</label>
                    <select
                        className="px-5 py-2 rounded-md bg-gray-800 text-white outline-none" // Set the background color
                        value={selectedPeriod}
                        name="period"
                        onChange={handlePeriodChange}
                    >
                        <option className="bg-gray-700 text-white" value="">
                            Select a period
                        </option>
                        {periodOptions.map((option, index) => (
                            <option key={index} value={option.period}>
                                {option.period}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-white text-lg mb-1">{"Interval"}</label>
                    <select
                        className="px-5 py-2 rounded-md bg-gray-800 text-white outline-none" // Set the background color
                        value={selectedInterval}
                        name="interval"
                        onChange={handleIntervalChange}
                    >
                        <option className="bg-gray-700 text-white" value="">
                            Select an Interval
                        </option>
                        {intervalOptions.map((option, index) => (
                            <option key={index} value={option.interval}>
                                {option.interval}
                            </option>
                        ))}
                    </select>
                </div>

                <InputGroup label="Amount" name="amount" />
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
                        <span> Generate Payment Link </span>
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
            <div className="grid w-full h-full backdrop-blur-md rounded-lg">
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
