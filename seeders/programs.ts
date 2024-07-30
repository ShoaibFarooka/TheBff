import connectDB from "@/lib/dbConnection";
import { Program as ProgramModel } from "@/models";
import { ObjectId } from "mongoose";

export type Programs = {
    _id: string;
    programs: Program[];
}

export type Program = {
    id: string;
    name: string;
    title: string;
    description: string;
    image: string;
    caption?: string;
    featureTitle: string;
    featureDescription: string;
    features: Feature[];
    coaches: Coach[];
};

type Feature = {
    id: string | number;
    previewImage?: string;
    name: string;
    title: string;
    description: string;
    image: string;
};


type Coach = string | ObjectId;


const programs: Program[] = [
    {
        id: 'dance',
        name: 'Dance',
        title: 'Dance',
        description: "Looking for a fun workout alternative? Try our online dance classes! You can get fit, learn different styles or prepare for your wedding dance. It's really cool! Don't just take our word for it - come join us and see for yourself just how fun our classes are!",
        image: '/images/stock/dance.jpeg',
        caption: 'Personalized Online Dance Classes to Get You Moving',
        featureTitle: 'Features',
        featureDescription: 'Our dance classes are designed to help you learn and master different dance styles. Here are some of the features of our dance classes:',
        features: [
            {
                id: 1,
                name: 'Bollywood Dance',
                title: 'Bollywood Dance',
                description: 'Learn the latest Bollywood dance moves and get fit while having fun!',
                image: 'https://plus.unsplash.com/premium_photo-1684831694509-0e8ae2fc5a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 2,
                name: 'Salsa Dance',
                title: 'Salsa Dance',
                description: 'Get your groove on with our Salsa dance classes and impress everyone with your moves!',
                image: 'https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
                id: 3,
                name: 'Hip Hop Dance',
                title: 'Hip Hop Dance',
                description: 'Learn the latest Hip Hop dance moves and get fit while having fun!',
                image: 'https://plus.unsplash.com/premium_photo-1682089706055-d5ef14dc14e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 4,
                name: 'Contemporary Dance',
                title: 'Contemporary Dance',
                description: 'Get your groove on with our Contemporary dance classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1689885430776-bbefae37f993?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        ],
        coaches: []
    },
    {
        id: 'gym',
        name: 'Gym',
        title: 'At-Gym',
        description: "Sweat now, shine later. We offer it all - Strength training, HIIT, Functional Fitness, Crossfit, Bodybuilding, and customized workout plans. These high-energy, high-intensity online fitness classes will take your usual gym routine to the next level! Get ready to crush your goals with our expert guidance.",
        image: '/images/stock/gym.jpeg',
        caption: 'Upgrade Your Gym Game with An Extra Dose Of Power',
        featureTitle: 'Features',
        featureDescription: 'Our gym classes are designed to help you learn and master different gym styles. Here are some of the features of our gym classes:',
        features: [
            {
                id: 1,
                name: 'Strength Training',
                title: 'Strength Training',
                description: 'Learn the latest Strength Training moves and get fit while having fun!',
                image: 'https://plus.unsplash.com/premium_photo-1661580260078-4c554d5b01dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 2,
                name: 'HIIT',
                title: 'HIIT',
                description: 'Get your groove on with our HIIT classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1661281288734-49d3606234c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
                id: 3,
                name: 'Functional Fitness',
                title: 'Functional Fitness',
                description: 'Learn the latest Functional Fitness moves and get fit while having fun!',
                image: 'https://images.unsplash.com/photo-1581122584612-713f89daa8eb?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 4,
                name: 'Crossfit',
                title: 'Crossfit',
                description: 'Get your groove on with our Crossfit classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1661281288734-49d3606234c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
        ],
        coaches: []
    },
    {
        id: 'home-fitness',
        name: 'Home Fitness',
        title: 'At-Home',
        description: "Join our live interactive fitness workout classes to get fit without leaving your house. Choose from a variety of options including bodyweight training, resistance band training, HIIT, Pilates, and personalized workout plans tailored to your fitness goals.",
        image: '/images/stock/home-gym.jpeg',
        caption: 'No Time for Gym? Join Our Live Online Fitness Workouts',
        featureTitle: 'Features',
        featureDescription: 'Our home fitness classes are designed to help you learn and master different home fitness styles. Here are some of the features of our home fitness classes:',
        features: [
            {
                id: 1,
                name: 'Bodyweight Training',
                title: 'Bodyweight Training',
                description: 'Learn the latest Bodyweight Training moves and get fit while having fun!',
                image: 'https://plus.unsplash.com/premium_photo-1661580260078-4c554d5b01dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 2,
                name: 'Resistance Band Training',
                title: 'Resistance Band Training',
                description: 'Get your groove on with our Resistance Band Training classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1661281288734-49d3606234c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
                id: 3,
                name: 'HIIT',
                title: 'HIIT',
                description: 'Learn the latest HIIT moves and get fit while having fun!',
                image: 'https://images.unsplash.com/photo-1581122584612-713f89daa8eb?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 4,
                name: 'Pilates',
                title: 'Pilates',
                description: 'Get your groove on with our Pilates classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1661281288734-49d3606234c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
        ],
        coaches: []
    },
    {
        id: 'yoga',
        name: 'Yoga',
        title: 'Yoga',
        description: "Want to reduce stress and stay mindful while you exercise? Try our online live yoga classes that focus on the full mind-body connection. Whether you're a seasoned yogi or a newbie to the mat, our interactive yoga classes offer something for everyone. Choose your type as Hatha, Vinyasa, Ashtanga, or Power Yoga or simply let us help you find it!",
        image: '/images/stock/yoga.jpeg',
        caption: 'BFF- Your Personal Yoga Mat Mate and Way to Mindfulness',
        featureTitle: 'Features',
        featureDescription: 'Our yoga classes are designed to help you learn and master different yoga styles. Here are some of the features of our yoga classes:',
        features: [
            {
                id: 1,
                name: 'Hatha Yoga',
                title: 'Hatha Yoga',
                description: 'Learn the latest Hatha Yoga moves and get fit while having fun!',
                image: 'https://plus.unsplash.com/premium_photo-1661580260078-4c554d5b01dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 2,
                name: 'Vinyasa Yoga',
                title: 'Vinyasa Yoga',
                description: 'Get your groove on with our Vinyasa Yoga classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1661281288734-49d3606234c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
                id: 3,
                name: 'Ashtanga Yoga',
                title: 'Ashtanga Yoga',
                description: 'Learn the latest Ashtanga Yoga moves and get fit while having fun!',
                image: 'https://plus.unsplash.com/premium_photo-1682098431787-0e7f19c1a692?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 4,
                name: 'Power Yoga',
                title: 'Power Yoga',
                description: 'Get your groove on with our Power Yoga classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1661281288734-49d3606234c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
        ],
        coaches: []
    },
    {
        id: 'meditation',
        name: 'Meditation',
        title: 'Meditation',
        description: "Need a break from the daily grind? Our guided meditation classes offer a sanctuary of serenity and relaxation. Increase your focus and improve your overall well-being. Choose your starting point - beginner, intermediate, or advanced and Let BFF’s experts guide you to a healthier, more purposeful future.",
        image: '/images/stock/meditation.jpeg',
        caption: 'Find your Zen, Anytime, Anywhere with Our Meditation Classes',
        featureTitle: 'Features',
        featureDescription: 'Our meditation classes are designed to help you learn and master different meditation styles. Here are some of the features of our meditation classes:',
        features: [
            {
                id: 1,
                name: 'Beginner Meditation',
                title: 'Beginner Meditation',
                description: 'Learn the latest Beginner Meditation moves and get fit while having fun!',
                image: 'https://plus.unsplash.com/premium_photo-1661580260078-4c554d5b01dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 2,
                name: 'Intermediate Meditation',
                title: 'Intermediate Meditation',
                description: 'Get your groove on with our Intermediate Meditation classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1661281288734-49d3606234c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
                id: 3,
                name: 'Advanced Meditation',
                title: 'Advanced Meditation',
                description: 'Learn the latest Advanced Meditation moves and get fit while having fun!',
                image: 'https://images.unsplash.com/photo-1581122584612-713f89daa8eb?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        ],
        coaches: []
    },
    {
        id: 'nutrition',
        name: 'Nutrition',
        title: 'Nutrition',
        description: "Need some help with lifestyle changes? Want to say goodbye to fad diets and quick fixes? We know it’s a battle! But your health is our priority. We're here to help you with weight management, PCOS (PCOD) relief plan, psoriasis relief, thyroid relief, general nutrition guidance, and more.",
        image: '/images/stock/nutrition.jpeg',
        caption: 'Improve Your Gut Health - Consult Experts on Diet & Nutrition',
        featureTitle: 'Features',
        featureDescription: 'Our nutrition classes are designed to help you learn and master different nutrition styles. Here are some of the features of our nutrition classes:',
        features: [
            {
                id: 1,
                name: 'Weight Management',
                title: 'Weight Management',
                description: 'Learn the latest Weight Management moves and get fit while having fun!',
                image: 'https://plus.unsplash.com/premium_photo-1661580260078-4c554d5b01dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 2,
                name: 'PCOS (PCOD) Relief Plan',
                title: 'PCOS (PCOD) Relief Plan',
                description: 'Get your groove on with our PCOS (PCOD) Relief Plan classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1661281288734-49d3606234c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
                id: 3,
                name: 'Psoriasis Relief',
                title: 'Psoriasis Relief',
                description: 'Learn the latest Psoriasis Relief moves and get fit while having fun!',
                image: 'https://images.unsplash.com/photo-1581122584612-713f89daa8eb?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 4,
                name: 'Thyroid Relief',
                title: 'Thyroid Relief',
                description: 'Get your groove on with our Thyroid Relief classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1661281288734-49d3606234c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
        ],
        coaches: []
    },
    {
        id: 'in-home',
        name: 'In-Home',
        title: 'In-Home',
        description: "We guarantee the fitness results you’re looking for. Our unique in-home workout system is perfect if you have limited time and space. But that's not all – we prioritize convenience and affordability too! Time to prioritize your health and well-being without worrying about the cost of care. Ditch excuses with BFF’s In-Home workout sessions.",
        image: '/images/stock/in-home.jpeg',
        caption: 'Introducing India’s 1st In-Home Workout with Complete Home Gym Setup',
        featureTitle: 'Features',
        featureDescription: 'Our in-home classes are designed to help you learn and master different in-home styles. Here are some of the features of our in-home classes:',
        features: [
            {
                id: 1,
                name: 'Limited Time and Space',
                title: 'Limited Time and Space',
                description: 'Learn the latest Limited Time and Space moves and get fit while having fun!',
                image: 'https://plus.unsplash.com/premium_photo-1661580260078-4c554d5b01dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                id: 2,
                name: 'Convenience and Affordability',
                title: 'Convenience and Affordability',
                description: 'Get your groove on with our Convenience and Affordability classes and impress everyone with your moves!',
                image: 'https://plus.unsplash.com/premium_photo-1661281288734-49d3606234c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
                id: 3,
                name: 'Health and Well-being',
                title: 'Health and Well-being',
                description: 'Learn the latest Health and Well-being moves and get fit while having fun!',
                image: 'https://images.unsplash.com/photo-1581122584612-713f89daa8eb?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }
        ],
        coaches: []
    },
]


async function seedPrograms() {
    try {
        console.log('Seeding programs...');
        await connectDB();
        const programsIds = programs.map(p => p.id);
        await ProgramModel.deleteMany({ id: { $nin: programsIds } });

        for await (const program of programs) {
            await ProgramModel.findOneAndUpdate({ id: program.id }, program, { upsert: true });
        }

        console.log('Programs added successfully');
    }
    catch (err: any) {
        console.error(err);
    }
}

export { seedPrograms };

