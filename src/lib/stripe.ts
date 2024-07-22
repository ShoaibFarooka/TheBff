"use server"
import Customers from '@/models/Customer';
import Price from '@/models/Price';
import Product from '@/models/Product';
import Subscription from '@/models/Subscription';
import User from '@/models/User';
import { Price as PriceType, Product as ProductTpe, SubscriptionInsert } from '@/types/db';
import mongoose from 'mongoose';
import Stripe from 'stripe';
import { authenticate } from './auth';
import connectDB from './dbConnection';
import { devLog, getURL } from './helpers';
import { stripe } from './stripeClient';

const upsertProductRecord = async (product: Stripe.Product) => {
    const productData: ProductTpe = {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? null,
        image: product.images?.[0] ?? null,
        metadata: product.metadata,
        features: product.features as ProductTpe['features'] ?? null
    };

    await connectDB();

    await Product.updateOne({ id: product.id }, productData, { upsert: true }).then(() => { }).catch((err) => {
        console.error(err);
        throw err;
    });
}

const upsertPriceRecord = async (price: Stripe.Price) => {
    const priceData: PriceType = {
        id: price.id,
        product_id: typeof price.product === 'string' ? price.product : '',
        active: price.active,
        currency: price.currency,
        description: price.nickname ?? null,
        type: price.type as any,
        unit_amount: price.unit_amount ?? null,
        interval: price.recurring?.interval as any ?? null,
        interval_count: price.recurring?.interval_count ?? null,
        trial_period_days: price.recurring?.trial_period_days ?? null,
        metadata: price.metadata
    };

    await connectDB();

    await Price.updateOne({ id: price.id }, priceData, { upsert: true }).then(() => { }).catch((err) => {
        console.error(err);
        // console.log(priceData);
        throw err;
    });
}

const upsertCouponRecord = async (coupon: Stripe.Coupon) => {
    const couponData: any = {
        id: coupon.id,
        amount_off: coupon.amount_off,
        currency: coupon.currency,
        duration: coupon.duration,
        duration_in_months: coupon.duration_in_months,
        metadata: coupon.metadata,
        name: coupon.name,
        percent_off: coupon.percent_off,
        redeem_by: coupon.redeem_by,
        times_redeemed: coupon.times_redeemed,
        valid: coupon.valid
    };

    await connectDB();

    await Price.updateOne({ id: coupon.id }, couponData, { upsert: true }).then(() => { }).catch((err) => {
        console.error(err);
        throw err;
    });
}

const createOrRetrieveCustomer = async ({
    email,
    phone,
    name,
}: {
    email: string;
    phone: string;
    name?: string;
}) => {
    try {
        await connectDB();

        // fetch customer from db
        const c = await User.findOne({
            email: email,
            stripeCustomerId: { $exists: true }
        }, '_id stripeCustomerId');

        if (c?.stripeCustomerId) return c.stripeCustomerId;

        // create new customer
        const customerData: { email?: string, phone: string, name?: string } = {
            phone,
            email,
            name
        }

        const customer = await stripe.customers.create(customerData);

        // save customer to db
        await User.updateOne({ email: email }, {
            stripeCustomerId: customer.id,
            phone,
        }, { upsert: true })

        return customer.id;

    } catch (err) {
        console.error(err);
        throw err;
    }
}

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
    uuid: string,
    payment_method: Stripe.PaymentMethod
) => {
    //Todo: check this assertion
    const customer = payment_method.customer as string;
    const { name, phone, address } = payment_method.billing_details;

    if (!name || !phone || !address) return;
    //@ts-ignore
    await stripe.customers.update(customer, { name, phone, address });

    await connectDB();

    const c = await Customers.findOneAndUpdate({
        id: uuid
    }, {
        billing_address: { ...address },
        payment_method: { ...payment_method[payment_method.type] }
    })

    if (!c) throw new Error('Customer not found');
};


const manageSubscriptionStatusChange = async (
    subscriptionId: string,
    customerId: string,
    createAction = false
) => {
    await connectDB();

    // Get customer's UUID from mapping table.
    const customerData = await User.findOne({ stripeCustomerId: customerId }, 'stripeCustomerId email');
    if (!customerData) throw new Error('Customer not found');

    const { stripeCustomerId: uuid, email } = customerData!;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['default_payment_method']
    });

    // Upsert the latest status of the subscription object.
    const subscriptionData: SubscriptionInsert =
    {
        id: subscription.id,
        user_id: uuid,
        user_email: email,
        metadata: subscription.metadata,
        status: subscription.status as any,
        price_id: subscription.items.data[0].price.id,
        product_id: subscription.items.data[0].price.product as string,
        //TODO check quantity on subscription
        // @ts-ignore
        quantity: subscription.quantity,
        cancel_at_period_end: subscription.cancel_at_period_end,
        cancel_at: subscription.cancel_at ?? null,
        canceled_at: subscription.canceled_at ?? null,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        created: subscription.created,
        ended_at: subscription.ended_at ?? null,
        trial_start: subscription.trial_start ?? null,
        trial_end: subscription.trial_end ?? null
    };

    const { error }: any = await new Promise(async (resolve, reject) => {
        await Subscription.updateOne({ id: subscription.id }, subscriptionData, { upsert: true })
            .then((d) => resolve(d)).catch((err) => {
                console.error(err);
                reject({ error });
            });
    })

    if (error) throw error;
    // console.log(
    //     `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
    // );

    // For a new subscription copy the billing details to the customer object.
    // NOTE: This is a costly operation and should happen at the very end.
    if (createAction && subscription.default_payment_method && uuid) {
        devLog.debug('Copying billing details to customer object');
        //@ts-ignore
        await copyBillingDetailsToCustomer(
            uuid,
            subscription.default_payment_method as Stripe.PaymentMethod
        );
    }
};

