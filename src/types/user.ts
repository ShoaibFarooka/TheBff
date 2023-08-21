export enum UserRole {
    ADMIN = 1,
    COACH,
    USER
}

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: UserRole;
}