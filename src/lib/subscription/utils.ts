import { Coupon as CouponModel } from "@/models";
// import type { Plan as PlanType } from '@/types/subscription';
import { Coupon } from "@/types/coupon";
import { unstable_cache as nextCache } from "next/cache";
import { getDataFromDb } from "../dbHelpers";
import { logger } from "../logger";


// a function to get Coupon
export const getUncachedCoupons = async () => {
  try {
    const coupons = await CouponModel.find({
      expiryDate: { $gte: new Date() } // get offers that have not expired
    }).lean() as Coupon[];

    return coupons
  } catch (error) {
    logger.log(error);
    return null
  }
}

export const getCoupons = nextCache(getUncachedCoupons, ['coupons'], {
  tags: ['coupons'],
  revalidate: process.env.NODE_ENV === 'development' ? 5 : 3 * 60 * 60,
});

export const getUncachedCoupon = async (
  code: string,
  options: { includeExpired?: boolean } = { includeExpired: false }
) => {
  try {
    const coupon = await CouponModel
      .findOne({
        code,
        // if includeExpired is false, get only offers that have not expired
        expiryDate: options.includeExpired ? { $gte: new Date() } : { $lte: new Date() }
      })
      .lean() as Coupon;

    return coupon
  } catch (error) {
    logger.log(error);
    return null
  }
}

export const getCoupon = (
  code: string,
  options: { includeExpired?: boolean } = { includeExpired: false }
) => nextCache(() => getUncachedCoupon(code, options), ['coupon', code], {
  tags: ['coupon', code],
  revalidate: process.env.NODE_ENV === 'development' ? 5 : 3 * 60 * 60,
})();


export const getUncachedSuggestedPlans = async () => {
  try {
    const plans = await getDataFromDb({ key: "suggestedPlans" });

    return JSON.parse(
      JSON.stringify(plans ?? {})
    ) as typeof plans
  } catch (error) {
    logger.log(error);
    return null
  }
}

export const getSuggestedPlans = nextCache(getUncachedSuggestedPlans, ['suggestedPlans'], {
  tags: ['suggestedPlans'],
  revalidate: process.env.NODE_ENV === 'development' ? 5 : 12 * 60 * 60, // 12 hours
});
