import Dashboard from "@/components/dashboard";
import { authenticate } from "@/lib/auth";
import { getUserData } from "@/lib/dbHelpers";
import { redirect } from "next/navigation";

export default async function Page() {
    const auth = await authenticate();

    if (!auth.success || auth.unAuthenticated)
        redirect("/login");
    
    const userdata = await getUserData(auth.user.email);

    return <Dashboard userdata={userdata?.length ? userdata[0] : null} />;
}