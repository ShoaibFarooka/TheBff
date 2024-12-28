import { ReactNode } from "react";
import TrainerScheduledClientTable from "./TrainerDashboardComponents/TrainerScheduledClientTable";
import TrainerStatistics from "./TrainerDashboardComponents/TrainerStatictics";
import { Tabs } from "antd";
import ClientRequestTable from "./TrainerDashboardComponents/ClientRequestTable";

interface Tab {
  key: string; // Change `number` to `string`
  label: ReactNode;
  children: ReactNode;
}

const TrainerDashboard = () => {

  const tabItems: Tab[] = [
    {
      key: "1", // Now a string
      label: <div style={{ color: "white" }}>{"Clients"}</div>,
      children: <TrainerScheduledClientTable />,
    },
    {
      key: "2", // Now a string
      label: <div style={{ color: "white" }}>{"Requests"}</div>,
      children: <ClientRequestTable />,
    }
  ];

  return (
    <>
      <div className="w-full h-full py-28 lg:py-[90px] px-5 md:px-20">
        <div className="flex justify-center items-center">
          <h1 className="text-white font-[600] text-[32px] lg:text-[48px] mb-10">
            Welcome to Trainer DashBoard !!!
          </h1>
        </div>

        <TrainerStatistics />
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={"small"}
          style={{ color: "white" }}
          tabBarStyle={{ marginTop: "20px" }}
          items={tabItems}
        />
      </div>
    </>
  );
};

export default TrainerDashboard;
