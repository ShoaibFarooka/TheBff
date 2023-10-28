import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try {
        // if mongoose is not connected then connect
        if (mongoose.connection.readyState === 1) return;

        return new Promise((resolve, reject) => {
            mongoose.connect(process.env.MONGO_URI!, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            } as any)

            mongoose.connection.once("open", () => {
                console.log("Connected to database");
                resolve(true);
            });

            mongoose.connection.once("error", (error: any) => {
                console.error("Error connecting to database", error);
                reject(error);
            });

        })

    } catch (error: any) {
        console.error(`Error: ${error.message}`);

        // process.exit(1);
        throw error;
    }
}

// parameter pageName, query data in pageData collection, and find data with pageName
// without using any mode
export const getPageData = async (pageName: string) => {

    try {
        await connectDB();

        const collection = mongoose.connection.db.collection("pageData");
        const pageData = await collection.findOne({ pageName });

        // if (!pageData) throw new Error('Data not found');

        return pageData ?? null;

    } catch (error: any) {
        console.log(error)
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

savePageData("Programs", {
    title: "program",
    management: [
        //'/images/image_name.png',
        { image: '/images/stock/dance.jpeg', title: 'Fruits', subTitle: 'Fruits are necessary', description: 'Fruits are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.' },
        { image: '/images/stock/gym.jpeg', title: 'Yoga', subTitle: 'Yoga is necessary', description: 'Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India. Yoga is one of the six Āstika (orthodox) schools of Hindu philosophical traditions. There is a broad variety of yoga schools, practices, and goals in Hinduism, Buddhism, and Jainism.' },
        { image: '/images/stock/home-gym.jpeg', title: 'Zumba', subTitle: 'Zumba is necessary', description: 'Zumba is an exercise fitness program created by Colombian dancer and choreographer Alberto "Beto" Pérez during the 1990s. Zumba is a trademark owned by Zumba Fitness, LLC. The Brazilian pop singer Claudia Leitte has become the international ambassador to Zumba Fitness.' },
        { image: '/images/stock/yoga.jpeg', title: 'GYM', subTitle: 'Gym is necessary', description: 'A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek gymnasium. They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. "Gym" is also slang for "fitness center", which is often an indoor facility.' },
        { image: '/images/stock/meditation.jpeg', title: 'GYM', subTitle: 'Gym is necessary', description: 'A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek gymnasium. They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. "Gym" is also slang for "fitness center", which is often an indoor facility.' },
        { image: '/images/stock/nutrition.jpeg', title: 'GYM', subTitle: 'Gym is necessary', description: 'A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek gymnasium. They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. "Gym" is also slang for "fitness center", which is often an indoor facility.' },
        // { image: '/images/stock/in-home.jpeg', title: 'GYM', subTitle: 'Gym is necessary', description: 'A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek gymnasium. They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. "Gym" is also slang for "fitness center", which is often an indoor facility.' },
    ],
    stayHealthy: [
        { mainTitle : 'Choose Your Dance Motivation',mainSubTitle : 'Find your reason to dance and crush those fitness goals with the best live onlinedance classes in the town', 
        arr: [
            {image: '/images/programs/dance-1.jpeg', title: 'Work Outs that Don’t Feel like Work', subTitle: 'Fitness Dance Workout', description: ' Enroll in live fitness dance classes to be in your best shape. Let our internationally certified trainers guide you through the perfect workout with our fun and energetic online live dance classes. Try Zumba or Bhangra, weight loss or body tone, aerobics, or stretching; there really is something for everyone here!' },
            {image: '/images/programs/dance-2.jpeg', title: 'Personalized Dance Routines to Suit Your Needs.', subTitle: 'Versatile Dance Styles', description: ' : Why limit yourself to a stuffy studio when you can dance anywhere you want? Get your dance training from the comfort of your own home (or your favorite park, if thats your thing). Join our electrifying salsa, hip-hop, ballroom, jazz, Bollywood, freestyle, and countless other dance classes! Choose from our range of dance classes to find the right dance style that’s best for you.' },
            {image: '/images/programs/dance-3.jpeg', title: 'Learn Iconic Hook Steps for Wedding Dance Performance at Home', subTitle: 'Indian Wedding Dance Choreography', description: ` Wanna make your big day or your bestie's even more special with akiller dance performance? Let us help! Learn from the best wedding choreographers and rock the party with Bollywood, couple, sangeet, haldi, mehendi, reception, or group wedding performances! Time to slay the party with your dance moves!` },
        ]},
        { mainTitle : 'Meet the Ultimate At-Gym Companion',mainSubTitle : 'Are you a fitness newbie or a seasoned pro? Either way, we have classes to help you reach your goals and unleash your inner athlete!', image: '/images/fruits.webp', title: 'Fruits', subTitle: 'Fruits are necessary', description: ' are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.' },
        { mainTitle : 'Personalized Home Workouts',mainSubTitle : 'No Gym, No Problem: Get world-class training online in the comfort of your home.', image: '/images/fruits.webp', title: 'Fruits', subTitle: 'Fruits are necessary', description: 'Fruits are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.' },
        { mainTitle : 'Online Yoga Classes',mainSubTitle : 'Yoga techniques that tap into the powers of meditation and wellness.', image: '/images/fruits.webp', title: 'Fruits', subTitle: 'Fruits are necessary', description: 'Fruits are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.' },
        { mainTitle : 'Online Meditation Classes',mainSubTitle : 'Relax your mind and calm your emotions with a free guided meditation that you can practice anywhere, anytime.', image: '/images/fruits.webp', title: 'Fruits', subTitle: 'Fruits are necessary', description: 'Fruits are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.' },
        { mainTitle : 'Customized Diet and Nutrition Plans',mainSubTitle : 'Let our expert dieticians and nutritionist help you design a diet that works out for you', image: '/images/fruits.webp', title: 'Fruits', subTitle: 'Fruits are necessary', description: 'Fruits are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.' },
        // { mainTitle : 'Choose Your Dance Motivation',mainSubTitle : 'Find your reason to dance and crush those fitness goals with the best live onlinedance classes in the town', image: '/images/fruits.webp', title: 'Fruits', subTitle: 'Fruits are necessary', description: 'Fruits are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.' },
  

    ],
    unlimitedVariety : [
        '/images/Cardio.png',
        '/images/Strength.png',
        '/images/Yoga.png',
        '/images/No equipment.png',
        '/images/Toning.png',
        '/images/Walking.png',

    ],
    comparison : [
        { title: "Live Interaction Classes", tooltip : " Super cool way to build new friendships.",  standard: "Yes", premium: "Yes" },
        { title: "Frequency",tooltip : " Get rolling! Schedule a session that works for you.",  standard: "18 Sessions", premium: "Unlimited" },
        { title: "Diet Assitance",tooltip : "Find your holistic meal plan from experts.",  standard: "No", premium: "Yes" },
        { title: "Pause Membership",tooltip : " Want a break for a month? Freeze your account.",  standard: "No", premium: "Yes" },
        { title: "No Cost EMI",tooltip : "Easy installments to choose from. ",  standard: "No", premium: "Yes" },
      ],
    price : [
        {
          title1: '1999',
          title2 : '3499'
        }, {
          title1: '5999',
          
          title2 : '10499'
          
        }, {
          title1: '11999',
          
          title2 : '20999'
          
        }, 
      ],
      priceContent : [
        {title : 'Standard' , content1  : 'Create personal dashboard' , content2 : 'Trainer Support' , content3 : `Rewards & Achievement's`  },
        {title : 'Premium' ,content1  : 'All features in Stadard' , content2 : 'Pause Membership on your ease' , content3 : `Custom Nutrition Plans`  },
        {title : 'Enterprise' ,content1  : 'All features in Premium Plan' , content2 : 'Bulk Discount' , content3 : `24*7 Support`  },
      ]

});


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

// savePageData("checkout", {
//     title: "Checkout",
//     images: [
//         '/images/Click Area.png',
//         '/images/Frame 3927.png',
//         '/images/Rectangle 2812.png',
//         '/images/Rectangle 2812 (1).png',
//         '/images/Discount Badge.png',
//         '/images/Ellipse 203.png',
      
//     ],
//     prices: 
//         { 
//             title: '1 Month Premium - Weight Management', 
//             price: '₹ 3499', 
//             offeredPrice: '₹ 6499', 
//             percentage : '-30%',
//             description: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis mol'
//          },
        
    
//     offers: 
//         { 
            
//             title: 'Offers', 
//             description: 'Only Today  | Additional  500 off applied.' ,
//             conditoins : 'T&C'
//         },
//     howItWorks : {
//         title : 'How it works',
//         description : ' Live workouts: Choose from the wide variety of online workouts and join in from anywhere'
//     }
       
    
// });