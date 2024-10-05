import { Suspense } from "react";
import Onboarding from "./Onboarding";

const OnboardingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="center">
          <div className="loader">Loading..</div>
        </div>
      }
    >
      <Onboarding />
    </Suspense>
  );
};

export default OnboardingPage;
