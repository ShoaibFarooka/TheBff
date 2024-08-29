export type Offer = {
    id: string
    offerName: string
    displayText: string
    terms: string
    minPayment: number
    maxDiscount: number
    expiryDate: Date // convertStringToDate('2022-12-31')
    discountType: 'Flat' | 'Percentage'
    discountWorth: number
}