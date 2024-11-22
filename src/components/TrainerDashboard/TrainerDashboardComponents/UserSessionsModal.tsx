import React, { useEffect, useState } from "react";
import { Modal, Table, Button, Space } from "antd";
import { CheckCircleOutlined, CheckOutlined, CloseOutlined, ScheduleOutlined } from "@ant-design/icons";

// Define props type
interface UserSessionModalProps {
  userSessionModal: boolean;
  setUserSessionModal: (value: boolean) => void;
  trainerId: string;
  userId: string;
  subscriptionId: string;
}

// Define the data type for the sessions
interface SessionData {
  sessionNumber: number;
  day: string;
  timeSlot: string;
  status: string;
}

const UserSessionModal: React.FC<UserSessionModalProps> = (props) => {
  const { userSessionModal = false, setUserSessionModal, trainerId = "", userId = "", subscriptionId = "" } = props;

  // State to store fetched session data
  const [sessionData, setSessionData] = useState<SessionData[]>([]);

  // Fetch data from an API
  const fetchSessionData = async () => {
    if (!trainerId || !userId || !subscriptionId) {
      console.error("Missing required parameters: trainerId, userId, or subscriptionId");
      return;
    }
  
    console.log("Trainer ID:", trainerId);
    console.log("User ID:", userId);
    console.log("Subscription ID:", subscriptionId);
  
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
      title: "Action",
      key: "action",
      render: (_: any, record: SessionData) => (
        <Space size="small">
          <div style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => handleAction(record)}> {/* Adjust fontSize as needed */}
            <CheckCircleOutlined />
          </div>
          <div style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => handleAction(record)}> {/* Adjust fontSize as needed */}
            <ScheduleOutlined />
          </div>
          <div style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => handleAction(record)}> {/* Adjust fontSize as needed */}
            <CloseOutlined />
          </div>
          
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
  const handleAction = (record: SessionData) => {
    console.log("Session completed:", record);
    // You can also send an API call here to update session status
  };

  return (
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
  );
};

export default UserSessionModal;
