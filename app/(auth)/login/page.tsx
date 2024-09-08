import Login from "@/components/auth/Login";
import { Suspense } from "react";

const page = () => {
  // throw new Error('You can not signup now.')

  return (
    <Suspense
      fallback={
        <div className="center">
          <div className="loader">Loading..</div>
        </div>
      }
    >
      {/* <Auth /> */}
      <Login />
    </Suspense>
  );
};

export default page;
