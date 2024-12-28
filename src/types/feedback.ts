import { ObjectId } from "mongoose";

export type Feedback = {
    _id: string | ObjectId; // Unique identifier for the feedback
    name: string;           // Name of the user providing the feedback
    userId: string | ObjectId; // ID of the user (should reference a User model)
    status: boolean;
    text: string;          // The feedback comment
    stars: number;        // Rating given by the user (1 to 5)
    image?: string;       // Optional image URL associated with the feedback
}
