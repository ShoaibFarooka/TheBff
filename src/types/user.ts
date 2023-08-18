export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: 'user' | 'coach' | 'admin';
}