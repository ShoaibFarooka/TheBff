import connectDB from "@/lib/dbConnection";
import Coach, { CoachType } from "@/models/coach";
import consola from "consola";

/**
 * Add/Update/Delete Coaches in the list and run the seeders
 * 
 * For each coach, you can add the following details:
 * - name: Name of the coach
 * - email: Email of the coach
 * - profileImage: Profile image of the coach
 * - calendarLink: Register on calendly.com and create a new event. Copy the link and paste it here.
 * - programIds: Program ids along with subids separated by . (dot)
 * - calendlyToken: Calendly token for the coach. You can get this by inspecting the network tab in the browser when you open the calendly link.
 */

const coaches: CoachType[] = [
    {
        name: "Coach 1",
        email: 'coach1@thebff.com',
        profileImage: "https://via.placeholder.com/150",
        calendarLink: "https://calendly.com/thebffupdates/coaching-class",
        programIds: ["dance.fitness", "at-gym-workout.strength-training"],
        calendlyToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzIzMjI1MjU2LCJqdGkiOiI0ZmRiNzk4My1mYmIwLTRiOTItOTk3MC0zZTMyMDgyZGY5YWEiLCJ1c2VyX3V1aWQiOiI4MzEyZTAwNC0zZTY5LTQ1NTAtYTNjZi1iOThjZjZmODY4YWEifQ.cD03tgWyHLU73_QBpUJGhkoZ3wMksNKEYePz59mnlArZIX-H1_RP97w2VdXkp0r928xw00blKxdVW0t8tkFLpA'
    },
    {
        name: "Coach 2",
        email: 'coach2@thebff.com',
        profileImage: "https://via.placeholder.com/150",
        calendarLink: "https://calendar.google.com",
        programIds: ["at-gym-workout.strength-training"],
        calendlyToken: 'mytoken'
    }
]

async function seedCoaches() {
    try {
        const deleteAll = await consola.prompt("Delete all coaches? (yes/no)", {
            type: "confirm",
        });

        console.log("Seeding coaches...")
        await connectDB();

        if (deleteAll) {
            await Coach.deleteMany({});
        }

        await Coach.insertMany(coaches)
        console.log("Coaches seeded successfully.")
    } catch (error) {
        console.log("Error seeding coaches:", error)
    }
}

export { seedCoaches };

