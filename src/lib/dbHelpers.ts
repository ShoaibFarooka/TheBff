import mongoose, { Mongoose } from "mongoose";
import { connectDB } from "./db";
import User from "@/models/user";
import Classes from "@/models/classes";

// import '@/models/plan'
// import '@/models/classes'
// import '@/models/membership'

export const getPageData = async (pageName: string) => {

    try {
        await connectDB();

        const pageData = await mongoose.connection.db.collection("pageData");
        return await pageData.findOne({ pageName });
    } catch (error: any) {
        return null;
    }
}

export const savePageData = async (pageName: string, data: Record<string, any>) => {

    try {
        await connectDB();

        const pageData = await mongoose.connection.db.collection("pageData");
        await pageData.updateOne({ pageName }, { $set: data }, { upsert: true });
    } catch (error: any) {
        return null
    }
}

export const getUserData = async (email: string) => {
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
                    from: 'memberships',
                    localField: 'email',
                    foreignField: 'user',
                    as: 'membership'
                }
            },
            {
                $unwind: {
                    path: "$membership",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'plans',
                    localField: 'membership.plan',
                    foreignField: '_id',
                    as: 'plan'
                }
            },
            {
                $unwind: {
                    path: "$plan",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                // convert _id to string
                $addFields: {
                    "plan._id": { $toString: "$plan._id" },
                    "membership._id": { $toString: "$membership._id" },
                    "classes._id": { $toString: "$classes._id" }
                }
            }
        ])

        return data?.length ? data[0] : null;
    } catch (error: any) {
        return null
    }
}

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