import React, { useEffect, useState } from "react";
import { Modal, Table, Button, Space, Select, DatePicker } from "antd";
import { CheckCircleOutlined, CheckOutlined, CloseOutlined, ScheduleOutlined } from "@ant-design/icons";
import toast from 'react-hot-toast';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";


const { Option } = Select;


interface SessionData {
  sessionNumber: number;
  day: string;
  timeSlot: string;
  status: string;
  date: string;
  can_be_completed: boolean;
  endDate: Date;
}


const UserSessionModal = (props : any) => {
  const { userSessionModal = false, setUserSessionModal, trainerId = "", userId = "", subscriptionId = ""} = props;

  // State to store fetched session data
  const [sessionData, setSessionData] = useState<SessionData[]>([]);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [rescheduleTime, setRescheduleTime] = useState<string>("");
  const [rescheduledRecord, setRescheduledRecord] = useState<SessionData | null>(null);
  const [sessionDays, setSessionDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);


  // Fetch data from an API
  const fetchSessionData = async () => {
    if (!trainerId || !userId || !subscriptionId) {
      console.error("Missing required parameters: trainerId, userId, or subscriptionId");
      return;
    }
  
    try {
      const response = await fetch(
        `/api/sessions/get-trainer-user-sessions?trainerId=${encodeURIComponent(trainerId)}&userId=${encodeURIComponent(userId)}&subscriptionId=${encodeURIComponent(subscriptionId)}`
      );
  
      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      setSessionData(data?.data?.[0]?.sessions);
      setSessionDays(data?.data?.[0]?.days)

    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };
  

  // useEffect to call the API when the modal opens
  useEffect(() => {
    if (userSessionModal) {
      fetchSessionData();
    }
  }, [userSessionModal]);

  // Table columns
  const columns = [
    {
      title: "S. No",
      dataIndex: "sessionNumber",
      key: "sessionNumber",
      width: 80
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      render: (item: string) => {
        return item?.toUpperCase(); // Converts the string to uppercase
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (item: string) => {
        console.log(item)
        return dayjs(item).format("DD-MM-YYYY");
      }
    },
    {
      title: "Time Slot",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: SessionData) => (
        <Space size="small">
          {record?.can_be_completed === true ? <div style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => completeSession(record)}> {/* Adjust fontSize as needed */}
            <CheckCircleOutlined />
          </div> : <></>}
          {record?.status === "pending" ? <><div style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => rescheduleSession(record)}> {/* Adjust fontSize as needed */}
            <ScheduleOutlined />
          </div>
          <div style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => cancelSession(record)}> {/* Adjust fontSize as needed */}
            <CloseOutlined />
          </div></> : <>-</>}
          
        </Space>
      ),
    },
  ];

  const headerStyle = {
    background: 'hsla(var(--foreground), 0)',
    color: "#fff",
    borderBottom: "1px solid #514ED866",
    borderRight: "none",
    borderLeft: "none"
  };

  const cellStyle = {
    color: "#fff",
    border: "none",
  };

  // Action handler (for tick button)
  const completeSession = async(record: SessionData) => {    
    try {
      const response = await fetch(
        `/api/sessions/update-trainer-user-sessions?trainerId=${encodeURIComponent(trainerId)}&userId=${encodeURIComponent(userId)}&subscriptionId=${encodeURIComponent(subscriptionId)}`
      );
  
      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setSessionData([...data?.data]);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const rescheduleSession = async (record: SessionData) => {
    if (!rescheduleTime) {
      setRescheduleModal(true);
      setRescheduledRecord(record);
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
          trainerId: trainerId,
          userId: userId,
          subscriptionId: subscriptionId,
          sessionNumber: rescheduledRecord?.sessionNumber,
          newTimeSlot: rescheduleTime,
          newDate: selectedDate
        }),
      });
  
      const data = await res.json();
      if (res.status === 200 && data.success) {
        setSessionData((prevSessionData: SessionData[]) =>
          prevSessionData.map((req) =>
            req.sessionNumber === rescheduledRecord?.sessionNumber
              ? { ...req, timeSlot: rescheduleTime }
              : req
          )
        );
        
        
        toast.success("Session rescheduled successfully!");
      } else {
        toast.error(data.message || "Failed to reschedule session.");
      }
    } catch (error) {
      console.error("Error rescheduling session:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const cancelSession = async (record: SessionData) => {
    try {
      const lastSession = sessionData[sessionData.length - 1];
  
      if (!lastSession) {
        console.error("No sessions available.");
        return;
      }
  
      const lastDay = lastSession.day; // e.g., "Thursday"

      if (sessionDays.length === 0) {
        console.error("sessionDays is empty.");
        return;
      }

      let currentDay = lastDay; // Start with the last day
  
      // Days array for calculating day indices
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      const currentDayIndexInWeek = days.findIndex(day => day === currentDay);
  
      // Calculate the next day index (wraps around to the start of the array if it's the last day)
      const currentDayIndex = sessionDays.findIndex(day => day === currentDay);
      const nextDayIndex = (currentDayIndex + 1) % sessionDays.length;
  
      // Get the next day from the array
      const nextDay = sessionDays[nextDayIndex];
      const nextDayIndexInWeek = days.findIndex(day => day === nextDay);
  
      const dayDifference = (nextDayIndexInWeek - currentDayIndexInWeek + days.length) % days.length;
  
      dayjs.extend(customParseFormat);
  
      const nextSessionDate = dayjs(lastSession.date)
        .add(dayDifference, "day")
  
      // Prepare the request payload
      const requestBody = {
        trainerId: trainerId,
        userId: userId,
        subscriptionId: subscriptionId,
        sessionNumber: lastSession.sessionNumber + 1,
        nextDay: nextDay,
        date: nextSessionDate,
        currentSessionNumber: record?.sessionNumber
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
        toast.success("Session successfully updated!");
        setSessionData(data?.data)
      } else {
        toast.error(data.message || "Failed to update session.");
      }
    } catch (error) {
      console.error("Error while canceling/rescheduling the session:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };  

  

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

  return (
    <>
      <Modal
        open={userSessionModal}
        title={
          <h3 style={{ background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)', color: 'white' }}>
            When would you like to schedule ?
          </h3>
        } 
        onCancel={() => setUserSessionModal(false)}
        onOk={() => setUserSessionModal(false)}
        styles={{
          content: {  background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)' }, // turns the Modal red
        }}
        width={700}
        style={{width: "700px"}}
      >
        <Table
          rowHoverable={false}
          dataSource={sessionData}
          columns={columns.map((column) => ({
            ...column,
            onHeaderCell: () => ({
              style: headerStyle,
            }),
            onCell: () => ({
              style: cellStyle,
            }),
          }))}
          rowKey="sessionNumber"
          pagination={false}
          locale={{
            emptyText: (
              <div
                style={{
                  background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '8px', // Optional for rounded corners 
                  textAlign: 'center',
                  width: "100%"
                }}
              >
                No Data Available
              </div>
            ),
          }}
        />
      </Modal>
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
          setSelectedDate(null)
        }}
        onOk={() => {   
          setRescheduleModal(false);
          setRescheduleTime("");
          rescheduleSession({} as SessionData)
          setSelectedDate(null)
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
        <DatePicker
          placeholder="Select Date"
          style={{ width: '100%', margin: '10px 0' }}
          onChange={(date : any) => setSelectedDate(date ? dayjs(date).format('YYYY-MM-DD') : null)}
          value={selectedDate ? dayjs(selectedDate) : null}
        />
      </Modal>
    </>
  );
};

export default UserSessionModal;
