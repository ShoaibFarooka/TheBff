import React, { useEffect, useState } from 'react';
import { Modal, Select, DatePicker, message, Flex } from 'antd';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { CheckCircleOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { getAuthUser } from '@/lib/auth';

import customParseFormat from "dayjs/plugin/customParseFormat";
import UserSessionModal from '@/components/TrainerDashboard/TrainerDashboardComponents/UserSessionsModal';

dayjs.extend(customParseFormat);

const { Option } = Select;

interface Subscription {
  id: string;
  programId: string;
  plan: {}
  // Add other properties if needed
}
interface Plan {
  _id: string;
  name: string;
  interval: number;
  period: string
  features: string[];
  programId: string;
  // Add other properties if needed
}

interface Session {
  _id: string;
  planId: Plan;
  startDate: string;
  endDate: string;
  programId: string;
  days: [];
  userId: string;
  subscriptionId: string;
  trainerAssigned: boolean;
  trainerId: {
    _id: string;
    currentAddress: {}
  };
  sessions: Array<{
    sessionNumber: string;
    date: string;
    day: string;
    status: string; 
    can_be_completed: boolean;
    timeSlot: string;
  }>;
}


const BookSessionSlot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: "", email: "" })
  const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);
  const [selectedSubscription, setSelectedSubcription] = useState([]);
  const [daysCount, setDaysCount] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const [plan, setPlan] = useState<Partial<Plan>>({});
  const [bookedSlots, setBookedSlots] = useState<Session[]>([]);
  const [selectedBookedSlot, setSelectedBookedSlot] = useState<Session>();
  const [rescheduleModal, setRescheduleModal] = useState<boolean>();
  const [rescheduleTime, setRescheduleTime] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [userSessionModal, setUserSessionModal] = useState(false);

  const getUserSubscriptions = async ({ id }: { id: string }) => {
    try {
      const sessionResponse = await fetch(`/api/sessions/get-user-sessions?id=${id}`, {
        method: "GET",
      });
      const sessionData = await sessionResponse.json();
      if (sessionResponse.status === 200) {
        setBookedSlots(sessionData?.data)
      }
      const res = await fetch(`/api/subscriptions/user-subscriptions?id=${id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.status === 200) {
        const subscriptions = data?.data?.map((subscription : any) => {
          return {
            id: subscription?._id,
            programId: subscription?.programId,
            plan: subscription?.planId,
          }
        })
        const filteredSubscriptions: Subscription[] = subscriptions.filter((subscription: Subscription) => {
          return !sessionData?.data?.some((slot: Session) => slot?.planId?.programId === subscription?.programId);
        });
        
        setUserSubscriptions(filteredSubscriptions);
        
        return data.data; 
      } else {
        toast.error(data.message ?? "Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching user subscriptions:", error);
    }
  };

  const setAuthUser = async() => {
    const res = await getAuthUser()
    setCurrentUser(res?.user)
    getUserSubscriptions({id: res?.user?._id});
  }

  useEffect(() => {
    setAuthUser();
  }, [])

  useEffect(() => {
    setSelectedBookedSlot(bookedSlots[0]);
  }, [bookedSlots])

  const days = [
    { display: "Monday", value: "monday" },
    { display: "Tuesday", value: "tuesday" },
    { display: "Wednesday", value: "wednesday" },
    { display: "Thursday", value: "thursday" },
    { display: "Friday", value: "friday" },
    { display: "Saturday", value: "saturday" },
    { display: "Sunday", value: "sunday" }
  ];
  

  const timeSlots = [
    { display: '12:00 AM - 01:00 AM', value: '00:00-01:00' },
    { display: '01:00 AM - 02:00 AM', value: '01:00-02:00' },
    { display: '02:00 AM - 03:00 AM', value: '02:00-03:00' },
    { display: '03:00 AM - 04:00 AM', value: '03:00-04:00' },
    { display: '04:00 AM - 05:00 AM', value: '04:00-05:00' },
    { display: '05:00 AM - 06:00 AM', value: '05:00-06:00' },
    { display: '06:00 AM - 07:00 AM', value: '06:00-07:00' },
    { display: '07:00 AM - 08:00 AM', value: '07:00-08:00' },
    { display: '08:00 AM - 09:00 AM', value: '08:00-09:00' },
    { display: '09:00 AM - 10:00 AM', value: '09:00-10:00' },
    { display: '10:00 AM - 11:00 AM', value: '10:00-11:00' },
    { display: '11:00 AM - 12:00 PM', value: '11:00-12:00' },
    { display: '12:00 PM - 01:00 PM', value: '12:00-13:00' },
    { display: '01:00 PM - 02:00 PM', value: '13:00-14:00' },
    { display: '02:00 PM - 03:00 PM', value: '14:00-15:00' },
    { display: '03:00 PM - 04:00 PM', value: '15:00-16:00' },
    { display: '04:00 PM - 05:00 PM', value: '16:00-17:00' },
    { display: '05:00 PM - 06:00 PM', value: '17:00-18:00' },
    { display: '06:00 PM - 07:00 PM', value: '18:00-19:00' },
    { display: '07:00 PM - 08:00 PM', value: '19:00-20:00' },
    { display: '08:00 PM - 09:00 PM', value: '20:00-21:00' },
    { display: '09:00 PM - 10:00 PM', value: '21:00-22:00' },
    { display: '10:00 PM - 11:00 PM', value: '22:00-23:00' },
    { display: '11:00 PM - 12:00 AM', value: '23:00-00:00' },
  ];

  const handleSubscriptionChange = (value: any) => {  
    const plan: Plan = userSubscriptions.find(
      (subscription: any) => subscription.id === value
    )?.plan as Plan;
    
    const feature = plan?.features?.[0] ?? null;
    const match = feature.match(/(\d+)x/);
    const number: number = (match ? match[1] : 0) as number;
    setDaysCount(number);

    setPlan(plan || {})
    setSelectedSubcription(value);
  }

  const handleDateChange = (date : any) => {
    setSelectedDate(date ? dayjs(date).format('YYYY-MM-DD') : null);
  };

  const handleTimeSlotChange = (value : any) => {
    setSelectedTimeSlot(value);
  };

  const handleDaysChange = (days: any) => {
    if (days.length <= daysCount) {
      setSelectedDays(days);
    } else {
      message.warning(`You can only select up to ${daysCount} days`);
    }
  }

  const isValidPeriod = (period: any): period is 'daily' | 'weekly' | 'monthly' | 'yearly' => {
    return ["daily", "weekly", "monthly", "yearly"].includes(period);
  };

  function caclulateEndDate({
    startDate = new Date(),
    period,
    interval
  }: {
    startDate?: Date;
    period: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
  }) {
    const endDate = new Date(startDate);
  
    // till 11:59:59 PM
    endDate.setHours(23, 59, 59, 999);
  
    switch (period) {
      case "daily":
        endDate.setDate(endDate.getDate() + interval);
        break;
      case "weekly":
        endDate.setDate(endDate.getDate() + interval * 7);
        break;
      case "monthly":
        endDate.setMonth(endDate.getMonth() + interval);
        break;
      case "yearly":
        endDate.setFullYear(endDate.getFullYear() + interval);
        break;
    }
  
    return endDate;
  }

  const createSession = async (obj : any) => {
    try {
      const res = await fetch(`/api/sessions/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj), 
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error Creating Session:", error);
    }
  };

  const dayMapping: { [key: string]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  
  const daysDifference = (startDate : any, targetDay: any) => {
    const startDayIndex = dayjs(startDate).day(); // Numeric representation of the start date (0 = Sunday, ..., 6 = Saturday)
    const targetDayIndex = dayMapping[targetDay]; // `selectedDays` is expected to contain numeric day representations (0 = Sunday, ..., 6 = Saturday)
  
    const difference = targetDayIndex - startDayIndex;

    return difference >= 0 ? difference : 7 + difference;
  };

  const handleSubmit = async () => {
    setSubmitLoading(true)
    if (!isScheduled) {
      if (!selectedDate || !selectedSubscription || !selectedTimeSlot || !selectedDays) {
        message.error("Required Field Missing");
        setSubmitLoading(false)
        return;
      }
  
      if (selectedDays.length < daysCount) {
        message.error(`You Need to Select ${daysCount} days`);
        setSubmitLoading(false)
        return;
      }
  
      const startDate = new Date(selectedDate);
  
      // Calculate end date
      const endDate = caclulateEndDate({
        startDate,
        period: isValidPeriod(plan?.period) ? plan.period : "daily", // Provide a default period if needed
        interval: plan?.interval || 1, // Provide a default interval if needed
      });
      const endDateFormatted = dayjs(endDate).format("YYYY-MM-DD");
  
      const totalSessions = daysCount * 4 * (plan?.interval || 1);
  
      // Create the array of session objects
      let tempStartDate = dayjs(startDate);
      const sessions = Array.from({ length: totalSessions }, (_, index) => {
        if (index !== 0 && index % selectedDays.length === 0) {
          tempStartDate = dayjs(tempStartDate).add(7, "day");
        }
  
        const cycleIndex = index % selectedDays.length;
  
        const daysAdjustments = daysDifference(startDate, selectedDays[cycleIndex]); // Calculate the days to add
        const adjustedDate = tempStartDate.add(daysAdjustments, "day").toDate(); // Use Date object here for API compatibility
  
        return {
          sessionNumber: index + 1,
          day: selectedDays[index % selectedDays.length], // Distributes days cyclically if needed
          date: adjustedDate,
          status: "pending",
          can_be_completed: index === 0, // true only for sessionNumber 1 (index 0)
          timeSlot: selectedTimeSlot,
        };
      });
  
      try {
        // Call the API to generate event IDs and Meet links for the sessions
        const eventIdResponse = await fetch("/api/meet/generate-events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numberOfSessions: totalSessions,
            sessions: sessions,
            userEmail: currentUser?.email,
            trainerEmail: "trainer@example.com", // Replace with the actual trainer email
            isOnline: selectedBookedSlot?.planId?.name?.toLowerCase().includes("online"),
          }),
        });
  
        const { success, data: events, message: apiMessage } = await eventIdResponse.json();
  
        if (!success || !events || events.length !== totalSessions) {
          throw new Error(apiMessage || "Failed to generate event IDs and Meet links");
        }
  
        // Merge event IDs and Meet links into sessions
        const updatedSessions = sessions.map((session, index) => ({
          ...session,
          eventId: events[index]?.eventId, // Always assign eventId
          ...(selectedBookedSlot?.planId?.name?.toLowerCase().includes("online") && { meetLink: events[index]?.meetLink || null }), // Append meetLink only if isOnline is true
        }));        
  
        // Prepare the object for session creation
        const obj = {
          subscriptionId: selectedSubscription,
          startDate: selectedDate,
          endDate: endDateFormatted,
          planId: plan?._id,
          userId: currentUser?._id,
          trainerAssigned: false,
          timeSlot: selectedTimeSlot,
          days: selectedDays,
          sessions: updatedSessions, // Include sessions with event IDs and Meet links here
        };
  
        console.log(updatedSessions);
  
        // Call the API to save the sessions (uncomment if the API exists)
        const data = await createSession(obj);
        if(data?.success){
          toast.success("Your Session has been booked !");
        }
        setIsScheduled(true);
        setSubmitLoading(false)
      } catch (error: any) {
        setSubmitLoading(false)
        message.error(error.message || "An error occurred while scheduling sessions.");
      }
    }
  
    // Reset form state
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setIsScheduled(false);
    setIsModalOpen(false);

    setSelectedSubcription([])
    setSelectedDays([])

  };
  
  
  
  const getUpcommingSession = (slot: Session) => {
    const currentDate = new Date();
  
    // Filter sessions to find those that are in the future
    const futureSessions = slot.sessions.filter((session: any) => {
      const sessionDate = dayjs(session.date).toDate(); // Parse session date directly
      return sessionDate > currentDate && session.status.toLowerCase() === "pending";
    });
  
    // Sort the future sessions by date in ascending order
    const sortedFutureSessions = futureSessions.sort(
      (a: any, b: any) =>
        dayjs(a.date).toDate().getTime() - dayjs(b.date).toDate().getTime()
    );
  
    // Return null if no sessions are found
    if (sortedFutureSessions.length === 0) return null;
  
    // Get the first session (upcoming session)
    const nextSession = sortedFutureSessions[0];
  
    return nextSession;
  };  
  const getUpcommingSessionDate = (slot: Session) => {
    const currentDate = new Date();
  
    // Filter sessions to find those that are in the future and not cancelled
    const futureSessions = slot?.sessions?.filter((session: any) => {
      const sessionDate = dayjs(session.date).toDate(); // Parse session date directly
      return sessionDate > currentDate && session.status.toLowerCase() === "pending";
    });
  
    // Sort the future sessions by date in ascending order
    const sortedFutureSessions = futureSessions.sort(
      (a: any, b: any) =>
        dayjs(a.date).toDate().getTime() - dayjs(b.date).toDate().getTime()
    );
  
    // Return null if no sessions are found
    if (sortedFutureSessions.length === 0) return "Sessions Completed";
  
    // Get the first session (upcoming session)
    const nextSession = sortedFutureSessions[0];
    const sessionDate = dayjs(nextSession.date).toDate();
  
    // Format the date as "Mon, Oct 12th"
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(sessionDate);
  
    // Add the ordinal suffix for the day (e.g., "12th")
    const dayWithOrdinal = dayjs(sessionDate).format("Do"); // Requires `dayjs/plugin/customParseFormat`
  
    // Extract time from timeSlot
    const timeSlot = nextSession.timeSlot; // Example: "7:00 - 8:00"
    const time = timeSlot.split(" - ")[0]; // Extract the time before "-"
  
    // Combine the formatted date and time
    return `${formattedDate.replace(/\d+/, dayWithOrdinal)} on ${time}`;
  };  
  
  const cancelSession = async () => {
    try {
      const lastSession = selectedBookedSlot?.sessions?.[selectedBookedSlot?.sessions.length - 1];
  
      if (!lastSession) {
        console.error("No sessions available.");
        return;
      }
  
      const lastDay = lastSession.day; // e.g., "Thursday"

      if (selectedBookedSlot?.days?.length === 0) {
        console.error("sessionDays is empty.");
        return;
      }

      let currentDay = lastDay; // Start with the last day
  
      // Days array for calculating day indices
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      const currentDayIndexInWeek = days.findIndex(day => day === currentDay);
  
      // Calculate the next day index (wraps around to the start of the array if it's the last day)
      const currentDayIndex = selectedBookedSlot?.days?.findIndex(day => day === currentDay);
      const nextDayIndex = (currentDayIndex + 1) % selectedBookedSlot?.days.length;
  
      // Get the next day from the array
      const nextDay = selectedBookedSlot?.days[nextDayIndex];
      const nextDayIndexInWeek = days.findIndex(day => day === nextDay);
  
      const dayDifference = (nextDayIndexInWeek - currentDayIndexInWeek + days.length) % days.length;
  
      dayjs.extend(customParseFormat);
      const parsedDate = dayjs(lastSession.date, "DD-MM-YYYY");
  
      const nextSessionDate = dayjs(parsedDate)
        .add(dayDifference, "day")
        .format("DD-MM-YYYY");
  
      // Prepare the request payload
      const requestBody = {
        trainerId: selectedBookedSlot?.trainerId?._id,
        userId: selectedBookedSlot?.userId,
        subscriptionId: selectedBookedSlot?.subscriptionId,
        sessionNumber: lastSession.sessionNumber + 1,
        nextDay: nextDay,
        date: nextSessionDate,
        currentSessionNumber: getUpcommingSession(selectedBookedSlot as Session)?.sessionNumber
      };

      // API Call
      const res = await fetch(`/api/sessions/cancel-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await res.json();
  
      if (res.status === 200 && data.success) {
        toast.success("Session Cancelled!");
        if (data?.session) {
          const updatedSlot = { ...data?.session };

          updatedSlot.trainerId = data?.trainerDetails;
          updatedSlot.planId = data?.plan

          setSelectedBookedSlot(updatedSlot);
        }
      } else {
        toast.error(data.message || "Failed to update session.");
      }
    } catch (error) {
      console.error("Error while canceling/rescheduling the session:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }; 

  const rescheduleSession = async () => {
    if (!rescheduleTime) {
      setRescheduleModal(true);
      return;
    }
  
    try {
      // Update the session's time slot in the backend
      const res = await fetch(`/api/sessions/reschedule-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trainerId: selectedBookedSlot?.trainerId?._id,
          userId: selectedBookedSlot?.userId,
          subscriptionId: selectedBookedSlot?.subscriptionId,
          sessionNumber: getUpcommingSession(selectedBookedSlot as Session)?.sessionNumber,
          newTimeSlot: rescheduleTime,
        }),
      });
  
      const data = await res.json();
      if (res.status === 200 && data.success) {
        if (data?.session) {
          const updatedSlot = { ...data?.session };

          updatedSlot.trainerId = data?.trainerDetails;
          updatedSlot.planId = data?.plan;

          setSelectedBookedSlot(updatedSlot);
        }
        
        toast.success("Session rescheduled successfully!");
      } else {
        toast.error(data.message || "Failed to reschedule session.");
      }
    } catch (error) {
      console.error("Error rescheduling session:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {!bookedSlots?.length ? (
        <div className="center flex-col gap-4 h-full">
          <h2 className="text-xl md:text-3xl font-bold text-center text-neutral-100">
            Book a slot to continue!
          </h2>
          <Button onClick={() => setIsModalOpen(true)} className="animate-vibrate hover:animate-none">
            Book a slot
          </Button>
        </div>
      ) : (
        <>
          <UserSessionModal
            userSessionModal={userSessionModal} 
            setUserSessionModal={setUserSessionModal}
            trainerId={selectedBookedSlot?.trainerId?._id || ""}
            userId={currentUser?._id || ""}
            subscriptionId={selectedBookedSlot?.subscriptionId}
          />
          <Modal
            open={rescheduleModal}
            title={
              <h3 style={{ background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)', color: 'white' }}>
                Please Select the time to reschedule
              </h3>
            } 
            onCancel={() => {   
              setRescheduleModal(false);
              setRescheduleTime("")
            }}
            onOk={() => {   
              setRescheduleModal(false);
              setRescheduleTime("");
              rescheduleSession()
            }}
            styles={{
              content: {  background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)' }, // turns the Modal red
            }}
            width={700}
            style={{width: "700px", marginTop: "250px"}}
          >
            <Select
              placeholder="Select Time"
              style={{ width: '100%', margin: '10px 0' }}
              onChange={(value) => setRescheduleTime(value)}
              value={rescheduleTime || undefined} // Ensure placeholder is shown when no value is selected
            >
              {timeSlots.map((timeSlot, index) => (
                <Option key={index} value={timeSlot.value}>
                  {timeSlot.display}
                </Option>
              ))}
            </Select>
          </Modal>
          <Flex style={{justifyContent: "space-between", marginBottom: "10px"}}>
            <span className="text-2xl font-bold">{"Scheduled Session"}</span>
            <Flex style={{justifyContent: "space-between", width: "50%"}} gap={8}>
              <Select
                className='w-3/5 '
                placeholder="Select Booked Session"
                style={{ height: "38px" }}
                value={selectedBookedSlot?._id}
                onChange={(value) => {
                  const selectedSlot = bookedSlots.find((slot) => slot._id === value) || ({} as Session);
                  setSelectedBookedSlot(selectedSlot);
                }}                
              >
                {bookedSlots.map((slot : any, index) => (
                  <Option key={index} value={slot._id}>
                    {slot.planId.programId}
                  </Option>
                ))}
              </Select>
              <Button
                className="text-white w-2/5 rounded-lg border border-white bg-transparent hover:bg-white hover:text-[#514ED8]"
                onClick={() => setUserSessionModal(true)}
              >
                Show Sessions
            </Button>
            </Flex>
          </Flex>
          {selectedBookedSlot?.trainerAssigned ? 
            <Flex gap={4} vertical>
              <>
              <Flex style={{justifyContent: "space-between"}}>
                <span>{selectedBookedSlot?.planId?.name}</span>
                <span>{ selectedBookedSlot ? getUpcommingSessionDate(selectedBookedSlot) : null}</span>
              </Flex>
              <div className="border-t border-dashed border-white w-full mt-3 mb-3"></div>
              {!(selectedBookedSlot?.planId?.name?.toLowerCase().includes("online") || 
                selectedBookedSlot?.planId?.programId?.toLowerCase().includes("online")) ? (
                  <Flex gap={8}>
                    <EnvironmentOutlined style={{ fontSize: "16px", color: "#fff" }} />
                    <span>
                      {selectedBookedSlot?.trainerId?.currentAddress
                      ? Object.values(selectedBookedSlot?.trainerId?.currentAddress).join(', ')
                      : 'No Address'}
                    </span>
                  </Flex>
                ) : null}
              <Flex gap={8}>
                <ClockCircleOutlined style={{ fontSize: "16px", color: "#fff" }} />
                <span>{"60 mins"}</span>
              </Flex> 
              {selectedBookedSlot?.planId?.name?.toLowerCase().includes("online") || 
                selectedBookedSlot?.planId?.programId?.toLowerCase().includes("online") ? (
                  <Button className="bg-[#514ED8] text-white w-full py-3 rounded-lg mt-5">Join Session</Button>
                ) : null}

              <div className="border-t border-dashed border-white w-full mt-3 mb-3"></div>
              <Flex gap={8}>
                <Button
                  className="text-white w-full py-3 rounded-lg mt-5 border border-white bg-transparent hover:bg-white hover:text-[#514ED8]"
                  onClick={() => setRescheduleModal(true)}
                >
                  Reschedule
                </Button>
                <Button
                  className="text-red-500 w-full py-3 rounded-lg mt-5 bg-transparent hover:bg-red-500 hover:text-white"
                  style={{ border: "none" }}
                  onClick={cancelSession}
                >
                  Cancel Session
                </Button>
              </Flex>
              </>
            </Flex> : 
            <div className="flex justify-center items-center">
              <span className="text-2xl font-bold">Trainer is not yet assigned</span>
            </div>
            
            }
          <div className="center mt-2">
            <Button onClick={() => setIsModalOpen(true)} className="bg-[#514ED8] text-white w-full py-3 rounded-lg mt-5">
              Book a New Slot
            </Button>
          </div>
        </>
      )}

      <Modal
        open={isModalOpen}
        confirmLoading={submitLoading}
        title={
          !isScheduled ? (
            <h3 style={{ background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)', color: 'white' }}>
              When would you like to schedule ?
            </h3>
          ) : null
        }        
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        styles={{
          content: {  background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)' }, // turns the Modal red
        }}
        style={{
          marginTop: "175px"
        }}
      >
        {!isScheduled && <>
          <Select
            value={selectedSubscription}
            placeholder="Select Subscription"
            style={{ width: '100%', margin: '10px 0' }}
            onChange={handleSubscriptionChange}
          >
            {userSubscriptions.map((subscription : any, index) => (
              <Option key={index} value={subscription.id}>
                {subscription.programId}
              </Option>
            ))}
          </Select>
          <DatePicker
            placeholder="Select Date"
            style={{ width: '100%', margin: '10px 0' }}
            onChange={handleDateChange}
            value={selectedDate ? dayjs(selectedDate) : null}
          />
          <Select
            placeholder="Select Time"
            style={{ width: '100%', margin: '10px 0' }}
            onChange={handleTimeSlotChange}
            value={selectedTimeSlot}
          >
            {timeSlots.map((timeSlot, index) => (
              <Option key={index} value={timeSlot.value}>
                {timeSlot.display}
              </Option>
            ))}
          </Select>
          <Select
            mode="multiple"
            placeholder="Select Days"
            value={selectedDays}
            onChange={handleDaysChange}
            style={{ width: '100%', margin: '10px 0' }}
          >
            {days.map((day) => (
              <Option key={day.value} value={day.value}>
                {day.display}
              </Option>
            ))}
          </Select>
        </>}
        {isScheduled && (
          <div className="confirmation-message flex flex-col items-center justify-center gap-4 p-6 mt-6 text-center rounded-md">
            <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
            <h2 className="text-2xl font-semibold text-white">Your session has been rescheduled!</h2>
            <p className="text-lg text-white">
              <strong>Subscription:</strong> {userSubscriptions.find((subscription : any) => subscription.id === selectedSubscription)?.programId}
            </p>
            <p className="text-lg text-white">
              <strong>Date:</strong> {selectedDate}
            </p>
            <p className="text-lg text-white">
              <strong>Time Slot:</strong> {timeSlots.find(slot => slot.value === selectedTimeSlot)?.display}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BookSessionSlot;
