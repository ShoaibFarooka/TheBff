"use client";
import Link from "next/link";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  console.log("error", error);

  return (
    <div className="min-h-[60vh] text-red-500 center flex-col mt-28">
      <div className="bg-white bg-opacity-90 backdrop-blur-md min-w-[64rem] max-w-5xl py-8 center flex-col rounded-lg">
        <h2 className="text-4xl first-letter:font-bold">
          {error.message ?? "An error has been occured."}
        </h2>

        <div className="mt-10 center gap-4">
          <button
            onClick={reset}
            className="px-5 py-2 bg-red-500 text-white rounded-md shadow"
          >
            Retry
          </button>

          <Link
            href="/"
            className="px-5 py-2 bg-blue-500 text-white rounded-md shadow"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
