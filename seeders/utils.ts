import consola from 'consola';
import dotenv from 'dotenv';
dotenv.config();

consola.log('-', process.env.REVALIDATE_TOKEN, '-');

const APP_URL = new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000');

const revalidateUrl = new URL(`${APP_URL.origin}/revalidate`).toString();
const revalidateToken = process.env.REVALIDATE_TOKEN;

export const revalidateTags = async (tags: string[]) => {
    try {
        consola.info("Revalidating tags:", tags);
        consola.info(`Using revalidate URL: ${revalidateUrl}`);

        const res = await fetch(revalidateUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": revalidateToken ?? ""
            },
            body: JSON.stringify({ tags, multiple: true })
        });

        if (res.status !== 200) {
            throw new Error(`Revalidation failed with status: ${res.status}`);
        }

        consola.success("Revalidation successful");
        
    } catch (error) {
        console.log(error)
    }
}