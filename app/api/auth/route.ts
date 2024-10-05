import { login, register } from "@/lib/auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {

    try {

        const body = await req.json();
        const { name, email, phone, password, signup, address, cb } = body;

        if (signup) {
            if (!name || !phone) return new Response(JSON.stringify({ error: "Name and Phone are required" }), { status: 400 })
        }

        if (!email || !password) return new Response(JSON.stringify({ error: "Email and Password are required" }), { status: 400 })

        if (!signup) return handelLogin(email, password);
        return handelSignup(name, email, phone, password, address);

    } catch (error: any) {
        if (error?.name == 'Error') return new Response(JSON.stringify({ error: error.message }), { status: 400 })
        return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 })
    }

}


async function handelLogin (email: string, password: string) {

    const res = await login({ email, password });
    return new Response(JSON.stringify({ success: !!res.success, message: res.message }), { status: !!res.success ? 200 : 400 })

}

async function handelSignup (name: string, email: string, phone: string, password: string, address: any) {
    
    const res = await register({ name, email, phone, password, address });
    return new Response(JSON.stringify({ success: !!res.success, message: res.message  }), { status: !!res.success ? 200 : 400 })

}