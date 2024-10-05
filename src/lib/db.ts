import mongoose from "mongoose";
import connectDB from "./dbConnection";

export { default as connectDB } from './dbConnection';

// export const connectDB = async () => {
//     try {
//         // if mongoose is not connected then connect
//         if (mongoose.connection.readyState === 1) return;

//         return new Promise((resolve, reject) => {
//             mongoose.connect(process.env.MONGO_URI!, {
//                 useUnifiedTopology: true,
//                 useNewUrlParser: true,
//             } as any)

//             mongoose.connection.once("open", () => {
//                 console.log("Connected to database");
//                 resolve(true);
//             });

//             mongoose.connection.once("error", (error: any) => {
//                 console.error("Error connecting to database", error);
//                 reject(error);
//             });

//         })

//     } catch (error: any) {
//         console.error(`Error: ${error.message}`);

//         // process.exit(1);
//         throw error;
//     }
// }


// parameter pageName, query data in pageData collection, and find data with pageName
// without using any mode
export const getPageData = async (pageName: string) => {

    try {
        await connectDB();

        const collection = mongoose.connection.db.collection("pageData");
        const pageData = await collection.findOne({ pageName });

        // convert _id to string
        if (pageData) (pageData as any)._id = pageData._id.toString();
        
        // if (!pageData) throw new Error('Data not found');

        return pageData ?? null;

    } catch (error: any) {
        console.error(error)
        // throw error;
        return null;
    }
}


export const savePageData = async (pageName: string, data: Record<string, any>) => {
    await connectDB();

    try {
        const pageData = await mongoose.connection.db.collection("pageData");
        await pageData.updateOne({ pageName }, { $set: data }, { upsert: true });
    } catch (error: any) {
        return null
    }
}


// savePageData("about", {
//     title: "ABout",
//     galleryImages: [
//         //'/images/image_name.png',
//         'https://picsum.photos/seed/1/800/600',
//         'https://picsum.photos/seed/1/800/600',
//         'https://picsum.photos/seed/1/800/600',
//         'https://picsum.photos/seed/1/800/600',
//         'https://picsum.photos/seed/1/800/600',
//     ],
//     classes: [
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', subTitle: 'Dance', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', subTitle: 'Dance', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', subTitle: 'Dance', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', subTitle: 'Dance', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', subTitle: 'Dance', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', subTitle: 'Dance', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//     ],
//     coches: [
//         { name: 'Gurpreet', title: 'E-Reps', image: '/images/image_name.png' },
//         { name: 'Gurpreet', title: 'E-Reps', image: '/images/image_name.png' },
//         { name: 'Gurpreet', title: 'E-Reps', image: '/images/image_name.png' },
//         { name: 'Gurpreet', title: 'E-Reps', image: '/images/image_name.png' },
//         { name: 'Gurpreet', title: 'E-Reps', image: '/images/image_name.png' },
//     ]
// });

