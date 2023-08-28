import type { Post } from "@/types/blog";

import { faker } from '@faker-js/faker';

// Generate fake data using faker
const generateFakeData = (featured: boolean) => ({
    id: faker.number.int({
        min: 50
    }),
    title: faker.lorem.sentence(),
    slug: faker.helpers.slugify(faker.lorem.sentence()),
    date: faker.date.recent().toISOString(),
    excerpt: faker.lorem.paragraph(),
    coverImage: {
        url: faker.image.url(),
    },
    content: {
        raw: faker.lorem.paragraphs(faker.number.int({
            min: 5,
        })),
    },
    author: {
        name: faker.person.fullName(),
        posts: [],
        picture: {
            url: faker.image.avatar(),
        },
        title: faker.name.jobTitle(),
        biography: faker.lorem.paragraph(),
    },
    seoOverride: {
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        image: {
            url: faker.image.url(),
        },
    },
    featured 
});

// Generate 20 fake blog posts
const generateFakePosts = (featured: boolean) => {
    const posts = [];
    for (let i = 0; i < 20; i++) {
        const post = generateFakeData(featured);
        posts.push(post);
    }
    return posts;
};

export const featuredPosts = generateFakePosts(true);
export const posts = generateFakePosts(false);