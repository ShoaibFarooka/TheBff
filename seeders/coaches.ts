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
        name: "Gurpreet Singh",
        email: 'gaggisidhugaggi95@gmail.com',
        profileImage: "/images/coaches/coach_gurpreet_singh.png",
        calendarLink: "https://calendly.com",
        programIds: ["online-gym-training.cardio", "online-gym-training.posture-correction", "online-gym-training.workout-plan", "yoga.online-personal-yoga-classes", "yoga.online-group-yoga-classes", "yoga.in-home-personal-yoga-classes", "yoga.in-home-group-yoga-classes", "yoga.yoga-plan", "nutrition.weight-management", "nutrition.diseases-relief-plan", "nutrition.modelling-specific", "nutrition.sports-nutrition", "nutrition.general-guidance", "in-home-training.in-home-fitness", "in-home-training.specialized-training", "in-home-training.holistic-wellness", "sound-healing.chakra-balancing", "sound-healing.deep-relaxation", "sound-healing.group-sound-healing"],
        calendlyToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI1OTY1MjEwLCJqdGkiOiIzY2Y3NWY4MS05YTQ2LTQzYWEtOTdiNi1jOWU4MDYzN2Q5NmIiLCJ1c2VyX3V1aWQiOiI2YzI0Yjk1Yy02ZDBiLTRlYTAtOGFkMC04MzVlODEwM2NmNGUifQ.EIdHcelUl04Y5gl3XOLQ3LmuffSHCoyM1vx6nHn-a3OjYNOnS4NBln0YKFoK8iPYqeKjJ5MuARiRtNU7Y6ASCw'
    },
    {
        name: "Harpreet Singh",
        email: 'gaggisidhugaggi95@gmail.com',
        profileImage: "/images/coaches/coach_harpreet_singh.png",
        calendarLink: "https://calendly.com",
        programIds: ["online-gym-training.cardio", "online-gym-training.posture-correction", "online-gym-training.workout-plan", "in-home-training.in-home-fitness", "in-home-training.specialized-training", "in-home-training.holistic-wellness"],
        calendlyToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI1OTY1MjEwLCJqdGkiOiIzY2Y3NWY4MS05YTQ2LTQzYWEtOTdiNi1jOWU4MDYzN2Q5NmIiLCJ1c2VyX3V1aWQiOiI2YzI0Yjk1Yy02ZDBiLTRlYTAtOGFkMC04MzVlODEwM2NmNGUifQ.EIdHcelUl04Y5gl3XOLQ3LmuffSHCoyM1vx6nHn-a3OjYNOnS4NBln0YKFoK8iPYqeKjJ5MuARiRtNU7Y6ASCw'
    },
    {
        name: "Arpandeep Singh",
        email: 'gaggisidhugaggi95@gmail.com',
        profileImage: "/images/coaches/coach_arpandeep_singh.png",
        calendarLink: "https://calendly.com",
        programIds: ["online-gym-training.cardio", "online-gym-training.posture-correction", "online-gym-training.workout-plan", "yoga.online-personal-yoga-classes", "yoga.online-group-yoga-classes", "yoga.in-home-personal-yoga-classes", "yoga.in-home-group-yoga-classes", "yoga.yoga-plan", "nutrition.weight-management", "nutrition.diseases-relief-plan", "nutrition.modelling-specific", "nutrition.sports-nutrition", "nutrition.general-guidance", "in-home-training.in-home-fitness", "in-home-training.specialized-training", "in-home-training.holistic-wellness"],
        calendlyToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI1OTY1MjEwLCJqdGkiOiIzY2Y3NWY4MS05YTQ2LTQzYWEtOTdiNi1jOWU4MDYzN2Q5NmIiLCJ1c2VyX3V1aWQiOiI2YzI0Yjk1Yy02ZDBiLTRlYTAtOGFkMC04MzVlODEwM2NmNGUifQ.EIdHcelUl04Y5gl3XOLQ3LmuffSHCoyM1vx6nHn-a3OjYNOnS4NBln0YKFoK8iPYqeKjJ5MuARiRtNU7Y6ASCw'
    },
    {
        name: "Diksha Parihar",
        email: 'gaggisidhugaggi95@gmail.com',
        profileImage: "/images/coaches/coach__diksha_parihar.png",
        calendarLink: "https://calendly.com",
        programIds: ["nutrition.weight-management", "nutrition.diseases-relief-plan", "nutrition.modelling-specific", "nutrition.sports-nutrition", "nutrition.general-guidance"],
        calendlyToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI1OTY1MjEwLCJqdGkiOiIzY2Y3NWY4MS05YTQ2LTQzYWEtOTdiNi1jOWU4MDYzN2Q5NmIiLCJ1c2VyX3V1aWQiOiI2YzI0Yjk1Yy02ZDBiLTRlYTAtOGFkMC04MzVlODEwM2NmNGUifQ.EIdHcelUl04Y5gl3XOLQ3LmuffSHCoyM1vx6nHn-a3OjYNOnS4NBln0YKFoK8iPYqeKjJ5MuARiRtNU7Y6ASCw'
    },
    {
        name: "Dinesh Maru",
        email: 'gaggisidhugaggi95@gmail.com',
        profileImage: "/images/coaches/coach_dinesh_maru.png",
        calendarLink: "https://calendly.com",
        programIds: ["dance.online-fitness", "dance.in-home-fitness", "dance.online-dance-styles", "dance.in-home-dance-style", "dance.wedding-choreography"],
        calendlyToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI1OTY1MjEwLCJqdGkiOiIzY2Y3NWY4MS05YTQ2LTQzYWEtOTdiNi1jOWU4MDYzN2Q5NmIiLCJ1c2VyX3V1aWQiOiI2YzI0Yjk1Yy02ZDBiLTRlYTAtOGFkMC04MzVlODEwM2NmNGUifQ.EIdHcelUl04Y5gl3XOLQ3LmuffSHCoyM1vx6nHn-a3OjYNOnS4NBln0YKFoK8iPYqeKjJ5MuARiRtNU7Y6ASCw'
    },
    {
        name: "Prachi Dabas",
        email: 'gaggisidhugaggi95@gmail.com',
        profileImage: "/images/coaches/coach_prachi_dabas.png",
        calendarLink: "https://calendly.com",
        programIds: ["yoga.online-personal-yoga-classes", "yoga.online-group-yoga-classes", "yoga.in-home-personal-yoga-classes", "yoga.in-home-group-yoga-classes", "yoga.yoga-plan"],
        calendlyToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI1OTY1MjEwLCJqdGkiOiIzY2Y3NWY4MS05YTQ2LTQzYWEtOTdiNi1jOWU4MDYzN2Q5NmIiLCJ1c2VyX3V1aWQiOiI2YzI0Yjk1Yy02ZDBiLTRlYTAtOGFkMC04MzVlODEwM2NmNGUifQ.EIdHcelUl04Y5gl3XOLQ3LmuffSHCoyM1vx6nHn-a3OjYNOnS4NBln0YKFoK8iPYqeKjJ5MuARiRtNU7Y6ASCw'
    },
    {
        name: "Ashif Khan",
        email: 'gaggisidhugaggi95@gmail.com',
        profileImage: "/assets/coach_ashif.png",
        calendarLink: "https://calendly.com",
        programIds: ["online-gym-training.cardio", "online-gym-training.posture-correction", "online-gym-training.workout-plan", "in-home-training.in-home-fitness"],
        calendlyToken: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI1OTY1MjEwLCJqdGkiOiIzY2Y3NWY4MS05YTQ2LTQzYWEtOTdiNi1jOWU4MDYzN2Q5NmIiLCJ1c2VyX3V1aWQiOiI2YzI0Yjk1Yy02ZDBiLTRlYTAtOGFkMC04MzVlODEwM2NmNGUifQ.EIdHcelUl04Y5gl3XOLQ3LmuffSHCoyM1vx6nHn-a3OjYNOnS4NBln0YKFoK8iPYqeKjJ5MuARiRtNU7Y6ASCw'
    },
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

