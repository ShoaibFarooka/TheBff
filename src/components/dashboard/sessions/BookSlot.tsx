"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCoaches } from "@/lib/dbHelpers";
import { capitalizeFirstLetter, getServerData } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useCalendlyEventListener } from "react-calendly";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDashboardState, UserData } from "../state";
import CalendlyModal from "./CalendlyModal";

// a function which converts programId into a readable format
// Example: online-gym-training.in-home-fitness => Online Gym Training -> In Home Fitness
const convertProgramIdToReadable = (programId: string) => {
  const parts = programId.split(".");
  return parts.map(capitalizeFirstLetter).join(" -> ");
}

const BookSlot = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    coaches,
    setCoaches,
    userData = {} as UserData,
  } = useDashboardState();

  const subscriptions = useMemo(() => {
    if (!userData?.subscriptions) return [];
    return userData.subscriptions?.filter(
      (sub) => !["cancelled", "expired"].includes(sub.status)
    );
  }, [userData?.subscriptions])

  // fetch coaches
  const fetchCoaches = useCallback(async () => {
    if (coaches.length > 0) {
      return setIsModalOpen(true);
    }

    const tid = toast.loading("Fetching coach details...");

    try {
      const res = await getServerData(startTransition, async () =>
        getCoaches({ programIds: subscriptions.map((s) => s.plan?.programId) })
      );

      if (res.error) {
        return toast.error(res.error, { id: tid });
      }

      setCoaches(res);

      toast.dismiss(tid);
    } catch (error) {
      toast.error("Failed to fetch coach details.", { id: tid });
    }
  }, [subscriptions, setIsModalOpen, coaches, setCoaches]);

  useEffect(() => {
    if (!isModalOpen) return;

    if (!coaches.length) {
      fetchCoaches();
    } else {
      setIsModalOpen(true);
    }
  }, [coaches, isModalOpen, fetchCoaches]);

  const handleSubmit = (e: any) => {
    // router.refresh()
    // console.log(e);
  };

  useCalendlyEventListener({
    onEventScheduled(e) {
      handleSubmit(e);
    },
  });

  useEffect(() => {
    // disable scroll when overlay is open
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  if (!subscriptions?.length) {
    return (
      <div className="center flex-col h-full">
        <p className="text-neutral-200 text-center">
          You need to subscribe to a program to book a slot.
        </p>

        <div className="center mt-4">
          <Link href="/programs">
            <Button>Subscribe Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (userData.sessions?.length > 0)
    return (
      <div className="">
        <div id="book" ref={ref} style={{ zIndex: 10000 }}></div>

        <h1 className="text-xl md:text-3xl font-bold text-center text-neutral-100">
          Upcoming Sessions
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 text-neutral-100 mt-4">
          {userData.sessions.map((session, i) => (
            <div key={`session-${i}`} className="col-span-1 p-2">
              {/* Session details, date, time, joining link */}
              {new Date(session.startTime).toLocaleDateString()}
              <br />
              {new Date(session.startTime).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "numeric",
              })}{" "}
              to{" "}
              {new Date(session.endTime).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "numeric",
              })}
              <a href={session.meetLink} target="_blank">
                <Button>Join Meeting</Button>
              </a>
            </div>
          ))}
        </div>

        {/* Book another slot */}
        <div className="center mt-4">
          <Button onClick={() => setIsModalOpen(true)} className="animate-vibrate hover:animate-none">Book a slot</Button>
        </div>

      </div>
    );

  return (
    <>
      {/* This is necessary for calendly modal */}
      <div id="book" ref={ref} style={{ zIndex: 10000 }}></div>

      <div className="center flex-col gap-4 h-full">
        <h2 className="text-xl md:text-3xl font-bold text-center text-neutral-100">
          Book a slot to continue!
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="animate-vibrate hover:animate-none">Book a slot</Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md center z-20">
          <div className="relative py-16 rounded-md gradient-bg min-w-[80vw] overflow-auto max-h-[85vh] custom-scroll-bar">
            <div className="absolute right-4 top-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-primary text-neutral-400 p-0.5 rounded-lg border-2 border-transparent hover:border-neutral-400"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>

            {isPending && (
              <div className="flex items-center justify-center">
                <p className="text-gray-300">Fetching coach details...</p>
              </div>
            )}

            {!isPending && !coaches.length && (
              <div className="flex items-center justify-center">
                <p className="text-neutral-200 text-lg">
                  No coaches found for your subscriptions. Please try again
                  later.
                </p>
              </div>
            )}

            {!isPending && coaches.length > 0 && (
              <>
                <h1 className="text-xl md:text-3xl font-bold text-center text-neutral-100">
                  Book a slot
                </h1>
                <p className=" text-neutral-100 text-center">
                  Select a coach to continue.
                </p>

                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
                    {coaches.map((coach, i) => (
                      <Card
                        key={`coach-${i}`}
                        className="col-span-1 mx-auto w-80 mt-10 py-6 px-8 bg-white shadow-lg rounded-lg dark:bg-zinc-800 mb-4"
                      >
                        <div className="flex justify-center -mt-[4.6rem]">
                          <Avatar className="h-24 w-24 bg-zinc-50/80 backdrop-blur-md dark:border-zinc-800 p-2">
                            <AvatarImage
                              src={coach.profileImage}
                            />
                            <AvatarFallback className="capitalize">
                              {coach.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <h2 className="text-2xl font-semibold text-center text-zinc-600 mt-2 dark:text-zinc-50">
                          {coach.name}
                        </h2>
                        <p className="text-center text-zinc-500 mt-2 dark:text-zinc-400">
                          {coach.programIds
                            .filter((pid) =>
                              subscriptions.some(
                                (s) => s.plan?.programId === pid
                              )
                            )
                            .map(convertProgramIdToReadable)
                            .join(", ")}
                        </p>
                        <div className="center mt-4">
                          {isLoading ? (
                            <p className="text-gray-500">Loading...</p>
                          ) : (
                            <CalendlyModal
                              coach={coach}
                              setIsLoading={setIsLoading}
                            />
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* {show && (
        <PopupButton
          text="Book a slot"
          url={url}
          rootElement={document.getElementById("book") as HTMLElement}
          className="bg-[#FED25B] px-7 py-2 rounded"
          pageSettings={{
            hideLandingPageDetails: true,
            hideEventTypeDetails: true,
            hideGdprBanner: true,
          }}
          prefill={{
            email: user.email,
            name: user.name,
            date: new Date(),
            customAnswers: {
              a1: "91" + user.phone,
              a2: "91" + user.phone,
            },
          }}
        />
      )} */}
    </>
  );
};

export default BookSlot;
