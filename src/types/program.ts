import { ObjectId } from "mongoose";

export type Programs = {
    _id: string;
    programs: Program[];
}

export type Program = {
    id: string;
    name: string;
    title: string;
    description: string;
    image: string;
    caption?: string;
    featureTitle: string;
    featureDescription: string;
    features: Feature[];
    coaches: Coach[];
};

type Feature = {
    id: string | number;
    previewImage?: string;
    name: string;
    title: string;
    description: string;
    image: string;
};


type Coach = string | ObjectId;