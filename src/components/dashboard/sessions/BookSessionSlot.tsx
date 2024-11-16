import React, { useEffect, useState } from 'react';
import { Modal, Select, DatePicker, message, Flex } from 'antd';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { CheckCircleOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { getAuthUser } from '@/lib/auth';
import subscriptions from 'razorpay/dist/types/subscriptions';

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
  // Add other properties if needed
}

interface Session {
  _id: string;
  planId: Plan;
  startDate: string;
  endDate: string;
  programId: string;
}

const BookSessionSlot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: "" })
  const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);
  const [selectedSubscription, setSelectedSubcription] = useState([]);
  const [daysCount, setDaysCount] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const [plan, setPlan] = useState<Partial<Plan>>({});
  const [bookedSlots, setBookedSlots] = useState<Session[]>([]);



  const getUserSubscriptions = async ({ id }: { id: string }) => {
    try {
      const sessionResponse = await fetch(`/api/sessions/get-user-sessions?id=${id}`, {
        method: "GET",
      });
      const sessionData = await sessionResponse.json();
      if (sessionResponse.status === 200) {
        setBookedSlots(sessionData?.data)
        return sessionData.data; 
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
        console.log(bookedSlots)
        const filteredSubscriptions: Subscription[] = subscriptions.filter((subscription: Subscription) => {
          return !sessionData?.data?.some((slot: Session) => slot.programId === subscription.programId);
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
    } catch (error) {
      console.error("Error Creating Session:", error);
    }
  };
  

  const handleSubmit = async() => {
    if(!isScheduled){
      if (!selectedDate || !selectedSubscription || !selectedTimeSlot || !selectedDays) {
        message.error("Required Field Missing");
        return;
      }

      if(selectedDays.length < daysCount) {
        message.error(`You Need to Seleect ${daysCount} days`);
        return;
      }
      
      const startDate = new Date(selectedDate);

      // Then call your function
      const endDate = caclulateEndDate({ 
        startDate, 
        period: isValidPeriod(plan?.period) ? plan.period : 'daily', // Provide a default period if needed
        interval: plan?.interval || 1     // Provide a default interval if needed
      });
      const endDateFormatted = dayjs(endDate).format("YYYY-MM-DD")

      const obj = {
        subscriptionId : selectedSubscription,
        startDate : selectedDate,
        endDate: endDateFormatted,
        planId : plan?._id,
        userId: currentUser?._id,
        trainerAssigned: false,
        timeSlot: selectedTimeSlot,
        days: selectedDays
      }

      const res = await createSession(obj);
      setIsScheduled(true)
      return
    }

    setSelectedDate(null)
    setSelectedTimeSlot("")
    setIsScheduled(false)
    setIsModalOpen(false);
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
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "16px", // Adjust size as needed
                }}
              >
                {"Subscription Name"}
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "16px", // Adjust size as needed
                }}
              >
                {"Start Date - End Date"}
              </div>
            </div>
            {bookedSlots.map((session) => (
              <div
                key={session._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>{session.planId.name}</div>
                <div>
                  {`${dayjs(session.startDate).format("DD-MM-YYYY")} - ${dayjs(session.endDate).format("DD-MM-YYYY")}`}
                </div>
              </div>
            ))}
          </div>
          <div className="center mt-2">
            <Button onClick={() => setIsModalOpen(true)} className="animate-vibrate hover:animate-none">
              Book a slot
            </Button>
          </div>
        </>
      )}

      <Modal
        open={isModalOpen}
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
          />
          <Select
            placeholder="Select Time"
            style={{ width: '100%', margin: '10px 0' }}
            onChange={handleTimeSlotChange}
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
