import Pricing from "@/components/pricing";
import { authenticate } from "@/lib/auth";
const PricingPage = async () => {
  // const products = await getActiveProductsWithPrices();
  const auth = await authenticate();

  return (
    <Pricing products={[]} user={auth.user!} subscription={{} as any} />
  );
};

export default PricingPage;


export const dynamic = 'force-dynamic';