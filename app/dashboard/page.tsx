import Dashboard from "@/components/dashboard";
import { DashboardStateProvider } from "@/components/dashboard/state";
import { authenticate, getAuthUser } from "@/lib/auth";
import { getUserDataWithSubscription } from "@/lib/dbHelpers";
import { Session } from "@/types/session";
import { Plan, Subscription } from "@/types/subscription";
import { Stats, User } from "@/types/user";
import { redirect } from "next/navigation";

// import "@/models/User";

type UserData = User & {
  stats: Stats;
  subscriptions: Array<
    Subscription & {
      plan: Plan;
    }
  >;
  sessions: Session[];
};

export default async function Page() {

  const user = await getAuthUser()
  const role = user?.user?.role
  if(role === 1 || role === 4){
    return redirect("/direct-client-form");
  }

  const auth = await authenticate();
  if (!auth.success || auth.unAuthenticated)
    return redirect("/login?cb=/dashboard");

  const userdata = (await getUserDataWithSubscription(
    auth.user!.email
  )) as UserData;

  if (!userdata) {
    return redirect("/login?cb=/dashboard&force-login");
  }

  return (
    <DashboardStateProvider data={JSON.parse(JSON.stringify(userdata))}>
      <Dashboard />
      {/* // userdata={JSON.parse(JSON.stringify(userdata))} */};
    </DashboardStateProvider>
  );
}

// do not pre-render this page
export const dynamic = "force-dynamic";
export const dynamicParams = true;
