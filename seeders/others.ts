/*
 * Add/Update/Delete Data (for data collection in the db) in the list and run the seeders
*/

import connectDB from "@/lib/dbConnection";
import { deleteDataFromDb, saveDataInDb } from "@/lib/dbHelpers";
import consola from "consola";
import { revalidateTags } from "./utils";


// ======================= Gallery Images =======================

/**
 * Gallery images for the programs page
 */
const gallery: { title: string, url: string }[] = [
    {
        title: "Cardio",
        url: "https://placeholder.com/300x200",
    },
    {
        title: "Strength",
        url: "https://placeholder.com/300x200",
    },
    {
        title: "Yoga",
        url: "https://placeholder.com/300x200",
    },
    {
        title: "No equipment",
        url: "https://placeholder.com/300x200",
    },
    {
        title: "Toning",
        url: "https://placeholder.com/300x200",
    },
    {
        title: "Walking",
        url: "https://placeholder.com/300x200",
    }
]

export const seedProgramsGallery = async () => {
    try {
        const deleteAll = await consola.prompt("Delete all gallery images? (yes/no)", {
            type: "confirm",
        });

        console.log("Seeding gallery images...")
        await connectDB();

        if (deleteAll) {
            await deleteDataFromDb({ key: "gallery" });
        }

        await saveDataInDb({ key: "gallery" }, { images: gallery });

        // revalidate gallery images
        await revalidateTags(["gallery"]);
        
        console.log("Gallery images seeded successfully.")
    } catch (error) {
        console.log("Error seeding gallery images:", error)
    }
}

// ======================= Gallery Images =======================


// ======================= Suggested Plans =======================
const suggestedPlans: { title: string, planId: string }[] = [
    {
        title: "Dance Premium 1 month",
        planId: "plan_OpxCKsBEnjkkxF"
    }
]

export const seedSuggestedPlans = async () => {
    try {
        const deleteAll = await consola.prompt("Delete all (current) suggested plans? (yes/no)", {
            type: "confirm",
        });

        console.log("Seeding suggested plans...")
        await connectDB();

        if (deleteAll) {
            await deleteDataFromDb({ key: "suggestedPlans" });
        }

        await saveDataInDb({ key: "suggestedPlans" }, { plans: suggestedPlans });
        
        // revalidate suggested plans
        await revalidateTags(["suggestedPlans"]);
        
        console.log("Suggested plans seeded successfully.")

    } catch (error) {
        console.log("Error seeding suggested plans:", error)
    }
}