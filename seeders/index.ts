#!/usr/bin/env -S pnpm tsx --env-file=.env

import { disconnectDB } from '@/lib/dbConnection';
import { consola } from 'consola';
import { seedClasses } from './classes';
import { seedCoaches } from './coaches';
import seedCoupons from './coupon';
import seedPlans from './plans';
import seedPrograms from './programs';

import dotenv from 'dotenv';
import { seedProgramsGallery, seedSuggestedPlans } from './others';
dotenv.config();

const args = process.argv.slice(2);
let seed: string[] = [];

const seeders = [
    {
        label: 'Classes',
        value: 'classes',
        hint: 'Seed classes data',
        fn: seedClasses
    },
    {
        label: 'Programs',
        value: 'programs',
        hint: 'Seed programs data',
        fn: seedPrograms
    },
    {
        label: 'Plans',
        value: 'plans',
        hint: 'Seed plans data',
        fn: seedPlans
    },
    {
        label: 'Coaches',
        value: 'coaches',
        hint: 'Seed coaches data',
        fn: seedCoaches
    },
    {
        label: 'Gallery Images',
        value: 'galleryImages',
        hint: `Seed programs' page gallery images`,
        fn: seedProgramsGallery
    },
    {
        label: 'Coupons',
        value: 'coupons',
        hint: 'Seed coupons data',
        fn: seedCoupons
    },
    {
        label: 'Suggested Plans',
        value: 'suggestedPlans',
        hint: 'Seed suggested plans data (for the checkout page)',
        fn: seedSuggestedPlans
    }
]

async function main() {

    // log help message
    if (args.includes('--help')) {
        console.log(`=> Available seeders <= \n${Object.values(seeders).map((option) => `${option.value}: ${option.hint}`).join('\n')}`)
        return
    }

    try {
        if (!args.length) {

            consola.log('use --help to see available seeders and their descriptions');

            // @ts-expect-error
            seed = await consola.prompt('What do you want to seed?', {
                type: 'multiselect',
                options: seeders.map(({ label, value, hint }) => ({ label, value, hint })),
            });
        } else {
            seed.push(args[0]);
        }

        for await (const s of seed) {
            const selectedAction = seeders.find(({ value }) => value === s);
            if (selectedAction) {
                await selectedAction.fn();
            }
        }

    } finally {
        disconnectDB();
    }
}


main()