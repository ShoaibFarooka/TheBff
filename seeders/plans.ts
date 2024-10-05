import connectDB from "@/lib/dbConnection";
import { Plan as PlanModel } from "@/models";
import { Plan } from "@/types/subscription";
import consola from "consola";
import { readFileSync, writeFileSync } from "fs";

const plans: Plan[] = JSON.parse(readFileSync("seeders/data/plans.json", "utf-8")) as unknown as Plan[];

async function savePlans() {
    try {
        consola.info('Seeding plans...');
        await connectDB();

        const promises = plans.map(async (plan) => {
            if (!plan._id)
                return PlanModel.create(plan);
            return PlanModel.findOneAndUpdate({ _id: plan._id }, plan);
        })

        await Promise.all(promises);

        await loadPlans(true);
        console.log('Plans added successfully');
    } catch (err: any) {
        console.error(err);
    }
}


async function loadPlans(skipConfirmation = false) {
    try {

        // re-implement this with skipConfirmation
        let confirm: boolean;
        if (skipConfirmation) {
            confirm = skipConfirmation;
        } else {
            confirm = await consola.prompt('This will overwrite all plans in the data/plans.json. Are you sure you want to continue? (y/n)', {
                type: 'confirm'
            });
        }

        if (!confirm) {
            return;
        }

        await connectDB();
        const plans = await PlanModel.find();

        // sort plans by programId
        // plans.sort((a, b) => a.programId.localeCompare(b.programId as string));

        writeFileSync("seeders/data/plans.json", JSON.stringify(plans, null, 2));
    }
    catch (err: any) {
        console.error(err);
    }
}

const seeders = [
    {
        label: 'Save plans to db',
        value: 'save-plans',
        hint: 'Save plans to database (from seeders/data/plans.json)',
        fn: savePlans
    },
    {
        label: 'Load plans from db',
        value: 'load-plans',
        hint: 'Load plans from database to seeders/data/plans.json',
        fn: loadPlans
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