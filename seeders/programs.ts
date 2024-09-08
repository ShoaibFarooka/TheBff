import connectDB from "@/lib/dbConnection";
import { Program as ProgramModel } from "@/models";
import type { Program } from "@/types/program";
import consola from "consola";
import { readFileSync, writeFileSync } from "fs";

export type Programs = {
    _id: string;
    programs: Program[];
}


const programs: Program[] = JSON.parse(readFileSync("seeders/data/programs.json", "utf-8")) as unknown as Program[];

async function savePrograms() {
    try {
        console.log('Seeding programs...');
        await connectDB();
        // const programsIds = programs.map(p => p.id);
        // await ProgramModel.deleteMany({ id: { $nin: programsIds } });

        // for await (const program of programs) {
        //     await ProgramModel.findOneAndUpdate({ id: program.id }, program, { upsert: true });
        // }

        const promises = programs.map(async (program) => {
            return ProgramModel.findOneAndUpdate({ id: program.id }, program, { upsert: true });
        })

        await Promise.all(promises);

        console.log('Programs added successfully');
    } catch (err: any) {
        console.error(err);
    }
}


async function loadPrograms() {
    try {
        const confirm = await consola.prompt('This will overwrite all programs in the data/programs.json. Are you sure you want to continue? (y/n)', {
            type: 'confirm'
        });

        if (!confirm) {
            return;
        }

        await connectDB();
        const programs = await ProgramModel.find();

        writeFileSync("seeders/data/programs.json", JSON.stringify(programs, null, 2));
    }
    catch (err: any) {
        console.error(err);
    }
}

const seeders = [
    {
        label: 'Save programs to db',
        value: 'save-programs',
        hint: 'Save programs to database (from seeders/data/programs.json)',
        fn: savePrograms
    },
    {
        label: 'Load programs from db',
        value: 'load-programs',
        hint: 'Load programs from database to seeders/data/programs.json',
        fn: loadPrograms
    }
]


export default async function main() {
    // ask user for action
    try {
        consola.info('Available seeders:');
        const action = await consola.prompt('What do you want to do?', {
            type: 'select',
            options: seeders.map(({ label, value, hint }) => ({ label, value, hint })),
        }) as unknown as string;

        const selectedAction = seeders.find(({ value }) => value === action);
        if (selectedAction) {
            await selectedAction.fn();
        }
    } catch (err: any) {
        consola.error(err);
    }
}