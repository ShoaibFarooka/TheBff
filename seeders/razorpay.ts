// #!/usr/bin/env -S pnpm tsx --env-file=.env

// import { Plan as PlanModel } from "@/models";
// // import connectDB from "@/lib/dbConnection"
// import connectDB, { disconnectDB } from "@/lib/dbConnection";
// import { Plan } from "@/types/subscription";
// import { consola } from 'consola';
// import { readFileSync, writeFileSync } from "fs";

// import dotenv from "dotenv";
// import Razorpay from "razorpay";
// import { revalidateTags } from "./utils";
// dotenv.config();

// let plans = JSON.parse(
//   readFileSync("seeders/data/plans.json", "utf-8")
// ) as unknown as Plan[];

// const readPlansFromFile = () => {
//   plans = JSON.parse(
//     readFileSync("seeders/data/plans.json", "utf-8")
//   ) as unknown as Plan[];
// }

// const sortPlans = () => {
//   // sort by programId, then by package (standard, premium, etc)
//   plans.sort((a, b) => a.programId.localeCompare(b.programId));
// }

// const writePlansToFile = () => {
//   writeFileSync("seeders/data/plans.json", JSON.stringify(plans, null, 4));
// }

// async function setup() {
//   if (
//     !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
//     !process.env.RAZORPAY_KEY_SECRET
//   )
//     throw new Error("Razorpay keys not found");

//   const razorpay = new Razorpay({
//     key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//     key_secret: process.env.RAZORPAY_KEY_SECRET!,
//   });

//   await connectDB();
//   return razorpay;
// }

// async function savePlansInDB() {
//   try {
//     await connectDB();
//     // save plans in database
//     for await (const plan of plans) {
//       try {
//         await PlanModel.updateOne(
//           { id: plan.id }, // find by id
//           plan, // update the plan
//           { upsert: true } // create if not found
//         );
//       } catch (err) {
//         consola.error(`Error creating plan: ${plan.item.name}`, err);
//       }
//     }

//     await revalidateTags(["plans"]);
//   } catch (error) {
//     console.log("❌ Error:", error);
//   } finally {
//     console.log("✅ Done");
//     disconnectDB();
//   }
// }

// async function loadPlansFromDB() {
//   // Load plans from db and write to file
//   try {
//     await connectDB();

//     const allPlans = await PlanModel.find({});

//     consola.info("Plans found:", allPlans.length);
//     writeFileSync("seeders/data/plans.json", JSON.stringify(allPlans, null, 4));
//   }
//   catch (error) {
//     console.log("❌ Error:", error);
//   } finally {
//     disconnectDB();
//   }
// }

// const createNewPlan = async () => {
//   try {
//     // check for env
//     const razorpay = await setup();

//     const planName = await consola.prompt("Enter plan name", { type: "text" });
//     const amount = parseInt(
//       await consola.prompt("Enter amount in paise", {
//         type: "text",
//         placeholder: "10000 for 100",
//       })
//     );
//     const currency = await consola.prompt("Enter currency (default: INR)", {
//       type: "text",
//       default: "INR",
//       placeholder: "INR",
//     });
//     const period = await consola.prompt("Enter period", {
//       type: "text",
//       default: "monthly",
//       placeholder: "daily | weekly | monthly | yearly",
//     }) as "daily" | "weekly" | "monthly" | "yearly";
//     const interval = parseInt(
//       await consola.prompt("Enter interval (default: 1)", {
//         type: "text",
//         default: "1",
//         placeholder: "1",
//       })
//     );
//     const programId = await consola.prompt("Enter program id", {
//       type: "text",
//       placeholder: "eg. dance.fitness",
//     });

//     if (!planName || !amount || !currency || !period || !interval || !programId)
//       throw new Error("Invalid inputs");

//     const plan = {
//       item: {
//         name: planName,
//         amount,
//         currency,
//       },
//       period: period,
//       interval,
//       programId: undefined as any,
//     } as Plan;

//     consola.info("Connecting to db...");
//     await connectDB();

//     consola.start("Creating plan...");
//     consola.box(planName);

//     // await new Promise((resolve) => setTimeout(resolve, 2000));

//     const res = await razorpay.plans.create({ ...plan })

//     if (!res.id) {
//       consola.error('Plan creation failed')
//       process.exit(1)
//     }

//     consola.success(`Plan created: ${res.id}`)
//     plan.id = res.id

//     plan.programId = programId

//     consola.info("Saving plan to db...");
//     // update plan in db according to their ids
//     if (plan.id)
//       await PlanModel.updateOne({ id: plan.id }, plan, { upsert: true })

//     const confirmSave = await consola.prompt("Would you like to save this plan in database and plans.json?", {
//       type: "confirm",
//       default: true,
//     });

//     if (!confirmSave) {
//       return plan;
//     }

//     // Load data from db to plans.json
//     const confirmLoad = await consola.prompt("Before saving, would you like to load plans from database to plans.json?", {
//       type: "confirm",
//       default: false,
//     });

//     if (confirmLoad) {
//       await loadPlansFromDB();
//       readPlansFromFile();
//     }

//     plans.push(plan);
//     sortPlans();
//     writePlansToFile();

//     await revalidateTags(["plans"])

//     return plan;
//   } catch (error) {
//     console.log("❌ Error:", error);
//   } finally {
//     // console.log('✅ Done')
//     consola.debug("Done");
//     disconnectDB();
//   }
// };

// let actions: string[] = process.argv.slice(2);

// const seeders = [
//   {
//     label: "Save plans to Database",
//     value: "save-plans",
//     hint: "Save plans from ./data/plans.json to database",
//     fn: savePlansInDB,
//   },
//   {
//     label: "Load plans from Database",
//     value: "load-plans",
//     hint: "Load plans from Database to plans.json",
//     fn: loadPlansFromDB,
//   },
//   {
//     label: "Create new plan",
//     value: "create-plan",
//     hint: "Create a new plan",
//     fn: createNewPlan,
//   }
// ]

// async function main() {
//   if (actions.length === 0) {
//     actions = await consola.prompt("Choose an action", {
//       type: "multiselect",
//       options: seeders.map(({ label, value, hint }) => ({ label, value, hint })),
//     }) as unknown as string[]; // Because of a bug in consola types
//   }

//   for await (const action of actions) {
//     const seeder = seeders.find(s => s.value === action);
//     if (seeder) {
//       await seeder.fn();
//     }
//   }

//   consola.success("Done");
// }

// main();
