"use client";
import { PopupButton, useCalendlyEventListener } from "react-calendly";
import React from "react";
import { useRouter } from "next/navigation";

const BookSlot = ({ url, user }: { url: string; user: any }) => {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const iframe = React.useRef<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (ref.current) {
      setShow(true);
    }
  }, [ref]);

  //   React.useEffect(() => {
  //     if (buttonRef.current) {
  //       console.log(buttonRef.current);
  //     }
  //   }, [buttonRef]);

  //  check when the ifram is present in document and it's loaded
  // React.useEffect(() => {

  const handleSubmit = (e: any) => {
    // router.refresh()
    console.log(e);
  };

  useCalendlyEventListener({
    onEventScheduled(e) {
      handleSubmit(e);
    },
  });

  return (
    <>
      <div id="book" ref={ref} style={{ zIndex: 10000 }}></div>

      {show && (
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
            guests: ["siddiquiaffan201@gmail.com"],
          }}
        />
      )}
    </>
  );
};

export default BookSlot;
