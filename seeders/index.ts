import { disconnectDB } from '@/lib/dbConnection';
import { consola } from 'consola';
import dotenv from 'dotenv';
import { seedClasses } from './classes';
import { seedPrograms } from './programs';

dotenv.config();

const args = process.argv.slice(2);
let seed: string[] = [];

const seeders: Record<string, Function> = {
    classes: seedClasses,
    programs: seedPrograms,
}

async function main() {

    try {
        if (!args.length) {
            seed = await consola.prompt('What do you want to seed?', {
                type: 'multiselect',
                options: ['classes', 'programs'],
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