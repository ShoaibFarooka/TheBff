"use client";

import { useAuth } from "@/hooks/auth";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

const Contact = () => {
  const { user } = useAuth();

  const mutation = api.email.sendContactRequest.useMutation({
    onMutate() {
      toast.loading("Submitting query...", {
        id: "submit-query",
      });
    },
    onSettled(data, error) {
      if (!data || error) {
        return toast.error("Failed to submit query.", {
          id: "submit-query",
        });
      }
      toast.success("Query submitted successfully.", {
        id: "submit-query",
      });
    },
  });

  const submitQuery = async (form: FormData) => {

    mutation.mutate({
      email: user?.email!,
      name: user?.name!,
      message: form.get("message") as string,
    })

  };

  return (
    <div className=" bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1">
      <h1 className="text-white text-[24px] mb-4">Contact Trainer</h1>

      <form action={submitQuery}>
        <textarea
          name="message"
          className="my-10 p-5 rounded-lg w-full text-neutral-600"
          placeholder="Type your query here"
          disabled={!user}
          required
          minLength={20}
        />

        <div className="text-center">
          <button
            className="bg-[#514ED8] text-white w-full py-3 rounded-lg"
            disabled={!user || mutation.isLoading}
            type="submit"
          >
            {mutation.isLoading ? "Submitting..." : "Submit Query"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
