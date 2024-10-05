"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { LoginForm } from "./Login";

type LoginPopupProps = {
    open?: boolean;
    onClose?: (isOpen?: boolean) => void;
}

// This modal will be automatically opened if the user is not logged in.

const LoginPopup = ({ open, onClose }: LoginPopupProps) => {

    const authenticate = useAuth((s) => s.authenticate);
    const [isOpen, setIsOpen] = useState(Boolean(open));

    if (!onClose) {
        onClose = (isOpen?: boolean) => setIsOpen(Boolean(isOpen));
    }

    const close = () => {
        // setCookie to not show again
        document.cookie = `showLoginPopup=false; expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
        onClose?.(false);
    }

    useEffect(() => {
        authenticate({
            callback: (user) => {
                if (!user) {
                    // open the modal after 10 seconds
                    setTimeout(() => {
                        setIsOpen(true);
                    }, 10000);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(isOpen) => onClose?.(isOpen)}>
                <DialogContent className="min-w-min max-w-3xl rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-[25px] py-5 lg:px-[55px] xl:py-10">
                    <DialogHeader>
                        <DialogTitle className="text-neutral-100 text-4xl text-center">
                            Login to begin your journey!
                        </DialogTitle>
                        <DialogDescription className="text-center text-neutral-400">
                            Here starts your journey to a healthier lifestyle. Login to get started.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mx-auto w-full md:w-3/4 mt-10">
                        <LoginForm
                            onSuccess={() => onClose?.(false)}
                        />
                    </div>

                    {/* Do not show again button */}
                    <div className="flex justify-center md:mt-5">
                        <button
                            className="text-neutral-200 text-sm underline"
                            onClick={close}
                        >
                            Close and do not show again for 24 hours
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default LoginPopup