// savePageData("Programs", {
//     title: "program",
//     management: [
//         //'/images/image_name.png',
//         { image: '/images/stock/dance.jpeg',content: "Our fun, easy, and upbeat dance classes are perfect for everyone. We help you feel fabulous as you learn to dance! ", title: 'Fruits', subTitle: 'Fruits are necessary', description: 'Fruits are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.' },
//         { image: '/images/stock/gym.jpeg',content: "No more excuses for not having an expert trainer at your gym. Get online training from industry-accredited and certified trainers! ", title: 'Yoga', subTitle: 'Yoga is necessary', description: 'Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India. Yoga is one of the six Āstika (orthodox) schools of Hindu philosophical traditions. There is a broad variety of yoga schools, practices, and goals in Hinduism, Buddhism, and Jainism.' },
//         { image: '/images/stock/home-gym.jpeg',content : "No time to workout? BFF's home program keeps you fit without sacrificing your schedule ",title: 'Zumba', subTitle: 'Zumba is necessary', description: 'Zumba is an exercise fitness program created by Colombian dancer and choreographer Alberto "Beto" Pérez during the 1990s. Zumba is a trademark owned by Zumba Fitness, LLC. The Brazilian pop singer Claudia Leitte has become the international ambassador to Zumba Fitness.' },
//         { image: '/images/stock/yoga.jpeg',content : "Want a holistic workout experience? Enroll in our online yoga sessions designed around your schedule! ", title: 'GYM', subTitle: 'Gym is necessary', description: 'A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek gymnasium. They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. "Gym" is also slang for "fitness center", which is often an indoor facility.' },
//         { image: '/images/stock/meditation.jpeg',content : "Become your better self with our all-rounder live and interactive meditation classes! ",  title: 'GYM', subTitle: 'Gym is necessary', description: 'A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek gymnasium. They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. "Gym" is also slang for "fitness center", which is often an indoor facility.' },
//         { image: '/images/stock/nutrition.jpeg',content : "Your body has a unique nutrition profile, just like your fingerprint. We’ll help you find the perfect meal plan for your unique body.",  title: 'GYM', subTitle: 'Gym is necessary', description: 'A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek gymnasium. They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. "Gym" is also slang for "fitness center", which is often an indoor facility.' },
//         // { image: '/images/stock/in-home.jpeg', title: 'GYM', subTitle: 'Gym is necessary', description: 'A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek gymnasium. They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. "Gym" is also slang for "fitness center", which is often an indoor facility.' },
//     ],
//     stayHealthy: [
//         { mainTitle : 'Choose Your Dance Motivation',mainSubTitle : 'Find your reason to dance and crush those fitness goals with the best live onlinedance classes in the town', 
//         arr: [
//             {image: '/images/programs/dance-1.jpeg', title: 'Work Outs that Don’t Feel like Work', subTitle: 'Fitness Dance Workout', description: ' Enroll in live fitness dance classes to be in your best shape. Let our internationally certified trainers guide you through the perfect workout with our fun and energetic online live dance classes. Try Zumba or Bhangra, weight loss or body tone, aerobics, or stretching; there really is something for everyone here!' },
//             {image: '/images/programs/dance-2.jpeg', title: 'Personalized Dance Routines to Suit Your Needs.', subTitle: 'Versatile Dance Styles', description: '  Why limit yourself to a stuffy studio when you can dance anywhere you want? Get your dance training from the comfort of your own home (or your favorite park, if thats your thing). Join our electrifying salsa, hip-hop, ballroom, jazz, Bollywood, freestyle, and countless other dance classes! Choose from our range of dance classes to find the right dance style that’s best for you.' },
//             {image: '/images/programs/dance-3.jpeg', title: 'Learn Iconic Hook Steps for Wedding Dance Performance at Home', subTitle: 'Indian Wedding Dance Choreography', description: ` Wanna make your big day or your bestie's even more special with akiller dance performance? Let us help! Learn from the best wedding choreographers and rock the party with Bollywood, couple, sangeet, haldi, mehendi, reception, or group wedding performances! Time to slay the party with your dance moves!` },
//         ]},

//         { mainTitle : 'Meet the Ultimate At-Gym Companion',mainSubTitle : 'Are you a fitness newbie or a seasoned pro? Either way, we have classes to help you reach your goals and unleash your inner athlete!',
//         arr: [
//             {image: '/images/programs/atgym-1.jpeg', title: 'Flex Those Muscles with BFF’s Inclusive Resistance Training Programs', subTitle: 'Online Strength Training Classes', description: ' Looking to sculpt those muscles and increase your strength? Our online strength training classes are the perfect solution for anyone looking to take their fitness to the next level. BFF’s fitness coaches will guide you with resistance training exercises based on your preferences, goals, and fitness level.' },
//             {image: '/images/programs/atgym-2.jpeg', title: 'Get fit, Stay lit: The Intensive Path to a Stronger You!', subTitle: 'HIIT Training and Exercises', description: ' : HIIT workouts are all the rage these days, but they can be extremely risky if you do not have the right equipment and a qualified trainer by your side. No matter what your fitness level is, our professionals will guide you and keep you safe so that you can achieve your health, fitness, and performance goals. Join the club and let’s HIIT it!' },
//             {image: '/images/programs/atgym-3.jpeg', title: 'Strong Inside and Out: Build Resilience for a Better Tomorrow  ', subTitle: 'Functional Strength Training', description: ` : Tired of feeling weak and prone to injuries from traditional workouts? BFF’s Functional strength training targets real-life movements, flexibility, and agility, and equips you with the skills you need to tackle daily challenges. Plus, it reduces injury risk, so why settle for isolated muscle workouts when you can transform your life? Try our online functional training program now!` },
//             {image: '/images/programs/atgym-4.jpeg', title: ': No more gym hour restrictions or lack of motivation - reach your fitness goals like never before!  ', subTitle: 'CrossFit Training', description: `Not seeing progress in your workouts despite hard training? Get some extra motivation, expert guidance, and personalized workouts through BFF’s integrated CrossFit online training system. With daily workouts specifically tailored to your goals, you’ll see the results you’ve been waiting for in no time. Stop putting off your fitness routine and sign up today!` },
//             {image: '/images/programs/atgym-5.jpeg', title: 'Guidance like None Other: Healthy Lifestyle is No Longer a Struggle', subTitle: 'Sort Your Daily Workout Routine', description: `: Our fitness coach tracks your fitness as it happens so you can feel good about yourself and see results all day. Get the best workout tips and advice to develop an effective fitness strategy.` },
//         ]},

