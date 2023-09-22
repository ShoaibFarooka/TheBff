import Programs from "@/components/programs";
import { getPageData } from "@/lib/db";

export default async function Page() {
  const pageData = (await getPageData("Programs")) as any;

  return <Programs pageData={pageData} />;
}
