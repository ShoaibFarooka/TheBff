"use client";
import { postData } from "@/lib/helpers";
import user from "@/models/User";
import { Price, ProductWithPrices, Subscription } from "@/types/db";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SubscriptionWithProduct extends Subscription {
  product: ProductWithPrices;
}

interface Props {
  //   session: Session | null;
  //   user: User | null | undefined;
  products: ProductWithPrices[];
  user: any;
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "1month" | "2months";

const Pricing: React.FC<Props> = ({ products, subscription }) => {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("1month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push("/signin");
    }
    if (subscription) {
      return router.push("/account");
    }
    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      // const stripe = await getStripe();
      // stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  return <div>Pricing</div>;
};

export default Pricing;