//         { mainTitle : 'Personalized Home Workouts',mainSubTitle : 'No Gym, No Problem: Get world-class training online in the comfort of your home.', 
//         arr: [
//             {image: '/images/programs/inhome-1.jpeg', title: 'Convenient and Cost-Effective Way to Exercise Anywhere, Anytime', subTitle: 'Body Weight Training at Home', description: ` To develop strength & resistance, you don’t need a gym. Just your body will do! Strength training is the secret to a healthy body. With BFF’s strength training workout at home, you don’t need to buy expensive equipment or gym fees. Transform your physique and get the muscles you've been dreaming of. No more excuses, no more laziness - BFF’s online strength training at home got you covered!` },
//             {image: '/images/programs/inhome-2.jpeg', title: `Stop Putting Yourself at Risk without Proper HIIT Training! ', subTitle: 'HIIT Training/ Workout at Home', description: '  Want to burn fat, build muscle, and get in shape fast? HIIT training is where it's at! But let's be real, it's not for the faint of heart. Luckily, we've got you covered with customized programs and group training options that cater to your level of fitness and injury recovery. And the best part? You can sweat it out in the comfort of your own home! So, what are you waiting for? Join us now and  let's HIIT it together!` },
//             {image: '/images/programs/inhome-3.jpeg', title: 'Frustrated with Lack of Weights at Home? Join Us for a Versatile Body Workout!', subTitle: 'Resistance Band Workouts at Home', description: ` Resistance band training is one of the most versatile and effective methods for enhancing athletic performance, building strength, and improving mobility. Our online resistance band workout program is ideal for people of all ages and fitness levels, especially those who don't have access to weights at home or work.` },
//             {image: '/images/programs/inhome-4.jpeg', title: 'Ready to Break Up with Boring Workouts? Join Our Pilates Exercise and Discover a New You', subTitle: 'Online Pilates Classes at Home', description: ` If you are looking for an at-home online pilates workout, this program is for you. Our virtual pilates training will help you build strength and endurance while improving your balance and core stability. Bid adios to Pilates DVDs and webinars, and take make way for an amazing body with BFF’s Pilates onlineworkouts!` },
//             {image: '/images/programs/inhome-5.jpeg', title: 'Best Workout Plan Exists and We Can Prove it!', subTitle: 'Personalised Home Workout Routine ', description: ` The right diet and exercise plan can help you feel better about yourself. With our experts by your side, you can become a more confident and effective version of yourself. Get your doubts cleared on fitness, and diet, talk about your goals, or ask for a home workout plan. Our trainers and nutritionists believe in result-oriented guidance. All you need to do is, Ask!` },
//         ]},
//         { mainTitle : 'Online Yoga Classes',mainSubTitle : 'Yoga techniques that tap into the powers of meditation and wellness.',
//         arr: [
//             {image: '/images/programs/yoga-1.jpeg', title: ': The Purest Hatha Yoga Experience is Online. Join the Practice toDetoxify Your Body, Spirit, and Mind.', subTitle: 'Online Hatha Yoga Classes and Workouts', description: ' BFF’s Hatha yoga classes are for people of all ages, body types, and experience levels. Train with the finest yoga trainers and coaches in your city, all from your home. After all, you deserve it! Combine our live yoga workouts with a healthy diet and lifestyle changes and you could be feeling amazing in no time!' },
//             {image: '/images/programs/yoga-2.jpeg', title: 'Wanna Feel Great? Try BFF’s Vinyasa Yoga Classes.', subTitle: ' Live Vinyasa Yoga Sessions', description: 'Vinyasa Yoga, or as some like to call it "flow yoga", is like a graceful dance between poses where you seamlessly transition from one posture to the next, making it a style that truly flows. When you feel the energy of your power breath and the strength of your poses flowing throughout your entire being, you will immediately want to return to the mat. By the way, it’s great for weight loss!' },
//             {image: '/images/programs/yoga-3.jpeg', title: 'Join Any Class, Any Day at Your Convenience.', subTitle: ' Online Live Ashtanga Yoga Classes', description: ` Want to improve your strength and stamina but feel too lazy to hit the gym? Our Ashtanga yoga classes will set the tone for your body. Our classes are guided by the coolest yoga practitioners, who guide you through your posture and breathing. Why wait? Join the way to find peace and calm in your busy life with our live and interactive yoga classes.` },
//             {image: '/images/programs/yoga-4.jpeg', title: `Power yoga is not about flexibility, it's about strength and balance  ` , subTitle: ' Online Power Yoga Sessions', description: ` : Battling the daily grind can feel like a full-time job. But, worry not! Our power yoga classes are live, interactive, and fun. Each session is a unique experience - changing the sequence of postures, deepening your practice, and helping you connect your mind and body. You'll enjoy a sweat-soaked and relaxing class with great people in the BFF community.` },
//             {image: '/images/programs/yoga-5.jpeg', title: 'Post your queries and get help from our experts to pick the best yoga routine for you.', subTitle: ' General Yoga Guidance and Support', description: ` Whether you are a beginner or advanced, our experts are here to help you learn the best yoga practices. We have a wide variety of classes in our playlists on an array of topics including cardio, strength, and core.` },
//         ]},
//         { mainTitle : 'Online Meditation Classes',mainSubTitle : 'Relax your mind and calm your emotions with a free guided meditation that you can practice anywhere, anytime.',
//         arr: [
//             {image: '/images/programs/meditation-1.jpeg', title: 'The Key to Meditation is Not Only Focus but Good Meditation Coaches and Instructors!', subTitle: 'Meditation Classes for Beginners', description: ' : Whether you’re a complete beginner or have tried meditation in the past, our online meditation sessions will make you feel calm, composed, and full of positivity. Choose group classes or one-on-one sessions at your convenience and transform yourself spiritually.' },
//             {image: '/images/programs/meditation-2.jpeg', title: 'Experience the Next Level of Meditation And Mindfulness with BFF!', subTitle: 'Online meditation classes', description: ' Stressed out and short on time? Find peace and relaxation with our online meditation program. Our fast, easy, and fun classes help you master physical, mental, and spiritual well-being, even during the busiest times of the day. Start your journey to stress relief today!' },
//             {image: '/images/programs/meditation-3.jpeg', title: 'You are a meditation junkie, but you can only go so far with a book, candle, and yoga mat. You need us!', subTitle: 'Meditation Classes for Advanced Learners', description: ` Join us for a premium experience that you’ll never forget. We will help you develop an enriching and rewarding meditation practice by guiding you through a variety of techniques so that you can focus your energies on becoming centered and achieving your goals.` },
//         ]},
//         { mainTitle : 'Customized Diet and Nutrition Plans',mainSubTitle : 'Let our expert dieticians and nutritionist help you design a diet that works out for you', 
//         arr: [
//             {image: '/images/programs/nutrition-1.jpeg', title: 'You can’t lose/gain weight without eating right. Simplify weight management with us.', subTitle: 'Online Weight Loss/Weight Gain Programs', description: 'Tired of fad diets that promise the world but never deliver? With our customized personalized diet plans and workouts, we can help you manage your  weight be it- weight loss or weight gain with no hassle. Our health coach will work with you to develop a healthy menu plan and exercise routine, providing ongoing support and motivation throughout your program.' },
//             {image: '/images/programs/nutrition-2.jpeg', title: ` It's time to take your health and fitness seriously! Manage your PCOS condition with a diet plan made just for you!.`, subTitle: 'PCOS/PCOD Diet Plans', description: 'PCOS can be a very hard condition to deal with. Not only does it cause many unwanted symptoms, but it also makes it harder for you to lose weight and stay fit. This is where we can make a real difference! We take a personalized approach to your needs, tailoring our workouts and diet plans based on your experience, dedication level, health concerns (dietary restrictions or allergies), and long-term goals.' },
//             {image: '/images/programs/nutrition-3.jpeg', title: 'Soothe Your Skin And Satisfy Your Appetite With Our Psoriasis DietPlan', subTitle: ' Psoriasis Diet Program', description: ` One of the most effective ways to deal with psoriasis is through a proper diet. Eating isn't easy, but knowing what to eat, when to eat, and how much to eat is even harder! With our personalized diet plans, you get support aimed at achieving relief, regaining your confidence, and living your best life. Now kick the discomfort and pain out of your life and ooze confidence with BFF!` },
//             {image: '/images/programs/nutrition-4.jpeg', title: 'Thyroid Got You Down? Let Our Diet Plan Pick You Up!', subTitle: ' Thyroid Diet Chart', description: ` We know what it's like to feel exhausted, sluggish, and unable to lose weight. But if you're experiencing thyroid issues like hypothyroidism or hyperthyroidism, managing your symptoms doesn't have to be difficult - especially with a customized diet plan. Get access to the best dieticians and nutritionists in the industry to control your thyroid with a specialized meal plan.` },
//             {image: '/images/programs/nutrition-5.jpeg', title: 'Discover that one diet plan that will change your life', subTitle: 'Diet and Nutrition Plans', description: `Nutrition and fitness should be enjoyable, but it can be hard to figure  out how to put a plan together that works for you. Diet plans are a great way to reach your goals faster. These goals can be related to weight issues, chronic  health conditions, or optimizing your nutrition. Get a budget-friendly way to a  healthier lifestyle with our expert guidance.` },
//         ]},
//         // { mainTitle : 'Choose Your Dance Motivation',mainSubTitle : 'Find your reason to dance and crush those fitness goals with the best live onlinedance classes in the town', image: '/images/fruits.webp', title: 'Fruits', subTitle: 'Fruits are necessary', description: 'Fruits are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.' },
  

