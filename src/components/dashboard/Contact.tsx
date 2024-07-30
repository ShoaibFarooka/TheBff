"use client";

import { useAuth } from "@/hooks/auth";
import { sendEmail } from "@/lib/email";
import { getServerData } from "@/lib/utils";
import { useTransition } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();

  const submitQuery = async (form: FormData) => {
    const tid = toast.loading("Submitting query...");
    try {
      await getServerData(startTransition, async () => {
        const res = await sendEmail(
          {
            to: "thebffupdates@gmail.com",
            subject: `New query from ${user?.name} (${user?.email})`,
            text: `Name: ${user?.name}\nEmail: ${user?.email}\nID:${String(user?._id)}\n\n${form.get(
              "message"
            )}`,
            replyTo: user?.email,
          },
          { throwOnError: false }
        );

        if (res.success) {
          toast.success("Query submitted successfully.", { id: tid });
        } else {
          toast.error("Failed to submit query.", { id: tid });
        }
      });
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to submit query.", { id: tid });
    }
  };

  return (
    <div className=" bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1">
      <h1 className="text-white text-[24px] mb-4">Contact Trainer</h1>

      <form action={submitQuery}>
        <textarea
          name="message"
          className="my-10 p-5 rounded-lg w-full "
          placeholder="Type your query here"
          disabled={!user}
          required
          minLength={20}
        />

        <div className="text-center">
          <button
            className="bg-[#514ED8] text-white w-full py-3 rounded-lg"
            disabled={!user || isPending}
            type="submit"
          >
            {isPending ? "Submitting..." : "Submit Query"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
