import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isEmail } from "@/lib";
import React from "react";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);
  const [email, setEmail] = React.useState("");

  const handleSubmit = async () => {
    // return ref.current?.click()
    if (!email) {
      return toast.error("Please enter your email.");
    }

    if (!isEmail(email)) {
      return toast.error("Please enter a valid email.");
    }

    setLoading(true);
    // setTimeout(() => setLoading(false), 2000)
    // return

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.status == 200) {
        toast.success("Password reset link sent successfully!");
        setEmail("");
        ref.current?.click();
      } else {
        const data = await res.json();
        // console.log(data)
        toast.error(data.message ?? "Something went wrong.");
      }
    } catch (err: any) {
      toast.error(err.name == "Error" ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          tabIndex={1}
          className="hover:underline cursor-pointer text-gray-300 p-0 bg-transparent"
        >
          {" "}
          Forgot password? Reset{" "}
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">Reset Password</DialogTitle>
          <DialogDescription className="text-gray-300">
            Forgot your password? Don&#39;t worry, we got you.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4">
              <label className="text-white text-lg mb-2">Email</label>
              <input
                placeholder="Enter Your Email"
                type="email"
                className="w-full px-5 py-2 rounded-md bg-white/20 outline-white/80 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant={"destructive"} ref={ref}>
              {" "}
              Cancel{" "}
            </Button>
          </DialogTrigger>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-500 flex gap-3 mb-2"
          >
            {loading ? (
              <>
                <span> Loading </span>
                <span className="border-t-transparent border-solid animate-spin rounded-full border-white border-2 h-5 w-5"></span>
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
