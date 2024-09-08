"use server";

import {
  Coach,
  Session as SessionModel,
  Subscription as SubscriptionModel,
  User,
  UserStats,
} from "@/models";
// import UserStats from "@/models/Userstats";
import { Subscription } from "@/types/subscription";
import { Stats, User as UserType } from "@/types/user";
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
};

export const saveDataInDb = async (
  filter: Record<string, any>,
  data: Record<string, any>
) => {
  try {
    await connectDB();

    const pageData = await mongoose.connection.db.collection("data");
    await pageData.updateOne(filter, { $set: data }, { upsert: true });
  } catch (error: any) {
    return null;
  }
};

// delete data
export const deleteDataFromDb = async (filter: Record<string, any>) => {
  try {
    await connectDB();

    const pageData = await mongoose.connection.db.collection("data");
    await pageData.deleteOne(filter);
  } catch (error: any) {
    return null;
  }
}

export const getUserDataWithSubscription = async (email: string) => {
  try {
    await connectDB();

    const data: UserType & {
      subscriptions?: Subscription[];
      classes?: any[];
      stats: Stats;
    } = {} as any;

    const past40Min = new Date(new Date().getTime() - 40 * 60 * 1000);

    const user = (await User.findOne({ email })
      .populate("stats", "-_id")
      .populate("sessions", undefined, undefined, {
        startTime: { $gte: past40Min },
      })
      .select("razorpayCustomerId name email phone")
      .lean()) as UserType & { _id: string };

    if (!user) return null;
    Object.assign(data, user);

    // if (!user.razorpayCustomerId)
    //   return data

    const subscriptions = await SubscriptionModel.find({
      userId: user._id,
      status: { $in: ["active", "paused"] },
    })
      .populate("plan", "-_id name amount currency period interval programId")
      // .select("id plan_id customer_id current_end current_start status")
      .lean();
    data.subscriptions = subscriptions as any;


    return data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

// get user data from database in above format using aggregation
export const getCompleteUserData = async (email: string) => {
  try {
    await connectDB();
    const userData = await User.aggregate([
      {
        $match: { email },
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "_id",
          foreignField: "user_id",
          as: "subscriptions",
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "_id",
          foreignField: "user",
          as: "classes",
        },
      },
      {
        $unwind: {
          path: "$classes",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "slots",
          localField: "classes.slot",
          foreignField: "_id",
          as: "classes.slotDetails",
        },
      },
      {
        $unwind: {
          path: "$classes.slotDetails",
          preserveNullAndEmptyArrays: true,
        },
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
              createdAt: 1,
            },
          },
        },
      },
    ]);

    return userData;
  } catch (error: any) {
    return null;
  }
};

export const addClass = async (
  email: string,
  classData: Record<string, string>
) => {
  // save class in database
  try {
    await connectDB();
    const _id = classData._id;
    delete classData._id;

    if (_id) {
      const data = await SessionModel.findOneAndUpdate(
        { user: email, _id: new mongoose.Types.ObjectId(_id) },
        { $set: classData },
        { upsert: true, new: true }
      );
      return data;
    }

    const data = await SessionModel.create({ user: email, ...classData });
    return data;
  } catch (error: any) {
    return null;
  }
};

// ========================= save images (gallery) in database =========================
const images = [
  "/images/Cardio.png",
  "/images/Strength.png",
  "/images/Yoga.png",
  "/images/No equipment.png",
  "/images/Toning.png",
  "/images/Walking.png",
];

// saveDataInDb({ key: "gallery", page: 'programs' }, { images });
// ======================================================================================

export const getUserData = async (
  email: string,
  options?: {
    select?: string;
  }
) => {
  const { select } = options || {};

  const user = await User.findOne({ email }, select).lean();

  return user;
};

export const getUserById = async (id: string) => User.findById(id).lean();

export const saveUserStats = async (
  email: string,
  data: Partial<
    // make stats optional
    Omit<Stats, "email">
  >,
  { upsert }: { upsert?: boolean } = { upsert: false }
) => {
  try {
    await connectDB();

    const stats = await UserStats.findOneAndUpdate(
      { email },
      { $set: data },
      { upsert, new: true }
    );

    return { stats };
  } catch (error: any) {
    return { error: error.message ?? "Failed to save user data" };
  }
};

export const getCoaches = async ({ programIds }: { programIds: string[] }) => {
  try {
    await connectDB();

    // get coaches associated with the program
    const coaches = await Coach.find(
      {
        // check if some of the programIds are present in the coach's programIds
        programIds: { $in: programIds },
      },
      "-_id -calendlyToken"
    )
      .populate("programs", "name -_id -coaches id")
      .lean();

    if (!coaches.length)
      return {
        error:
          "No coaches found for your subscriptions. Please try again later.",
      };

    return coaches;
  } catch (error: any) {
    return { error: "Failed to fetch coaches" };
  }
};
