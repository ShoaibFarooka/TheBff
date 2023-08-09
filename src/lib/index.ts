// Write a function to verify if a string is a valid email address. Use regex of common email patterns.

export function isEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return regex.test(email)
}

// A funciton to get query params from url in the form of object

export function getQueryParams(url: string): any {

    const searchParams = new URL(url).searchParams;
    const params: any = {};
    for (const [key, value] of searchParams as any) {
        params[key] = value;
    }
    
    return params;

}