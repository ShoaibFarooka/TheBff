import StatsForm from "@/components/StatsForm";
import { authenticate } from "@/lib/auth";
import { getUserData } from "@/lib/dbHelpers";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";


const Goal = async () => {

    const auth = await authenticate();
    if (!auth.success || auth.unAuthenticated) return redirect("/login");

    // Don't cache this page
    noStore();

    const userdata = await getUserData(auth.user.email, {
        select: "email goal"
    });

    return (
        <StatsForm
            weight={userdata?.stats?.weight?.current}
            bodyFat={userdata?.stats?.bodyFat?.current}
            bodyMeasurements={userdata?.stats?.bodyMeasurements as any}
            steps={userdata?.stats?.steps?.current}
        />
    )
}

export default Goal