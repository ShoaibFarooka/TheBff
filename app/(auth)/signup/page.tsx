import Auth from "@/components/Auth";
import { Suspense } from "react";

const page = () => (
  <Suspense
    fallback={
      <div className="center">
        <div className="loader">Loading..</div>
      </div>
    }
  >
    {" "}
    <Auth signup />{" "}
  </Suspense>
);

export default page;
