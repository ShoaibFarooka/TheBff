import Dashboard from "@/components/dashboard";
import { authenticate } from "@/lib/auth";
import { getUserData } from "@/lib/dbHelpers";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = await authenticate();
  if (!auth.success || auth.unAuthenticated) return redirect("/login");

  const userdata = await getUserData(auth.user.email);

  return <Dashboard userdata={userdata} />;
}

// do not pre-render this page
export const dynamic = "force-dynamic";
export const dynamicParams = true;