import SalesForm from "@/components/salespersonform/SalesForm";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = await getAuthUser();
  if (!auth?.user || (auth?.user.role !== 1 && auth?.user.role !== 4)) {
    redirect('/');  // Redirect to home page if not authenticated or role doesn't match
  }

  return <SalesForm />;
}