const upsertCustomer = async (customer: Stripe.Customer) => {
    await connectDB();

    await User.findOneAndUpdate({ email: customer.email }, { stripeCustomerId: customer.id }, { upsert: true }).then(() => { }).catch((err) => {
        console.error(err);
        throw err;
    });
}

// a function to delete a subscription from db
// const deleteSubscription = async (subscriptionId: string) => {
//     await connectDB();

//     const { error }: any = await new Promise(async (resolve, reject) => {
//         await Subscription.deleteOne({ id: subscriptionId })
//             .then((d) => resolve(d)).catch((err) => {
//                 console.log(err);
//                 reject({ error });
//             });
//     })

//     if (error) throw error;
//     console.log(
//         `Deleted subscription [${subscriptionId}]`
//     );
// }

// same for price, product, coupon
const deletePrice = async (priceId: string) => {
    await connectDB();

    const { error }: any = await new Promise(async (resolve, reject) => {
        await Price.deleteOne({ id: priceId })
            .then((d) => resolve(d)).catch((err) => {
                console.error(err);
                reject({ error });
            });
    })

    if (error) throw error;
    console.log(
        `Deleted price [${priceId}]`
    );
}

const deleteProduct = async (productId: string) => {
    await connectDB();

    const { error }: any = await new Promise(async (resolve, reject) => {
        await Product.deleteOne({ id: productId })
            .then((d) => resolve(d)).catch((err) => {
                console.log(err);
                reject({ error });
            });
    })

    if (error) throw error;
    console.log(
        `Deleted product [${productId}]`
    );
}

const deleteCoupon = async (couponId: string) => {
    await connectDB();

    const { error }: any = await new Promise(async (resolve, reject) => {
        await Price.deleteOne({ id: couponId })
            .then((d) => resolve(d)).catch((err) => {
                console.log(err);
                reject({ error });
            });
    })

    if (error) throw error;
    console.log(
        `Deleted coupon [${couponId}]`
    );
}

const getActiveProductsWithPrices = async () => {
    try {
        await connectDB();
        const products = await Product.aggregate([
            {
                $match: {
                    active: true
                }
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: 'id',
                    foreignField: 'product_id',
                    as: 'prices'
                }
            },
            {
                $match: {
                    'prices.active': true
                }
            },
            {
                $sort: {
                    'metadata.index': 1
                }
            }
        ])

        products?.map(product => {
            product._id = product._id.toString();
            product.features?.map((feature: any) => {
                feature._id = feature._id.toString();
            })
            product.prices?.map((price: any) => {
                price._id = price._id.toString();
            })
        })

        // console.log(products?.[0].prices, 'products');

        return products;

    } catch (err: any) {
        console.log(err);
        return [];
    }
}

// getActiveProductsWithPrices();

const getSubscriptions = async (productIds: string[]) => {
    try {
        const auth = await authenticate();
        if (!auth || !auth.user) throw new Error('Not authenticated');

        // 3 sec delay
        // await new Promise((resolve) => setTimeout(resolve, 70000));

        await connectDB();
        mongoose.set('strictPopulate', false)

        const subscriptions = await Subscription.find({
            user_email: auth.user.email,
            product_id: { $in: productIds },
            status: { $in: ['active', 'trialing'] }
        })

        return JSON.parse(JSON.stringify(subscriptions));
    } catch (err: any) {
        console.log(err);
        return [];
    }
}

// getSubscriptions();
// main();

const createCheckoutSession = async ({ price, quantity = 1, metadata = {} }: { price: PriceType, quantity?: number, metadata?: Record<string, any> }) => {
    try {
        const auth = await authenticate()
        const user = auth.user;

        // 3. Retrieve or create the customer in Stripe
        const customer = await createOrRetrieveCustomer({
            email: user?.email || '',
            phone: user?.phone || '',
            name: user?.name || ''
        });

        // 4. Create a checkout session in Stripe
        let session;
        const priceType = price.type as unknown as string;
        if (priceType === 'recurring') {
            session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                billing_address_collection: 'required',
                customer,
                customer_update: {
                    address: 'auto'
                },
                line_items: [
                    {
                        price: price.id,
                        quantity
                    }
                ],
                mode: 'subscription',
                allow_promotion_codes: true,
                subscription_data: {
                    trial_from_plan: true,
                    metadata
                },
                success_url: `${getURL()}/dashboard`,
                cancel_url: `${getURL()}/`
            } as any);
        } else if (priceType === 'one_time') {
            session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                billing_address_collection: 'required',
                customer,
                customer_update: {
                    address: 'auto'
                },
                line_items: [
                    {
                        price: price.id,
                        quantity
                    }
                ],
                mode: 'payment',
                allow_promotion_codes: true,
                success_url: `${getURL()}/dashboard`,
                cancel_url: `${getURL()}/`
            });
        }

        if (session) {
            return { sessionId: session.id }
        } else {
            throw new Error('Could not create checkout session');
        }
    } catch (err: any) {
        console.error(err);
        return new Response(JSON.stringify(err), { status: 500 });
    }
}

export { createCheckoutSession, createOrRetrieveCustomer, deleteCoupon, deletePrice, deleteProduct, getActiveProductsWithPrices, getSubscriptions, manageSubscriptionStatusChange, upsertCouponRecord, upsertCustomer, upsertPriceRecord, upsertProductRecord };

