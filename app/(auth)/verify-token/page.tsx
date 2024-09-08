import { verifyEmail } from "@/lib/auth";
import { getURL } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { RxCross1 } from "react-icons/rx";

type SearchParams = {
  email: string | null;
  token: string | null;
  cb?: string | null;
};

const Verify = async ({ searchParams }: { searchParams: SearchParams }) => {
  if (!searchParams.token) {
    return (
      <div className="min-h-[70vh] center flex-col mt-24 text-white">
        <RxCross1 size={70} className="text-red-500 fill-red-500 mb-4" />
        <h2 className="text-3xl center">
          <span> Invalid URL </span>
        </h2>
      </div>
    );
  }

  const res = await verifyEmail(searchParams.token);

  if (res.success) {
    redirect(`${getURL()}/login`);
  }

  // <div className="min-h-[70vh] center flex-col mt-24 text-white">
  //     <RxCheck size={70} className="text-green-500 fill-green-500 mb-4" />
  //     <h2 className="text-3xl center">
  //         {
  //             res.message ?? 'Your email has been verified successfully.'
  //         }
  //     </h2>

  //     <Link href="/login" className="mt-7">
  //         {/* <button className=""> Login </button> */}
  //         <button className="px-7 py-2 rounded-full bg-blue-500 text-white">
  //             Login Now
  //         </button>
  //     </Link>

  // </div>

  return (
    <div className="min-h-[70vh] center flex-col mt-24 text-white">
      <RxCross1 size={70} className="text-red-500 fill-red-500 mb-4" />
      <h2 className="text-3xl center">
        <span> {res.message} </span>
      </h2>
    </div>
  );
};

export default Verify;
