import connectDB from "@/lib/dbConnection";
import { Offer as OfferModel } from '@/models';
import { Offer } from "@/types/offer";
import consola from "consola";

/*
 * Add/Update/Delete Offers (for data collection in the db) in the list and run the seeders
*/


/**
 * @example 
 * {
 * offerName: 'Offer 1',
 * displayText: 'Get 10% off on all products',
 * terms: 'Valid on all products',
 * minPayment: 1000,
 * maxDiscount: 500,
 * expiryDate: convertStringToDate('2022-12-31'),
 * discountType: 'Percentage',
 * discountWorth: 10
 * }
 */


// use this function to convert string to date
function convertStringToDate(date: string) {
    return new Date(date)
}


// Add offers to this array to add them
const offersToAdd: Offer[] = [
    {
        id: 'offer_Oqf4Q9FkkVaDQa',
        offerName: '10% Off',
        displayText: '10% Off on all payments',
        terms: `Terms & Conditions:
- Valid on payments above ₹4500
- Maximum discount is ₹500
- Valid till 31 Jul 2025`,
        minPayment: 4500,
        maxDiscount: 500,
        // exp: 31 Jul 2025, 11:59 pm
        expiryDate: convertStringToDate('2025-07-31'),
        discountType: 'Percentage',
        discountWorth: 10
    },
    {
        id: 'offer_OqkOz8Ov0eIx54',
        offerName: 'Diwali Offer',
        displayText: '10% Off on debit and credit card payments',
        terms: `Terms & Conditions:
- Valid on payments of ₹2000 or above
- Maximum discount is ₹500
- Valid till 31 Jul 2025`,
        minPayment: 2000,
        maxDiscount: 500,
        // exp: 31 Jul 2025, 11:59 pm
        expiryDate: convertStringToDate('2025-07-31'),
        discountType: 'Percentage',
        discountWorth: 10
    },
]

// Add offer ids to this array to delete them
const offersToDelete: string[] = []

export const seedOffers = async () => {
    try {
        await connectDB()

        if (offersToDelete.length) {
            await OfferModel.deleteMany({ id: { $in: offersToDelete } })
            consola.success("Deleted offers:", offersToDelete)
        }

        if (offersToAdd.length) {
            // use upsert
            await Promise.all(offersToAdd.map(async (offer) => {
                await OfferModel.updateOne({ id: offer.id }, offer, { upsert: true })
            }));

            consola.success("Added offers:", offersToAdd.map(offer => `${offer.offerName} - ${offer.displayText}`))
        }

    } catch (error) {
        consola.log("Error seeding offers:", error)
    }
}