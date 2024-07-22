import Dashboard from "@/components/dashboard";
import { authenticate } from "@/lib/auth";
import { getUserDataWithSubscription } from "@/lib/dbHelpers";
import { redirect } from "next/navigation";

// import "@/models/User";

export default async function Page() {
  // getCompleteUserData('siddiquiaffan201@gmail.com').then(console.log);


  const auth = await authenticate();
  if (!auth.success || auth.unAuthenticated) return redirect("/login");

  const userdata = await getUserDataWithSubscription(auth.user.email);

  // console.log(userdata);

  return <Dashboard userdata={JSON.parse(JSON.stringify(userdata))} />;
}

// do not pre-render this page
export const dynamic = "force-dynamic";
export const dynamicParams = true;


