import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as any);
        console.log(`MongoDB connected: ${conn.connection.host}`);
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

        const pageData = await mongoose.connection.db.collection("pageData");
        return await pageData.findOne({ pageName });
    } catch (error: any) {
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
        '/images/SlideItem1.png',
        '/images/SlideItem2.png',
        '/images/SlideItem3.png',
        '/images/SlideItem4.png',
        '/images/SlideItem5.png',
    ],
    stayHealthy: [
        { image: '/images/fruits.webp', title: 'Fruits', subTitle: 'Fruits are necessary', description: 'Fruits are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.' },
        { image: '/images/stay2.png', title: 'Yoga', subTitle: 'Yoga is necessary', description: 'Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India. Yoga is one of the six Āstika (orthodox) schools of Hindu philosophical traditions. There is a broad variety of yoga schools, practices, and goals in Hinduism, Buddhism, and Jainism.' },
        { image: '/images/stay3.png', title: 'Zumba', subTitle: 'Zumba is necessary', description: 'Zumba is an exercise fitness program created by Colombian dancer and choreographer Alberto "Beto" Pérez during the 1990s. Zumba is a trademark owned by Zumba Fitness, LLC. The Brazilian pop singer Claudia Leitte has become the international ambassador to Zumba Fitness.' },
        { image: '/images/stay4.png', title: 'GYM', subTitle: 'Gym is necessary', description: 'A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek gymnasium. They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. "Gym" is also slang for "fitness center", which is often an indoor facility.' },

    ],
    unlimitedVariety : [
        '/images/Cardio.png',
        '/images/Strength.png',
        '/images/Yoga.png',
        '/images/No equipment.png',
        '/images/Toning.png',
        '/images/Walking.png',

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