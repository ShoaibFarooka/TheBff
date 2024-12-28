import FeedbackForm from "@/components/feedback/FeedbackForm";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = await getAuthUser();
  console.log(auth)
  if (!auth?.user || !(auth?.user?.role === 3)){
    redirect('/');
  }

  return <FeedbackForm/>;
}