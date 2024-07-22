import Pricing from "@/components/pricing";
import { authenticate } from "@/lib/auth";
import { getActiveProductsWithPrices } from "@/lib/stripe";

const PricingPage = async () => {
  const products = await getActiveProductsWithPrices();
  const auth = await authenticate();

  return (
    <Pricing products={products} user={auth.user!} subscription={{} as any} />
  );
};

export default PricingPage;
