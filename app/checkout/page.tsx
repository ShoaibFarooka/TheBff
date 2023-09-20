import Checkout from "@/components/checkout";
import { getPageData } from "@/lib/db";
export default async function Page() {
    const pageData =  await getPageData("checkout") as any;
    
   
    
  
    return <Checkout    pageData = {pageData} />;
}