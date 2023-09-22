import Business from "@/components/business";
import { getPageData } from "@/lib/db";

export default async function Page() {
  const pageData = (await getPageData("business")) as any;

  return <Business pageData={pageData} />;
}
