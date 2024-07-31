"use client";
import { useAuth } from "@/hooks/auth";
import { saveEventInDB } from "@/lib/calendly/utils";
import { getServerData } from "@/lib/utils";
import { CoachType } from "@/models/coach";
import { useTransition } from "react";
import { PopupButton, useCalendlyEventListener } from "react-calendly";
import toast from "react-hot-toast";

type Props = {
  coach: CoachType;
  setIsLoading: (isLoading: boolean) => any;
};

const CalendlyModal: React.FC<Props> = ({ coach, setIsLoading }) => {
  const { user } = useAuth();
  const [_, startTransition] = useTransition();

  useCalendlyEventListener({
    async onEventScheduled(e) {
      // get the event details form calendly api and save it to the database along with user email and coach email
      const tid = toast.loading("Saving event details...");
      setIsLoading(true);
      try {
        const eventUrl = e.data.payload.event.uri;

        const res = await getServerData(startTransition, async () =>
          saveEventInDB(eventUrl, coach.email)
        );

        if (res.error) {
          toast.error(res.error, { id: tid });
          return;
        }

        toast.success("Event details saved successfully.", { id: tid });
      } catch (error) {
        console.error(error);
        toast.error("Failed to save event details.", { id: tid });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <PopupButton
      text="Book a slot"
      url={coach.calendarLink}
      rootElement={document.getElementById("book") as HTMLElement}
      className="bg-[#FED25B] px-7 py-2 rounded-md"
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
  );
};

export default CalendlyModal;
