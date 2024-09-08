import { Coupon } from "@/models";
import { Coupon as CouponType } from "@/types/coupon";
import { TRPCContext } from "../../trpc";
import { GetCouponInput } from "./coupon.input";

export const getCoupon = async (ctx: TRPCContext, code: GetCouponInput) => {
  try {
    const coupon = (await Coupon.findOne({ code }))?.toJSON() as CouponType;
    if (!coupon) {
      return {
        error: "Coupon not found"
      }
    }

    return coupon
  } catch (error) {
    console.error(error);
    return {
      error:
        "Failed to get coupon"
    }
  }
}