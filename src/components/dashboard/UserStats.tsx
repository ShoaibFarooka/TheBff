"use client";
import { useAuth } from "@/hooks/auth";
import { saveUserStats } from "@/lib/dbHelpers";
import { useDebounce } from "@/lib/hooks";
import { capitalizeFirstLetter, getServerData } from "@/lib/utils";
import { Stats, statsKeys } from "@/types/user";
import { useEffect, useState, useTransition } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Slider } from "../ui/slider";
// import StatsForm from "./StatsForm";
import dynamic from "next/dynamic";
import { useDashboardState } from "./state";

const StatsForm = dynamic(() => import("./StatsForm"), {
  ssr: false,
  loading: () => (
    <p className="w-5 h-5 border-2 border-b-0 border-dashed animate-spin rounded-full" />
  ),
});

const UserStats: React.FC<{
  userStats: Stats;
}> = ({ userStats }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_, startTransition] = useTransition();
  const { user } = useAuth();

  const { setUserData } = useDashboardState();

  useEffect(() => {
    if (!userStats) {
      setTimeout(() => setIsModalOpen(true), 4000);
      return;
    }

    // if userStats is present, and updatedAt is more than 1 week old, open the modal
    const updatedAt = new Date((userStats as any)?.updatedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    if (updatedAt < weekAgo) {
      setTimeout(() => setIsModalOpen(true), 4000);
    }
  }, [userStats]);

  const handleSliderChange = useDebounce(
    async (key: keyof Stats, value: number[]) => {
      try {
        const statObj = {
          [key]: {
            current: value[0],
            // @ts-expect-error
            goal: userStats[key].goal,
          },
        };

        const res = await getServerData(startTransition, async () =>
          saveUserStats(user.email, statObj)
        );

        if (res.error) {
          console.error(res.error);
          return;
        }

        setUserData({
          stats: {
            ...userStats,
            ...statObj,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    500
  );

  return (
    <>
      <div className="relative max-h-[300px] custom-scroll-bar overflow-auto bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1 shadow-2xl shadow-[#4A2F70]/50">
        {isModalOpen && (
          <StatsForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        <div className="text-white flex justify-between items-center">
          <h1 className="text-white text-[24px]">Stats</h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary text-neutral-400 p-0.5 rounded-lg border-2 border-transparent hover:border-neutral-400"
          >
            <MdOutlineEdit />
          </button>
        </div>

        {/* list down the stats  */}
        <div className="space-y-4 mt-4 text-neutral-100">
          {statsKeys.map(
            (key) =>
              userStats?.[key] && (
                <div key={key} className="flex flex-col space-y-2">
                  <div className="w-full flex justify-between">
                    <h3 className="text-lg">
                      {capitalizeFirstLetter(key)}
                      <span className="text-sm text-neutral-400 ml-1">
                        ({userStats?.[key]?.current})
                      </span>
                    </h3>
                    <h3 className="text-lg">{userStats?.[key]?.goal}</h3>
                  </div>

                  <Slider
                    defaultValue={[userStats[key].current]}
                    max={userStats[key].goal}
                    className="w-full"
                    step={1}
                    onValueChange={(value) => handleSliderChange(key, value)}
                  />
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default UserStats;
