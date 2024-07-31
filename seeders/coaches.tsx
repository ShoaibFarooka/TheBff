import connectDB from "@/lib/dbConnection";
import Coach, { CoachType } from "@/models/coach";
import consola from "consola";

const coaches: CoachType[] = [
    {
        name: "Coach 1",
        email: 'coach1@thebff.com',
        profileImage: "https://via.placeholder.com/150",
        calendarLink: "https://calendar.google.com",
        programIds: ["dance", "gym"],
        calendlyToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzIxOTEzNDA1LCJqdGkiOiI5ZjdmZjJiNi1kZmUxLTQ5ZmYtODBhNy0zMzNkZjVlNGEyMGIiLCJ1c2VyX3V1aWQiOiJBQUFFUU9RUUpOU0lZUVJZIn0.WkcW3UekREfpnpcq7DepYmhUNYeBJ2-jSZ-11oTpeSA3Nc6VSx5I5Ot7qq38Vk1hCkCpZBC6XDUWTAP0ZVyOBQ'
    },
    {
        name: "Coach 2",
        email: 'coach2@thebff.com',
        profileImage: "https://via.placeholder.com/150",
        calendarLink: "https://calendar.google.com",
        programIds: ["gym"],
        calendlyToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzIxOTEzNDA1LCJqdGkiOiI5ZjdmZjJiNi1kZmUxLTQ5ZmYtODBhNy0zMzNkZjVlNGEyMGIiLCJ1c2VyX3V1aWQiOiJBQUFFUU9RUUpOU0lZUVJZIn0.WkcW3UekREfpnpcq7DepYmhUNYeBJ2-jSZ-11oTpeSA3Nc6VSx5I5Ot7qq38Vk1hCkCpZBC6XDUWTAP0ZVyOBQ'
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

