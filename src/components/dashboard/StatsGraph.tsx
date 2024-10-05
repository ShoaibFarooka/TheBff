"use client";
import { statsKeys } from "@/types/user";
import { useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDashboardState } from "./state";

const StatsGraph = () => {
  const {
    userData: { stats: userStats },
  } = useDashboardState();

  // calculate how much of the goal has been achieved (average, in percentage)
  const avgGoalAchieved = useMemo(() => {
    if (!userStats) return 100;

    const sum = statsKeys.reduce(
      (acc, curr) => {
        acc.current += userStats[curr].current;
        acc.goal += userStats[curr].goal;
        return acc;
      },
      { current: 0, goal: 0 }
    );

    const percentage = (sum.current / sum.goal) * 100;

    return parseFloat(percentage.toFixed(2));
  }, [userStats]);

  return (
    <>
      <div className=" bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1">
        <div className="text-white flex justify-between">
          <h1 className="text-white text-[24px]">Stats</h1>
        </div>

        <div className=" max-w-md">
          <CircularProgressbar
            value={avgGoalAchieved}
            text={`${avgGoalAchieved}%`}
            strokeWidth={5}
            backgroundPadding={6}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#ff6600",
              trailColor: "rgba(255, 255, 255, 0.15)",
            })}
          />
        </div>

        {/* <div className="mt-4">
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-orange-500 mx-3 inline"></div>
            <span className="text-white">Restless</span>
            <div className="h-4 w-4 rounded-full bg-white inline mx-3"></div>
            <span className="text-white">Awake</span>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default StatsGraph;
