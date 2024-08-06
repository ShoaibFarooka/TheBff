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
        getCoaches({ programIds: subscriptions.map((s) => s.plan.program) })
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
  }, [coaches, isModalOpen]);

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

  if (
    !subscriptions?.length
  ) {
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
      </div>
    );

  return (
    <>
      {/* This is necessary for calendly modal */}
      <div id="book" ref={ref} style={{ zIndex: 10000 }}></div>

      <div className="center h-full">
        <Button onClick={() => setIsModalOpen(true)}>Book a slot</Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md center z-50">
          <div className="relative py-5 rounded-md bg-gradient-to-r to-[#4A2F70] from-[#344363] md:min-w-[80vw] overflow-auto md:max-h-[85vh] z-50">
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
                <p className="text-gray-500">Fetching coach details...</p>
              </div>
            )}

            {!isPending && !coaches.length && (
              <div className="flex items-center justify-center">
                <p className="text-neutral-200">
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
                  Select a coach to book a slot
                </p>

                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
                    {coaches.map((coach, i) => (
                      <Card
                        key={`coach-${i}`}
                        className="col-span-1 mx-auto w-80 mt-10 py-6 px-8 bg-white shadow-lg rounded-lg dark:bg-zinc-800 mb-4"
                      >
                        <div className="flex justify-center -mt-16">
                          <Avatar className="h-20 w-20 border-2 border-zinc-200 dark:border-zinc-800">
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
                            .map((id) => capitalizeFirstLetter(id))
                            .join(", ")}
                        </p>
                        {/* <div className="flex justify-center mt-4">
                          <TwitterIcon className="h-6 w-6 text-blue-500 dark:text-blue-300 mx-2" />
                            <LinkedinIcon className="h-6 w-6 text-blue-700 dark:text-blue-300 mx-2" />
                            <GithubIcon className="h-6 w-6 text-zinc-600 dark:text-zinc-50 mx-2" />
                        </div> */}
                        {/* <Button className="mt-8 w-full bg-zinc-900 text-zinc-50 rounded-md py-2 text-sm font-medium shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300">
                          Schedule a slot
                        </Button> */}
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

                        {/* <div className="text-center mt-4 text-zinc-500 dark:text-zinc-400">
                          <p>Other Helpful Info</p>
                        </div> */}
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
