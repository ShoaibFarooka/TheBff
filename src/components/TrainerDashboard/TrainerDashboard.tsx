import TrainerScheduledClientTable from "./TrainerDashboardComponents/TrainerScheduledClientTable";
import TrainerStatistics from "./TrainerDashboardComponents/TrainerStatictics";

const TrainerDashboard = () => {
  return (
    <>
      <div
        className='w-full h-full py-28 lg:py-[90px] px-5 md:px-20'
      >
        <div className="flex justify-center items-center">
          <h1 className="text-white font-[600] text-[32px] lg:text-[48px] mb-10">
            Welcome to Trainer DashBoard !!!
           </h1>
        </div>

        <TrainerStatistics/>
        <TrainerScheduledClientTable/>

        {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
        </div> */}
      </div>
    </>
  );
}

export default TrainerDashboard;