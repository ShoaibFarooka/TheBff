#!/usr/bin/env -S pnpm tsx --env-file=.env

import { disconnectDB } from '@/lib/dbConnection';
import { consola } from 'consola';
import { seedClasses } from './classes';
import { seedCoaches } from './coaches';
import { seedPrograms } from './programs';

import dotenv from 'dotenv';
import { seedOffers } from './offers';
import { seedProgramsGallery, seedSuggestedPlans } from './others';
dotenv.config();

const args = process.argv.slice(2);
let seed: string[] = [];

const seeders: Record<string, Function> = {
    classes: seedClasses,
    programs: seedPrograms,
    coaches: seedCoaches,
    galleryImages: seedProgramsGallery,
    offers: seedOffers,
    suggestedPlans: seedSuggestedPlans
}

const selectOptions = [
    {
        label: 'Classes',
        value: 'classes',
        hint: 'Seed classes data'
    },
    {
        label: 'Programs',
        value: 'programs',
        hint: 'Seed programs data'
    },
    {
        label: 'Coaches',
        value: 'coaches',
        hint: 'Seed coaches data'
    },
    {
        label: 'Gallery Images',
        value: 'galleryImages',
        hint: `Seed programs' page gallery images`
    },
    {
        label: 'Offers',
        value: 'offers',
        hint: 'Seed offers data'
    },
    {
        label: 'Suggested Plans',
        value: 'suggestedPlans',
        hint: 'Seed suggested plans data (for the checkout page)'
    }
]

async function main() {

    // log help message
    if (args.includes('--help')) {
        console.log(`=> Available seeders <= \n${Object.values(selectOptions).map((option) => `${option.value}: ${option.hint}`).join('\n')}`)
        return
    }

    try {
        if (!args.length) {

            consola.log('use --help to see available seeders and their descriptions');

            // @ts-expect-error
            seed = await consola.prompt('What do you want to seed?', {
                type: 'multiselect',
                options: selectOptions
            });
        } else {
            seed.push(args[0]);
        }

        for await (let s of seed) {
            if (seeders[s]) {
                consola.log(`Seeding ${s}...`);
                await seeders[s]();
                consola.success(`${s} seed completed.\n`);
            }
        }
    } finally {
        disconnectDB();
    }
}


main()