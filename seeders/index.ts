#!/usr/bin/env -S pnpm tsx

import { disconnectDB } from '@/lib/dbConnection';
import { consola } from 'consola';
import { seedClasses } from './classes';
import { seedCoaches } from './coaches';
import { seedPrograms } from './programs';

import dotenv from 'dotenv';
dotenv.config();

const args = process.argv.slice(2);
let seed: string[] = [];

const seeders: Record<string, Function> = {
    classes: seedClasses,
    programs: seedPrograms,
    coaches: seedCoaches
}

async function main() {

    try {
        if (!args.length) {
            seed = await consola.prompt('What do you want to seed?', {
                type: 'multiselect',
                options: ['classes', 'programs', 'coaches'],
            });
        } else {
            seed.push(args[0]);
        }

        for await (let s of seed) {
            if (seeders[s]) {
                seeders[s]();
            }
        }
    } finally {
        disconnectDB();
    }
}


main()