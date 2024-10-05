import { sendEmail } from "@/lib/email";
import { adminCartNotificationTemplate } from "@/lib/email/templates/cart";
import { logger } from "@/lib/logger";
import { Cart, Plan, Subscription } from "@/models";
import { Cart as CartType } from "@/types/cart";
import { Plan as PlanType } from "@/types/subscription";
import mongoose from "mongoose";
import { ProtectedTRPCContext } from "../../trpc";
import { AddItemInput, RemoveItemInput } from "./cart.input";

// utility functions to manage cart items, use protected context to access authenticated user
// export const addToCart 

export const getCart = async (ctx: ProtectedTRPCContext) => {
  try {
    const cart = await Cart.findOne({ user: ctx.user?._id })
      .populate<{
        items: [{ plan: PlanType }]
      }>("items.plan")

    logger.log('Items in cart:', cart?.items?.length)

    return JSON.parse(JSON.stringify(cart)) as typeof cart;
  } catch (err) {
    logger.error(err);
    return null;
  }
}

export const addItem = async (ctx: ProtectedTRPCContext, item: AddItemInput):
  Promise<CartType | { error: string }> => {
  try {

    // Find the cart associated with the user and the plan details
    const [cart, planDetails] = await Promise.all([
      Cart.findOne({ user: ctx.user?._id }),
      Plan.findById(item.planId).lean() as Promise<PlanType>
    ])

    // If plan details are not found, throw an error
    if (!planDetails)
      throw new Error("Plan not found");

    if (cart) {
      const [existingPlans, subscriptionCount] = await Promise.all([
        Plan.find({
          _id: { $in: cart?.items.map(i => i.plan) }
        }),
        Subscription.countDocuments({
          userId: new mongoose.Types.ObjectId(ctx.user!._id as string),
          planId: new mongoose.Types.ObjectId(item.planId),
          status: 'active',
          programId: planDetails.programId
        }),
      ])

      if (subscriptionCount > 0)
        return {
          error: "You already have a subscription to this plan"
        }

      // Check if a plan with same program exists in the cart
      const existingItem = existingPlans.some(
        p => p.programId === planDetails.programId
      )

      logger.log('Existing item:', existingItem)
      if (existingItem) {
        return {
          error:
            "You already have a subscription to this plan or a plan with the same program exists in the cart"
        }
      }

      if (!planDetails.amount) {
        return {
          error: "Can not add this plan to cart"
        }
      }

      // If the item does not exist, add it to the cart
      cart.items.push({
        plan: item.planId,
        price: planDetails.amount,
      });

      // Update the cart's subtotal
      cart.subTotal = cart.items.reduce((acc, i) => acc + i.price, 0);

      // let the mongoose know of the changes
      cart.markModified("items");
      cart.markModified("subTotal");

      sendEmail({
        to: process.env.EMAIL_USER!,
        subject: "New cart update received",
        text: `A new item has been added to the cart`,
        html: adminCartNotificationTemplate({
          user: ctx.user!, items: [planDetails]
        })
      })

      // Save the updated cart
      await cart.save();

      return cart.toJSON();
    }

    // If no cart exists, create a new cart with the item
    const newCart = new Cart({
      user: ctx.user!._id,
      items: [{
        plan: item.planId,
        price: planDetails.amount,
      }],
      subTotal: planDetails.amount
    });
    // Save the new cart
    await newCart.save();

    sendEmail({
      to: process.env.EMAIL_USER!,
      subject: "New cart update received",
      text: `A new item has been added to the cart`,
      html: adminCartNotificationTemplate({
        user: ctx.user!, items: [planDetails]
      })
    })

    return newCart;
  } catch (err: any) {
    // Log the error and return an error message
    logger.error(err);
    return { error: err?.message ?? "Failed to add item to cart" }
  }
}

export const removeItem = async (ctx: ProtectedTRPCContext, item: RemoveItemInput) => {
  try {
    // if (item)
    //   return { success: "Item not provided" }

    // Find the cart associated with the user
    const cart = await Cart.findOne({ user: ctx.user?._id });

    if (cart) {
      // Find the item in the cart
      const itemIndex = cart.items.findIndex(i => i.plan.toString() === item.planId);

      // If the item exists, remove it from the cart
      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);

        // let the mongoose know that the item has been removed
        cart.markModified("items");

        // Update the cart's subtotal
        cart.subTotal = cart.items.reduce((acc, i) => acc + i.price, 0);
        // Save the updated cart
        await cart.save();
      }

      return cart.toJSON();
    }
    return { error: "Cart not found" }
  } catch (err) {
    logger.error(err);
    return { error: "Failed to remove item from cart" }
  }
}

export const emptyCart = async (ctx: ProtectedTRPCContext) => {
  try {
    // Find the cart associated with the user
    const cart = await Cart.findOne({ user: ctx.user?._id });

    // If the cart exists, remove all items and set the subtotal to 0
    if (cart) {
      cart.items = [];
      cart.subTotal = 0;
      await cart.save();
    }

    return cart;
  } catch (err) {
    logger.error(err);
    return null
  }
}