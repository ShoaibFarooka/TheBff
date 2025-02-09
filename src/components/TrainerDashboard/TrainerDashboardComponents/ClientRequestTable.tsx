"use client";

import { Space, Table, TableProps, Tag } from "antd";
import { CheckCircleOutlined, CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { getAuthUser } from "@/lib/auth";
import { Tooltip } from "antd";

interface DataType {
	key: string;
	_id: string;
	clientName: string;
	distance: number;
	address: string;
	timeSlot: string;
	sessionType: string;
	trainerAssinged: string;
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

const ClientRequestTable = () => {

	const [requests, setRequests] = useState<DataType[]>([]);
	const [currentUser, setCurrentUser] = useState<Partial<User>>({});

  useEffect(() => {
    setAuthUser();
  }, [])

	useEffect(() => {
		if (currentUser?._id) {
			getRequestedClients();
		}
	}, [currentUser]);
	

	const setAuthUser = async() => {
    const res = await getAuthUser();
		setCurrentUser(res?.user)
  }

	const getRequestedClients = async() => {
		try {
      const res = await fetch(`/api/sessions/get-trainer-requested-sessions?id=${currentUser?._id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.status === 200) {
				setRequests(data?.data)
				return data?.data;
			} else {
				toast.error(data.message ?? "Something went wrong.");
			}
    } catch (error) {
      console.error("Error fetching user subscriptions:", error);
    }
  };

	const acceptRequest = async (record: any) => {
		try {
			const res = await fetch(`/api/sessions/accept-requested-session-request`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Specify the content type
				},
				body: JSON.stringify({
					trainerId: currentUser?._id, // Send the user ID
					record: record, // Send the record data
				}),
			});
	
			const data = await res.json();
			if (res.status === 200) {
				toast.success("Request accepted successfully!"); // Show success message

				// Update the requests state using the spread operator
				setRequests((prevRequests: DataType[] | undefined) => {
					// Ensure prevRequests is an array before applying the filter
					if (!prevRequests) {
						return []; // Return an empty array if prevRequests is undefined
					}
	
					return [
						...prevRequests.filter((req) => req._id !== record._id), // Remove the accepted request
					];
				});
				return data?.data;
			} else {
				toast.error(data.message ?? "Something went wrong.");
			}
		} catch (error) {
			console.error("Error fetching user subscriptions:", error);
		}
	}

	const ignoreRequest = async (record: any) => {
		try {
			const res = await fetch(`/api/sessions/ignore-requested-session-request`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Specify the content type
				},
				body: JSON.stringify({
					trainerId: currentUser?._id, // Send the user ID
					record: record, // Send the record data
				}),
			});
	
			const data = await res.json();
			if (res.status === 200) {
				toast.success("Request ignored successfully!"); // Show success message
	
				// Update the requests state using the spread operator
				setRequests((prevRequests: DataType[] | undefined) => {
					// Ensure prevRequests is an array before applying the filter
					if (!prevRequests) {
						return []; // Return an empty array if prevRequests is undefined
					}
	
					return [
						...prevRequests.filter((req) => req._id !== record._id), // Remove the ignored request
					];
				});
				return data?.data;
			} else {
				toast.error(data.message ?? "Something went wrong.");
			}
		} catch (error) {
			console.error("Error fetching user subscriptions:", error);
		}
	};
	
	
  
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
      key: 'trainerAssigned',
      dataIndex: 'trainerAssigned',
      render: (item) => (
        <Tag color={"yellow"} key={item}>
          {"REQUEST"}
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
					<Tooltip title="Accept">
						<div style={{ fontSize: "24px", cursor: "pointer" }} onClick={() => acceptRequest(record)}> {/* Adjust fontSize as needed */}
							<CheckCircleOutlined />
						</div>
					</Tooltip>

					<Tooltip title="Reject">
						<div style={{ fontSize: "24px", cursor: "pointer" }} onClick={() => ignoreRequest(record)}> {/* Adjust fontSize as needed */}
							<CloseOutlined />
						</div>
					</Tooltip>
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
				dataSource={requests}
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
	);
};

export default ClientRequestTable;