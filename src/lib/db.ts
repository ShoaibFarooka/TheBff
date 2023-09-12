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
        process.exit(1);
    }
}

// parameter pageName, query data in pageData collection, and find data with pageName
// without using any model
export const getPageData = async (pageName: string) => {

    await connectDB();

    try {
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

// savePageData("Programs", {
//     title: "program", 
//     variety: [
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