import { getDataFromDb } from "@/lib/dbHelpers";
import { unstable_cache as nextCache } from "next/cache";

export const getCachedData = (key: string) => nextCache(
    () => getDataFromDb({ key }),
    [key],
    {
        tags: [key],
        revalidate: process.env.NODE_ENV === 'development' ? 5 : 60 * 60 * 24, // 24 hours
    }
)