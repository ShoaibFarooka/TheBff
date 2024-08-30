import _mongoose, { connect } from "mongoose";
import { devLog } from "./helpers";
import { logger } from "./logger";

declare global {
    var mongoose: {
        promise: ReturnType<typeof connect> | null;
        conn: typeof _mongoose | null;
    };
}

const MONGODB_URI = process.env.MONGO_URI

if (!MONGODB_URI || MONGODB_URI.length === 0) {
    throw new Error("Please add your MongoDB URI to .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    
    if (cached.conn) {
        // devLog("🚀 Using cached connection")
        devLog.error("🚀 Using cached connection")
        return cached.conn;
    }
    
    if (!cached.promise) {
        logger.log(MONGODB_URI)
    
        const opts = {
            bufferCommands: false,
        };

        cached.promise = connect(MONGODB_URI!, opts)
            .then((mongoose) => {
                devLog("✅ New connection established")
                return mongoose;
            })
            .catch((error) => {
                console.error("❌ Connection to database failed");
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export async function disconnectDB() {
    if (cached.conn) {
        await cached.conn.disconnect();
        cached.conn = null;
    }
}

export async function withDb<T>(fn: () => Promise<T>): Promise<T> {
    await connectDB();
    return fn();
}

export default connectDB;
