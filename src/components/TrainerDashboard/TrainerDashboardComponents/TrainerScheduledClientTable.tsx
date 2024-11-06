"use client";

import { Space, Table, TableProps, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const TrainerScheduledClientTable = () => {

  interface DataType {
    key: string;
    clientName: string;
    distance: number;
    address: string;
    sessionTime: string;
    sessionType: string;
    status: string;
  }
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
    },
    
    {
      title: 'Session Time',
      dataIndex: 'sessionTime',
      key: 'ssessionTime',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <Tag color={"red"} key={status}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Session Type',
      dataIndex: 'sessionType',
      key: 'sessionType',
    },
    {
      title: 'Fees/Session',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="large">
          <div style={{ fontSize: "24px", cursor: "pointer" }}> {/* Adjust fontSize as needed */}
            <EyeOutlined />
          </div>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      clientName: 'John Brown',
      distance: 32,
      address: 'New York No. 1 Lake Park',
      sessionTime: "11:00 - 12:00",
      sessionType: "Yoga Care",
      status: "Scheduled",
    },
    {
      key: '2',
      clientName: 'John Brown',
      distance: 32,
      address: 'New York No. 1 Lake Park',
      sessionTime: "11:00 - 12:00",
      sessionType: "Yoga Care",
      status: "Scheduled",
    },
    {
      key: '3',
      clientName: 'John Brown',
      distance: 32,
      address: 'New York No. 1 Lake Park',
      sessionTime: "11:00 - 12:00",
      sessionType: "Yoga Care",
      status: "Scheduled",
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
          dataSource={data}
          pagination={false}
          style={{
            background: "transparent",
          }}
        />
      </div>
    );
  };

export default TrainerScheduledClientTable;