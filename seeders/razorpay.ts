import { Plan as PlanModel } from "@/models"
import Razorpay from "razorpay"
// import connectDB from "@/lib/dbConnection"
import connectDB, { disconnectDB } from "@/lib/dbConnection"
import { Plan } from "@/types/subscription"
import { consola as cl } from 'consola'
import dotenv from 'dotenv'
import { readFileSync, writeFileSync } from "fs"
dotenv.config()


const plans = JSON.parse(readFileSync('seeders/data/plans.json', 'utf-8')) as unknown as Plan[]
function writePlans() {
    writeFileSync('seeders/data/plans.json', JSON.stringify(plans, null, 4))
}

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// type Plan = {
//     id?: string
//     item: {
//         name: string
//         amount: number
//         currency: string
//     }
//     period: 'daily' | 'weekly' | 'monthly' | 'yearly'
//     interval: number
//     program: string,
//     description?: string

// }


async function createPlansInRzp() {

    try {
        // check for env
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET)
            throw new Error('Razorpay keys not found')

        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        })

        await connectDB()

        // delete all plans with no id
        await PlanModel.deleteMany({
            id: {
                $exists: false
            }
        })

        const updated = [...plans] as Plan[]

        const allPlans = await razorpay.plans.all()

        console.log('All plans:', allPlans.items.map((p) => p.item.name))

        // for await (const plan, index of plans) {
        for (let index = 0; index < plans.length; index++) {
            // check if plan already exists
            // match with plan name, amount, period and interval

            const plan = plans[index]

            console.log('Checking:', plan.item.name)

            // search for exisiting plan, add id in it if doesn't exist
            const existingPlan = allPlans.items.find((p) => {
                return p.id == plan.id
                    && p.item.amount === plan.item.amount
                    && p.period === plan.period
                    && p.interval === plan.interval
            })

            if (existingPlan) {
                console.log(`✅ Plan Matched: ${existingPlan.item.name}`)
                plan.id = existingPlan.id
            } else {
                // create new plan
                const res = await razorpay.plans.create({
                    item: plan.item,
                    period: plan.period,
                    interval: plan.interval,
                    notes: {
                        description: plan.description ?? plan.item.name,
                        image: plan.image ?? ''
                    }
                })

                if (res.id) {
                    console.log(`✅ Plan created: ${res.id}`)
                    plan.id = res.id
                } else {
                    console.error('❌ Plan creation failed')
                }
            }
            updated[index] = plan

            // update plan in db according to their ids
            if (plan.id)
                await PlanModel.updateOne({ id: plan.id }, plan, { upsert: true })
        }

        // write updated plans to file
        writeFileSync('seeders/data/plans.json', JSON.stringify(updated, null, 4))
    }
    catch (error) {
        console.log('❌ Error:', error)
    }
    finally {
        console.log('✅ Done')
        disconnectDB()
    }

}


async function syncPlans() {
    // check for env
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET)
        throw new Error('Razorpay keys not found')

    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const allPlans = await razorpay.plans.all()

    const u = allPlans.items.map((p) => {
        const plan: InstanceType<typeof PlanModel> = {
            // id: p.id,
            id: p.id,
            item: {
                name: p.item.name,
                amount: p.item.amount as number,
                currency: p.item.currency
            },
            period: p.period,
            interval: p.interval,
            description: p.notes?.['description'] ?? p.notes?.['Description'] ?? '',
            image: p.notes?.['image'] ?? p.notes?.['Image'] ?? '',
        }

        return plan
    })

    await PlanModel.deleteMany({})

    // update plans in db according to their ids
    await PlanModel.insertMany(u)

}

const createNewPlan = async () => {
    try {
        // check for env
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET)
            throw new Error('Razorpay keys not found')

        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        })

        const planName = await cl.prompt("Enter plan name", { type: 'text' })
        const amount = parseInt(await cl.prompt("Enter amount in paise", { type: 'text', placeholder: '10000 for 100' }))
        const currency = await cl.prompt("Enter currency", { type: 'text', default: 'INR', placeholder: 'INR' })
        const period = await cl.prompt("Enter period", { type: 'text', default: 'monthly', placeholder: 'daily | weekly | monthly | yearly' })
        const interval = parseInt(await cl.prompt("Enter interval", { type: 'text', default: '1', placeholder: '1' }))
        const program = await cl.prompt("Enter program id", { type: 'text', placeholder: "program-id" })

        if (!planName || !amount || !currency || !period || !interval || !program)
            throw new Error('Invalid inputs')

        const plan = {
            item: {
                name: planName,
                amount,
                currency
            },
            period: period as 'daily' | 'weekly' | 'monthly' | 'yearly',
            interval,
            program: undefined as any
        } as Plan

        cl.info('Connecting to db...')
        await connectDB()

        cl.start('Creating plan...')
        cl.box(planName)

        await new Promise((resolve) => setTimeout(resolve, 2000))

        // const res = await razorpay.plans.create({ ...plan })

        // if (res.id) {
        //     cl.success(`Plan created: ${res.id}`)
        //     plan.id = res.id
        // } else {
        //     cl.error('Plan creation failed')
        // }

        // plan.program = program

        // // update plan in db according to their ids
        // if (plan.id)
        //     await PlanModel.updateOne({ id: plan.id }, plan, { upsert: true })

        // // add id to plans
        // plans.push(plan)
        // writePlans()

        return plan
    }
    catch (error) {
        console.log('❌ Error:', error)
    }
    finally {
        // console.log('✅ Done')
        cl.debug('Done')
        disconnectDB()
    }

}

async function createCustomer() {
    try {
        const email = ''
        const name = ''
        const phone = ''
    
        const user = await razorpay.customers.create({
            email,
            name,
            contact: phone,
            fail_existing: 0
        })
    
        console.log(user)
    } catch (error) {
        cl.error('Error:', error)
    }
}

const args = process.argv.slice(2)

const createPlans = args.includes('--create-plans')
const sync = args.includes('--sync')
const newPlan = args.includes('--new-plan')
const createCustomerFlag = args.includes('--create-customer')

createPlans && (() => {
    console.log('Creating plans in Razorpay')
    createPlansInRzp()
})()

sync && syncPlans()


if (newPlan)
    createNewPlan()

if (createCustomerFlag)
    createCustomer()