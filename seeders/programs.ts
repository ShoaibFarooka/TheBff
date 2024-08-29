import connectDB from "@/lib/dbConnection";
import { Program as ProgramModel } from "@/models";
import type { Program } from "@/types/program";
import { readFileSync } from "fs";

export type Programs = {
    _id: string;
    programs: Program[];
}


const programs: Program[] = JSON.parse(readFileSync("seeders/data/programs.json", "utf-8")) as unknown as Program[];

async function seedPrograms() {
    try {
        console.log('Seeding programs...');
        await connectDB();
        const programsIds = programs.map(p => p.id);
        await ProgramModel.deleteMany({ id: { $nin: programsIds } });

        for await (const program of programs) {
            await ProgramModel.findOneAndUpdate({ id: program.id }, program, { upsert: true });
        }

        console.log('Programs added successfully');
    }
    catch (err: any) {
        console.error(err);
    }
}

export { seedPrograms };

