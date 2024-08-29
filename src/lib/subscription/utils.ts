import { Offer as OfferModel } from "@/models";
// import type { Plan as PlanType } from '@/types/subscription';
import { Offer } from "@/types/offer";
import { unstable_cache as nextCache } from "next/cache";
import { getPageData } from "../db";
import { logger } from "../logger";


// a function to get offers
export const getUncachedOffers = async () => {
  try {
    // wait 50 sec
    // await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

    const offers = await OfferModel.find({}).lean() as Offer[];
    return offers
  } catch (error) {
    logger.log(error);
    return null
  }
}

export const getOffers = nextCache(getUncachedOffers, ['offers'], {
  tags: ['offers'],
  revalidate: process.env.NODE_ENV === 'development' ? 5 : 3 * 60 * 60,
});

export const getUncachedOffer = async (id: string) => {
  try {
    const offer = await OfferModel.findOne({ id }).lean() as Offer;
    return offer
  } catch (error) {
    logger.log(error);
    return null
  }
}

export const getOffer = (id: string) => nextCache(() => getUncachedOffer(id), ['offer', id], {
  tags: ['offer', id],
  revalidate: process.env.NODE_ENV === 'development' ? 5 : 3 * 60 * 60,
})();


export const getUncachedSuggestedPlans = async () => {
  try {
    const plans = await getPageData('suggestedPlans');

    return plans;
  } catch (error) {
    logger.log(error);
    return null
  }
}

export const getSuggestedPlans = nextCache(getUncachedSuggestedPlans, ['suggestedPlans'], {
  tags: ['suggestedPlans'],
  revalidate: process.env.NODE_ENV === 'development' ? 5 : 12 * 60 * 60, // 12 hours
});