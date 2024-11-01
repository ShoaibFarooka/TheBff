import React, { useEffect, useState } from 'react';
import { Modal, Select, DatePicker } from 'antd';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { CheckCircleOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { getAuthUser } from '@/lib/auth';

const { Option } = Select;

const BookSessionSlot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: "" })
  const [userSubscriptions, setUserSubscriptions] = useState([])

  const getUserSubscriptions = async ({ id }: { id: string }) => {
    try {
      // Make a GET request to the API endpoint with the user ID
      const res = await fetch(`/api/subscriptions/user-subscriptions?id=${id}`, {
        method: "GET",
      });
  
      // Await the response and parse it as JSON
      const data = await res.json();
  
      // Check if the response status is OK (200)
      if (res.status === 200) {
        console.log("User Subscriptions:", data.data); // Accessing the subscriptions data
        return data.data; // Return the subscription data if needed
      } else {
        // If the response is not successful, show an error message
        toast.error(data.message ?? "Something went wrong.");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching user subscriptions:", error);
    }
  };

  const setAuthUser = async() => {
    const res = await getAuthUser()
    console.log("setAuthUser - res : ", res)
    setCurrentUser(res?.user)
    getUserSubscriptions({id : res?.user?._id});
  }

  useEffect(() => {
    setAuthUser();
  }, [])

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

  const handleDateChange = (date : any) => {
    setSelectedDate(date ? dayjs(date).format('YYYY-MM-DD') : null);
  };

  const handleTimeSlotChange = (value : any) => {
    setSelectedTimeSlot(value);
  };

  const handleSubmit = () => {
    if(!isScheduled){
      console.log("Selected Date:", selectedDate);
      console.log("Selected Time Slot:", selectedTimeSlot);
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
      <div className="center flex-col gap-4 h-full">
        <h2 className="text-xl md:text-3xl font-bold text-center text-neutral-100">
          Book a slot to continue!
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="animate-vibrate hover:animate-none">
          Book a slot
        </Button>
      </div>

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
      >
        {!isScheduled && <>
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
        </>}
        {isScheduled && (
          <div className="confirmation-message flex flex-col items-center justify-center gap-4 p-6 mt-6 text-center rounded-md">
            <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
            <h2 className="text-2xl font-semibold text-white">Your session has been rescheduled!</h2>
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