//     ],
//     unlimitedVariety : [
//         '/images/Cardio.png',
//         '/images/Strength.png',
//         '/images/Yoga.png',
//         '/images/No equipment.png',
//         '/images/Toning.png',
//         '/images/Walking.png',

//     ],
//     comparison : [
//         { title: "Live Interaction Classes", tooltip : " Super cool way to build new friendships.",  standard: "Yes", premium: "Yes" },
//         { title: "Frequency",tooltip : " Get rolling! Schedule a session that works for you.",  standard: "18 Sessions", premium: "Unlimited" },
//         { title: "Diet Assitance",tooltip : "Find your holistic meal plan from experts.",  standard: "No", premium: "Yes" },
//         { title: "Pause Membership",tooltip : " Want a break for a month? Freeze your account.",  standard: "No", premium: "Yes" },
//         { title: "No Cost EMI",tooltip : "Easy installments to choose from. ",  standard: "No", premium: "Yes" },
//       ],
//     price : [
//         {
//           title1: '1999',
//           title2 : '3499'
//         }, {
//           title1: '5999',
          
//           title2 : '10499'
          
//         }, {
//           title1: '11999',
          
//           title2 : '20999'
          
//         }, 
//       ],
//       priceContent : [
//         {title : 'Standard' , content1  : 'Create personal dashboard' , content2 : 'Trainer Support' , content3 : `Rewards & Achievement's`  },
//         {title : 'Premium' ,content1  : 'All features in Stadard' , content2 : 'Pause Membership on your ease' , content3 : `Custom Nutrition Plans`  },
//         {title : 'Enterprise' ,content1  : 'All features in Premium Plan' , content2 : 'Bulk Discount' , content3 : `24*7 Support`  },
//       ]

// });


// savePageData("business", {
//     title: "Business",
//     bffBusiness: [
       
//         '/images/SlideItem6.png',
//         '/images/SlideItem7.png',
//         '/images/SlideItem8.png',
//         '/images/SlideItem9.png',
//         '/images/SlideItem6.png',
        
//     ],
//     partnerWithUs: [
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//         { image: 'https://picsum.photos/seed/800/600', title: 'Personalized Online Dance Classes to Get You Moving', description: 'Incididunt et nostrud aliqua laboris minim id occaecat labore labore excepteur elit sint. Ex irure ipsum non exercitation nostrud in consequat adipisicing. Consectetur magna magna nostrud magna qui. Non eiusmod eu eu aliquip velit excepteur in adipisicing sit amet. Sint magna deserunt exercitation eiusmod ad nostrud duis in laborum. Deserunt est fugiat veniam voluptate aute do est sint minim dolore cillum reprehenderit cillum tempor. Quis exercitation magna cupidatat id non laborum dolor.' },
//     ],
  
// });
