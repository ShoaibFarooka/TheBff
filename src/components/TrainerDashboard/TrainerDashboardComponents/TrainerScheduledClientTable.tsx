"use client";

import { Modal, Space, Table, TableProps, Tag } from "antd";
import { CheckCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAuthUser } from "@/lib/auth";
import toast from 'react-hot-toast';
import UserSessionModal from "./UserSessionsModal";

interface DataType {
	key: string;
	_id: string;
	clientName: string;
	distance: number;
	address: string;
	timeSlot: string;
	sessionType: string;
	trainerAssinged: string;
  subscriptionId: string;
	userId: User;
	planId: Plan
}
interface Plan {
	name: string;
	amount: string;
}

interface User {
	_id: string;
	email: string;
	name: string;
	phone: string;
	role: number;
  address: Address;
}

interface Address {

}

const TrainerScheduledClientTable = () => {
  const [scheduled, setScheduled] = useState<DataType[]>([]);
	const [currentUser, setCurrentUser] = useState<Partial<User>>({});
  const [userSessionModal, setUserSessionModal] = useState(false);

  const [modalUser, setModalUser] = useState<Partial<User>>({});
  const [userSubscription, setModalUserSubscription] = useState("");

  useEffect(() => {
    setAuthUser();
  }, [])

	useEffect(() => {
		if (currentUser?._id) {
			getScheduledClients();
		}
	}, [currentUser]);

  const setAuthUser = async() => {
    const res = await getAuthUser();
		setCurrentUser(res?.user)
  }

  const getScheduledClients = async() => {
    try {
      const res = await fetch(`/api/sessions/get-trainer-scheduled-sessions?id=${currentUser?._id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.status === 200) {
				setScheduled(data?.data)
				return data?.data;
			} else {
				toast.error(data.message ?? "Something went wrong.");
			}
    } catch (error) {
      console.error("Error fetching user subscriptions:", error);
    }
  }

  const setModalData = (record: DataType) => {
    setModalUser(record?.userId)
    setModalUserSubscription(record?.subscriptionId);
    setUserSessionModal(true)
  }
  
  const columns: TableProps<DataType>['columns'] = [
    {
			title: 'Client Name',
			dataIndex: 'userId.name', // This is fine for accessing the name of the user
			key: 'userId.name',
			render: (_, item) => {
				const user = item.userId;
				return <a>{user?.name}</a>;
			}
		},		
    {
      title: 'Address',
      dataIndex: 'userId.address',
      key: 'distance',
      render: (_, item) => {
        const user = item.userId;
        const address = user?.address;
    
        const concatenatedAddress = address
          ? Object.values(address).join(', ')
          : 'No Address';
    
        return (
          <a>
            {concatenatedAddress}
          </a>
        );
      },
    },  
    {
      title: 'Session Time',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (item) => (
        <Tag color={item ? "green" : "yellow"} key={item}>
          {item ? item : "In Progress"}
        </Tag>
      ),
    },
    {
      title: 'Session Type',
      dataIndex: 'sessionType',
      key: 'sessionType',
			render: (_, item) => {
				const plan = item.planId;
				return <a>{plan?.name}</a>;
			}
    },
    {
      title: 'Fees/Session',
      dataIndex: 'amount',
      key: 'amount',
			render: (_, item) => {
				const plan = item.planId;
				return <a>{plan?.amount}</a>;
			}
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
				<Space size="small">
					<div style={{ fontSize: "24px", cursor: "pointer" }} onClick={() => setModalData(record)}> {/* Adjust fontSize as needed */}
						<EyeOutlined />
					</div>
				</Space>
			)
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

  return (
    <>
      <UserSessionModal 
        userSessionModal={userSessionModal} 
        setUserSessionModal={setUserSessionModal}
        trainerId={currentUser?._id || ""}
        userId={modalUser?._id || ""}
        subscriptionId={userSubscription}
      />
      <div style={{marginTop: "10px"}}>
        <Table<DataType>
          rowHoverable={false}
          columns={columns.map((column) => ({
            ...column,
            onHeaderCell: () => ({
              style: headerStyle,
            }),
            onCell: () => ({
              style: cellStyle,
            }),
          }))}
          dataSource={scheduled}
          pagination={false}
          style={{
            background: "transparent", 
          }}
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
      </div>
    </>
  );
};

export default TrainerScheduledClientTable;