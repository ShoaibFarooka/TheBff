import connectDB from "@/lib/dbConnection";
import { Coupon as CouponModel } from "@/models";
import { Coupon } from "@/types/coupon";
import consola from "consola";
import { readFileSync, writeFileSync } from "fs";


const coupons: Array<Coupon & {
    _id?: string;
    createdAt: string;
}> = JSON.parse(readFileSync("seeders/data/coupons.json", "utf-8"))

async function saveCoupons() {
    try {
        consola.info('Seeding coupons...');
        await connectDB();

        const promises = coupons.map(async (coupon) => {
            if (!coupon._id)
                return CouponModel.create(coupon);
            return CouponModel.findOneAndUpdate({ _id: coupon._id }, coupon);
        })

        await Promise.all(promises);

        await loadCoupons(true);
        console.log('Coupons added successfully');
    } catch (err: any) {
        console.error(err);
    }
}


async function loadCoupons(skipConfirmation = false) {
    try {

        // re-implement this with skipConfirmation
        let confirm: boolean;
        if (skipConfirmation) {
            confirm = skipConfirmation;
        } else {
            confirm = await consola.prompt('This will overwrite all coupons in the data/coupons.json. Are you sure you want to continue? (y/n)', {
                type: 'confirm'
            });
        }

        if (!confirm) {
            return;
        }

        await connectDB();
        const coupons = await CouponModel.find();

        writeFileSync("seeders/data/coupons.json", JSON.stringify(coupons, null, 2));
    }
    catch (err: any) {
        console.error(err);
    }
}

const seeders = [
    {
        label: 'Save coupons to db',
        value: 'save-coupons',
        hint: 'Save coupons to database (from seeders/data/coupons.json)',
        fn: saveCoupons
    },
    {
        label: 'Load coupons from db',
        value: 'load-coupons',
        hint: 'Load coupons from database to seeders/data/coupons.json',
        fn: loadCoupons
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