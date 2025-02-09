"use client";

import { useAuth } from "@/hooks/auth";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Modal, Table } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const Referral = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [referral, setReferrals] = useState([]);


 const columns = [
    {
      title: "Coupon Code",
      dataIndex: "code",
      key: "code",
      width: 140
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item: string) => {
        console.log("status: ", item)
        return item ? "Used" : "Not Used"
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item: string) => {
        console.log(item);
        return dayjs(item).format("Do MMMM, YYYY h:mm A"); // Example: "21st January, 2024 2:30 PM"
      },
    },
  ];

  const generateReferrals = async () => {
    console.log(user)
    if(!user?._id){
      return
    }

    try {
      const res = await fetch(`/api/referrals/generate-referral`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        console.log(data)
        toast.success(data?.message ?? "Referral Created Successfully");
      } else {
        toast.error(data?.message ?? "Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching user subscriptions:", error);
    }
  }; 

  const getUserReferrals = async () => {
    console.log(user);
    if (!user?._id) {
      return;
    }
  
    try {
      const res = await fetch(`/api/referrals/get-user-referrals?id=${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        console.log(data);
        // Ensure the response is an array, otherwise fallback to an empty array
        setReferrals(Array.isArray(data?.data) ? data.data : []);
      } else {
        toast.error(data.message ?? "Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching user referrals:", error);
    }
  };
  

  useEffect(() => {
    getUserReferrals();
  }, [user])

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
      <Modal
        open={open}
        footer={null} // Removes the footer buttons
        title={
          <h3 style={{ background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)', color: 'white' }}>
            Referrals
          </h3>
        }        
        onCancel={() => setOpen(false)}
        styles={{
          content: {  background: 'linear-gradient(288.21deg, #2E4061 0%, #46256E 100%)' }, // turns the Modal red
        }}
        style={{
          marginTop: "100px"
        }}
      >
        <Table
          rowHoverable={false}
          dataSource={referral}
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
        <Button 
          onClick={async() => {
            await generateReferrals()
            await getUserReferrals()
          }} 
          className="bg-[#514ED8] text-white w-full py-3 rounded-lg mt-5"
        >
            Generate New Referral
        </Button>
      </Modal>
      <div className=" bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1">
        <h1 className="text-white text-[24px] mb-4">Referral</h1>
        <Button onClick={() => setOpen(true)} className="bg-[#514ED8] text-white w-full py-3 rounded-lg mt-5">
          View Referrals
        </Button>
      </div>
    </>
  );
};

export default Referral;
