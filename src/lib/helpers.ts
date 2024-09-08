// import { Database } from '@/types_db';
// type Price = Database['public']['Tables']['prices']['Row'];


import { Price } from "@/types/db";

export const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_APP_URL ?? // Set this to your app URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/';
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;

    // Make sure to remove trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url.slice(0, -1) : url;
    return url;
};

export const postData = async ({
    url,
    data
}: {
    url: string;
    data?: { price: Price };
}) => {

    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        console.error('Error in postData', { url, data, res });
        throw Error(res.statusText);
    }

    return res.json();
};

export const toDateTime = (secs: number) => {
    var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
    t.setSeconds(secs);
    return t;
};

// a function to log/debug data to the console, only in development

/**
 * a function to return string containing = repeated n times
 * @param count {number} - number of times to repeat the string
 */

export const equalString = (count: number) => {
    return '='.repeat(count);
};

/**
 * Logs data to the console same as console.log, but only in development.
 */
export const devLog = (
    ...args: any[]
) => {
    if (process.env.NODE_ENV === 'development')
        console.log(...args);
};

devLog.error = (...args: any[]) => {
    if (process.env.NODE_ENV === 'development')
        console.error(...args);
};

devLog.warn = (...args: any[]) => {
    if (process.env.NODE_ENV === 'development')
        console.warn(...args);
};

devLog.info = (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.info(...args);
    }
}

devLog.debug = (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.debug(...args);
    }
}

devLog.trace = (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.trace(...args);
    }
}

// ================= {END OF DEVLOG} =================

// a function to sanitize objects. i.e remove null, undefined, empty strings, etc. With some extra options that user can pass as parameter.
export const sanitizeObject = (
    obj: { [key: string]: any },
    options?: {
        removeEmptyString?: boolean;
        removeNull?: boolean;
        removeUndefined?: boolean;
        removeEmptyArray?: boolean;
    }
): { [key: string]: any } => {
    const {
        removeEmptyString = true,
        removeNull = true,
        removeUndefined = true,
        removeEmptyArray = true,
    } = options ?? {};

    const newObj: { [key: string]: any } = {};

    Object.keys(obj).forEach((key) => {
        if (removeEmptyString && obj[key] === '') {
            return;
        }
        if (removeNull && obj[key] === null) {
            return;
        }
        if (removeUndefined && obj[key] === undefined) {
            return;
        }
        if (removeEmptyArray && Array.isArray(obj[key]) && obj[key].length === 0) {
            return;
        }
        newObj[key] = obj[key];
    });

    return newObj;
};
