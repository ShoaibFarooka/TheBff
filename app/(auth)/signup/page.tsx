import Signup from "@/components/auth/Signup";
import { Suspense } from "react";

const page = () => (
  <Suspense
    fallback={
      <div className="center">
        <div className="loader">Loading..</div>
      </div>
    }
  >
    <Signup />
  </Suspense>
);

export default page;
