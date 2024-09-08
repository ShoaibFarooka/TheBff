"use client";

import ContactForm from "@/components/ContactForm";
import ProgramFeatures from "@/components/programs/Features";
import Header from "@/components/programs/Header";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

import { useAuth, withAuth } from "@/hooks/auth";
import { Feature, Program } from "@/types/program";
import { Plan } from "@/types/subscription";
import clsx from "clsx";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Gallery from "./Gallery";

const ChoosePlan = dynamic(() => import("./plans/ChoosePlan"), {
  ssr: false,
  loading: () => <></>
});

const comparison = [
  { title: "Live Interaction Classes", standard: "Yes", premium: "Yes" },
  { title: "Frequency", standard: "18 Sessions", premium: "Unlimited" },
  { title: "Diet Assitance", standard: "No", premium: "Yes" },
  { title: "Pause Membership", standard: "No", premium: "Yes" },
  { title: "No Cost EMI", standard: "No", premium: "Yes" },
];

const btnClassName = `shadow-xl shadow-red-800/10 mx-auto rounded px-2 py-1.5 border-none outline-none bg-white text-red-500 font-semibold focus:border`;

const ComparisonIcon = ({ t }: { t: "Yes" | "No" }) => {
  if (t === "Yes")
    return (
      <IoMdCheckmarkCircleOutline
        size={23}
        className="text-3xl text-blue-400 mx-auto"
      />
    );
  if (t === "No")
    return (
      <RxCrossCircled size={23} className="text-3xl text-gray-500 mx-auto" />
    );
};

const ViewPlan = ({ toggleOverlay }: { toggleOverlay: () => any }) => {
  const authStatus = useAuth((s) => s.status);

  if (authStatus === "loading")
    return (
      <button
        type="button"
        className={clsx(btnClassName, "bg-gray-500/10 animate-pulse w-24 h-8")}
      ></button>
    );

  return authStatus === "authenticated" ? (
    <button onClick={toggleOverlay} className={btnClassName}>
      View Plans
    </button>
  ) : (
    <Link href="/login?cb=/programs">
      <button className={btnClassName}>Login to view Plans</button>
    </Link>
  );
};

interface Props {
  images?: { title: string, url: string }[];
  programs: Program[];
  plans: Plan[];
}

function Programs({ programs, images, plans }: Props) {
  const [currentProgram, setCurrentProgram] = useState<Program>(
    programs?.[0] ?? []
  );

  const [currentFeature, setCurrentFeature] = useState<Feature>(
    () => {
      return programs?.[0]?.features?.[0] ?? {}
    }
  )

  useEffect(() => {
    setCurrentFeature(() => currentProgram?.features?.[0] ?? {})
  }, [currentProgram]);


  const relatedPlans = useMemo(
    () => plans?.filter((plan) => {
      const [programId, subId] = plan.programId.split(".");
      return programId === currentProgram?.id && subId === currentFeature?.id;
    }),
    [currentProgram, currentFeature, plans]
  );

  // useDebug("===================\nplans", plans)
  // useDebug("currentProgram", currentProgram)
  // useDebug("currentFeature", currentFeature)

  // useDebug({
  //   currentProgram: currentProgram.id,
  //   currentFeature: currentFeature.id,
  //   combined: `${currentProgram.id}.${currentFeature.id}`,
  // })
  // useDebug('relatedPlans:', relatedPlans)

  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    if (!relatedPlans.length) {
      return toast.error("No plans available for the selected program");
    }
    setOverlayVisible(!overlayVisible);
  };

  return (
    <>
      <div className="mt-20 md:mt-32 flex flex-col justify-center items-center w-full relative group px-5 md:px-14">
        <h1 className="font-semibold text-center text-3xl lg:text-5xl text-[#F2BD4D] mb-12">
          {currentProgram?.name}
        </h1>

        <Header
          setCurrentProgram={setCurrentProgram}
          programs={programs ?? []}
        />
      </div>

      {
        currentProgram && <ProgramFeatures
          program={currentProgram}
          setCurrentFeature={setCurrentFeature}
        />
      }

      {/* ============================== Image Gallery ======================= */}
      {images && images.length > 0 ? <Gallery images={images ?? []} /> : null}

      {/* ============================== Pricing ======================= */}
      <div className="py-20 relative" id="pricing">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-center font-semibold text-[40px] lg:text-[72px] text-[#F2BD4D]">
            Choose Your Plan
          </h1>
          <p className="text-blue-200 text-center">
            Pick your plan for a healthy and fit new you!
          </p>

          <div className="w-full mt-10">
            <div className="w-full grid grid-cols-3 text-white/90 md:text-xl px-4 md:px-0">
              <div className="col-span-1 mb-10"> </div>
              <div className="col-span-1 mb-10 text-center">
                <h3 className="text-white text-2xl md:text-3xl font-semibold tooltip relative inline-block">
                  Standard
                </h3>
              </div>
              <div className="col-span-1 mb-10 text-center">
                <h3 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#F2BD4D] to-red-600">
                  Premium
                </h3>
              </div>

              {comparison?.map((item?: any, index?: any) => (
                <Fragment key={`cmp-${index}`}>
                  <div className="col-span-1 py-3">
                    <h3 className="tooltip relative inline-block font-bold my-2">
                      {item?.title}
                      <span className="tooltip-text absolute bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 bottom-full left-1/2 transform -translate-x-1/2 w-full transition duration-300 ease-in-out">
                        {item?.tooltip}
                      </span>
                    </h3>
                  </div>

                  <div className="col-span-1 py-3 border border-gray-400/40">
                    <ComparisonIcon t={item?.standard} />
                    <h3 className="text-center"> {item?.standard} </h3>
                  </div>

                  <div className="col-span-1 py-3 border border-gray-400/40">
                    <ComparisonIcon t={item?.premium} />
                    <h3 className="text-center"> {item?.premium} </h3>
                  </div>
                </Fragment>
              ))}

              <div className="col-span-1 py-3"></div>

              <div className="col-span-1 py-3 border border-gray-400/40 center flex-col">
                <p className="text-base md:text-xl text-center mb-2.5">
                  Starting at Rs. 1999/- month
                </p>

                {/* Disabled in alpha preview - 1 */}
                <ViewPlan toggleOverlay={toggleOverlay} />
              </div>

              <div className="col-span-1 py-3 border border-gray-400/40 center flex-col">
                <p className="text-base md:text-xl text-center mb-2.5">
                  Starting at Rs. 3499/- month
                </p>

                {/* Disabled in alpha preview - 1 */}
                <ViewPlan toggleOverlay={toggleOverlay} />
              </div>
            </div>
          </div>
        </div>

        {/* ==========OVERLAY============ */}
        {overlayVisible && (
          <ChoosePlan
            plans={relatedPlans ?? []}
            overlayVisible={overlayVisible ?? []}
            setOverlayVisible={setOverlayVisible}
            program={currentProgram ?? {}}
            feature={currentFeature ?? {}}
          />
        )}
      </div>

      <ContactForm />
    </>
  );
}

// create subscription

export default withAuth(Programs, true);
