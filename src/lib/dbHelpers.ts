import { default as Classes } from "@/models/Class";
import User from "@/models/User";
import { User as UserType } from "@/types/user";
import mongoose from "mongoose";
import { connectDB } from "./db";

// import '@/models/plan'
// import '@/models/classes'
// import '@/models/membership'

export const getDataFromDb = async (filter: Record<string, any>) => {
    try {
        await connectDB();

        const pageData = await mongoose.connection.db.collection("data");
        return await pageData.findOne(filter);
    } catch (error: any) {
        return null;
    }
}

export const saveDataInDb = async (filter: Record<string, any>, data: Record<string, any>) => {
    try {
        await connectDB();

        const pageData = await mongoose.connection.db.collection("data");
        await pageData.updateOne(filter, { $set: data }, { upsert: true });
    } catch (error: any) {
        return null
    }
}


export const getUserDataWithSubscription = async (email: string) => {
    try {
        await connectDB();

        const data = await User.aggregate([
            {
                $match: { email }
            },
            {
                $lookup: {
                    from: "classes",
                    localField: "email",
                    foreignField: "user",
                    as: "classes"
                }
            },
            {
                $lookup: {
                    from: 'subscriptions',
                    localField: 'email',
                    foreignField: 'user_email',
                    as: 'subscriptions'
                }
            },
            {
                $unwind: {
                    path: "$subscriptions",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'subscriptions.product_id',
                    foreignField: 'id',
                    as: 'products'
                }
            },
            {
                $unwind: {
                    path: "$products",
                    preserveNullAndEmptyArrays: true
                }
            },
            // add products to subscriptions
            {
                $group: {
                    _id: { $toString: "$_id" },
                    name: { $first: "$name" },
                    email: { $first: "$email" },
                    phone: { $first: "$phone" },
                    emailVerified: { $first: "$emailVerified" },
                    phoneVerified: { $first: "$phoneVerified" },
                    role: { $first: "$role" },
                    avatar_url: { $first: "$avatar_url" },
                    billing_address: { $first: "$billing_address" },
                    payment_method: { $first: "$payment_method" },
                    stripeCustomerId: { $first: "$stripeCustomerId" },
                    classes: { $push: "$classes" },
                    subscriptions: { $push: "$subscriptions" },
                    products: { $push: "$products" },
                }
            }
            // {
            //     // convert _id to string
            //     $addFields: {
            //         "products._id": { $toString: "$products._id" },
            //         "subscriptions._id": { $toString: "$subscriptions._id" },
            //         "classes._id": { $toString: "$classes._id" }
            //     }
            // }
        ])

        // console.log('fetching', data)
        // const d = await User.findOne({ email: 'siddiquiaffan201@gmail.com' }).populate('subscription');
        // console.log(data[0], '=> d')

        return data?.length ? data[0] : null;
    } catch (error: any) {
        return null
    }
}


/*
User data
{
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  _id: '61f3e3e3e3e3e3e3e3e3e3e3',
  role: 3,
  subscriptions: [
    {
      _id: '61f3e3e3e3e3e3e3e3e3e3e3',
      id: 'prod_1234567890',
      user_email: 'john.doe@exmaple.com',
      user_id: '61f3e3e3e3e3e3e3e3e3e3e3',
      product_id: 'prod_1234567890',
      product: {
        id: 'prod_1234567890',
        name: 'Gold',
        description: 'Gold plan',
        price: 1000,
        duration: 30,
        currency: 'usd',
        active: true,
        created: 1642816000
      }
    },
    {
      _id: '61f3e3e3e3e3e3e3e3e3e3e3',
      id: 'prod_1234567890',
      user_email: 'john.doe@example.com',
      user_id: '61f3e3e3e3e3e3e3e3e3e3e3',
      product_id: 'prod_1234567890',
      product: {
        id: 'prod_1234567890',
        name: 'Gold',
        description: 'Gold plan',
        price: 1000,
        duration: 30,
        currency: 'usd',
        active: true,
        created: 1642816000
      }
    }
  ],
  classes: [
    {
      _id: '61f3e3e3e3e3e3e3e3e3e3e3',
      user: 'sgvdhbsdshdskhbdshbdksd',
      coach: '61f3e3e3e3e3e3e3e3e3e3e3',
      program: '61f3e3e3e3e3e3e3e3e3e3e3',
      meetLink: 'https://meet.google.com/lookup/abc',
      date: '2022-02-01T00:00:00.000Z',
      slot: '61f3e3e3e3e3e3e3e3e3e3e3',
      slotDetails: {
        _id: '61f3e3e3e3e3e3e3e3e3e3e3',
        startTime: '2022-02-01T00:00:00.000Z',
        endTime: '2022-02-01T00:00:00.000Z',
        coach: '61f3e3e3e3e3e3e3e3e3e3e3',
        createdAt: 1642816000
      }
    }
  ]
}
*/

import '@/models/Subscription';

// get user data from database in above format using aggregation
export const getCompleteUserData = async (email: string) => {
    try {
        await connectDB();
        const userData = await User.aggregate([
            {
                $match: { email }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "subscriptions"
                }
            },
            {
                $lookup: {
                    from: "classes",
                    localField: "_id",
                    foreignField: "user",
                    as: "classes"
                }
            },
            {
                $unwind: {
                    path: "$classes",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "slots",
                    localField: "classes.slot",
                    foreignField: "_id",
                    as: "classes.slotDetails"
                }
            },
            {
                $unwind: {
                    path: "$classes.slotDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    phone: 1,
                    role: 1,
                    subscriptions: 1,
                    classes: {
                        _id: 1,
                        user: 1,
                        coach: 1,
                        program: 1,
                        meetLink: 1,
                        date: 1,
                        slot: 1,
                        slotDetails: {
                            _id: 1,
                            startTime: 1,
                            endTime: 1,
                            coach: 1,
                            createdAt: 1
                        }
                    }
                }
            }
        ]);

        return userData;
    } catch (error: any) {
        return null;
    }
}

// getCompleteUserData('siddiquiaffan201@gmail.com').then(console.log)

export const addClass = async (email: string, classData: Record<string, string>) => {
    // save class in database
    try {
        await connectDB();
        const _id = classData._id;
        delete classData._id;

        if (_id) {
            const data = await Classes.findOneAndUpdate({ user: email, _id: new mongoose.Types.ObjectId(_id) }, { $set: classData }, { upsert: true, new: true });
            return data;
        }

        const data = await Classes.create({ user: email, ...classData });
        return data;
    } catch (error: any) {
        return null;
    }
}

// ========================= save images (gallery) in database =========================
const images = [
    "/images/Cardio.png",
    "/images/Strength.png",
    "/images/Yoga.png",
    "/images/No equipment.png",
    "/images/Toning.png",
    "/images/Walking.png"
];

// saveDataInDb({ key: "gallery", page: 'programs' }, { images });
// ======================================================================================

export const getUserData = async (email: string, options?: {
    select?: string;
}): Promise<UserType & Document | null> => {
    const { select } = options || {};

    const user = await User.findOne({ email }, select, { lean: true })

    return user as any;
}