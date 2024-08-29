import { ObjectId } from "mongoose";

export type Programs = {
    _id: string;
    programs: Program[];
}

export type Program = {
    id: string;
    name: string;
    description: string;
    image: string;
    // caption?: string;
    featureTitle: string;
    featureDescription: string;
    features: Feature[];
    coaches: Coach[];
};

export type Feature = {
    id: string | number;
    previewImage?: string;
    title: string;
    heading: string;
    subheading: string;
    description: string;
    image: string;
};


type Coach = string | ObjectId;