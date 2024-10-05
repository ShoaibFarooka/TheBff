import { Subscription } from "@/types/db";
import { Program } from "@/types/program";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ProgramState {
    programs: Program[];
    setPrograms: (programs: Program[]) => void;
    isLoading: boolean;
    subscriptions: { [key: string]: Subscription };
    setSubscription: (key: string, subscription: Subscription) => void;
    // isSubscribing: boolean;
}

export const useProgram = create<ProgramState>((set, get) => ({
    programs: [],
    setPrograms: (programs) => set({ programs }),
    isLoading: true,
    subscriptions: {},
    setSubscription: (key, subscription) => set({ subscriptions: { ...get().subscriptions, [key]: subscription } }),
    // isSubscribing: false
}));

export const fetchSuscription = async () => {
    try {

    } catch (err: any) {
        console.error(err);
        toast.error(err.message ?? 'Failed to load your subscription data');
    }
}