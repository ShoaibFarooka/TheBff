
export type DiscountTypeEnum = 'percentage' | 'fixed';

export type Discount = {
    title: string;
    description?: string;
    type: DiscountTypeEnum;
    value: number;
}; 