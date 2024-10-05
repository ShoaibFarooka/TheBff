import { StaticImageData } from "next/image";

import { savePageData } from "@/lib/db";

type Program = {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    image: string | StaticImageData;
}

const classes: Program[] = [
    {
        id: "dance",
        title: "Personalized Online Dance Classes to Get You Moving",
        subTitle: "Dance",
        description: "Looking for a fun workout alternative? Try our online dance classes! You can get fit, learn different styles, or prepare for your wedding dance. It's really cool! Don't just take our word for it - come join us and see for yourself just how fun our classes are!",
        image: "/images/stock/dance.jpeg", // inside the public folder
    },
    {
        id: "at-gym-workouts",
        title: "Upgrade Your Gym Game with An Extra Dose Of Power",
        subTitle: "At-Gym",
        description: "Sweat now, shine later. We offer it all - Strength training, HIIT, Functional Fitness, Crossfit, Bodybuilding, and customized workout plans. These high-energy, high-intensity online fitness classes will take your usual gym routine to the next level! Get ready to crush your goals with our expert guidance.",
        image: "/images/stock/gym.jpeg",
    },
    {
        id: "at-home-workout",
        title: "No Time for Gym? Join Our Live Online Fitness Workouts",
        subTitle: "At-Home",
        description: "Join our live interactive fitness workout classes to get fit without leaving your house. Choose from a variety of options including bodyweight training, resistance band training, HIIT, Pilates, and personalized workout plans tailored to your fitness goals.",
        image: "/images/stock/home-gym.jpeg",
    },
    {
        id: "yoga",
        title: "BFF- Your Personal Yoga Mat Mate and Way to Mindfulness",
        subTitle: "Yoga",
        description: "Want to reduce stress and stay mindful while you exercise? Try our online live yoga classes that focus on the full mind-body connection. Whether you're a seasoned yogi or a newbie to the mat, our interactive yoga classes offer something for everyone. Choose your type as Hatha, Vinyasa, Ashtanga, or Power Yoga or simply let us help you find it!",
        image: "/images/stock/yoga.jpeg",
    },
    {
        id: "meditation",
        title: "Find your Zen, Anytime, Anywhere with Our Meditation Classes",
        subTitle: "Meditation",
        description: "Need a break from the daily grind? Our guided meditation classes offer a sanctuary of serenity and relaxation. Increase your focus and improve your overall well-being. Choose your starting point - beginner, intermediate, or advanced and Let BFF’s experts guide you to a healthier, more purposeful future.",
        image: "/images/stock/meditation.jpeg",
    },
    {
        id: "nutrition",
        title: "Improve Your Gut Health - Consult Experts on Diet & Nutrition",
        subTitle: "Nutrition",
        description: "Need some help with lifestyle changes? Want to say goodbye to fad diets and quick fixes? We know it’s a battle! But your health is our priority. We're here to help you with weight management, PCOS (PCOD) relief plan, psoriasis relief, thyroid relief, general nutrition guidance, and more.",
        image: "/images/stock/nutrition.jpeg",
    },
    {
        id: "in-home-training",
        title: "Introducing India’s 1st In-Home Workout with Complete Home Gym Setup",
        subTitle: "In-Home",
        description: "We guarantee the fitness results you’re looking for. Our unique in-home workout system is perfect if you have limited time and space. But that's not all – we prioritize convenience and affordability too! Time to prioritize your health and well-being without worrying about the cost of care. Ditch excuses with BFF’s In-Home workout sessions.",
        image: "/images/stock/in-home.jpeg",
    },
    {
        id: "sound-healing",
        title: "Heal Your Mind, Body & Soul with Sound Healing Therapy",
        subTitle: "Sound Healing",
        description: "Experience the power of sound healing therapy. Our sound healing classes are designed to help you relax, reduce stress, and improve your overall well-being. Our expert instructors will guide you through a transformative journey to help you find inner peace and balance.",
        image: "/images/stock/sound-healing.jpeg",
    }
];


async function seedClasses() {
    try {
        // await connectDB();

        await savePageData('home', { classes });

        console.log("Classes added successfully");
    } catch (error) {
        console.log("Error adding classes: ", error);
    }
}

// const args = process.argv.slice(2);

// args.includes("--seed-classes") && seedClasses();


export { classes, seedClasses };

