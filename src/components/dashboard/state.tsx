"use client";
import { CoachType } from "@/models/coach";
import { Session } from "@/types/session";
import { Plan, Subscription } from "@/types/subscription";
import { Stats, User } from "@/types/user";
import { createContext, useContext, useState } from "react";

export type UserData = User & {
  classes: any[];
  stats: Stats;
  subscriptions: Array<
    Subscription & {
      plan: Plan;
    }
  >;
  sessions: Session[]
};

const context = createContext({
  userData: {} as UserData,
  setUserData: (...args: any[]) => {},
  coaches: [] as CoachType[],
  setCoaches: (...args: any[]) => {},
});

export const { Provider } = context;

export const useDashboardState = () => {
  const { userData, setUserData, coaches, setCoaches } = useContext(context);

  const setPartialUserData = (data: Partial<UserData>) => {
    setUserData((prev: UserData) => ({ ...prev, ...data }));
  };

  return { userData: userData ?? {}, setUserData: setPartialUserData, coaches, setCoaches };
};

export const DashboardStateProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: UserData;
}) => {
  const [userData, setUserData] = useState(data);
  const [coaches, setCoaches] = useState<CoachType[]>([]);

  return (
    <Provider value={{ userData, setUserData, coaches, setCoaches }}>
      {children}
    </Provider>
  );
};

export { context };

