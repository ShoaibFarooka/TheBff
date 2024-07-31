import { sendVerifcationLinks } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { method, email, phone } = body;

    if (!method)
      return new Response(JSON.stringify({ message: "Method is required" }), {
        status: 400,
      });

    if (method == "e" && !email)
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });
    if (method == "w" && !phone)
      return new Response(JSON.stringify({ message: "Phone is required" }), {
        status: 400,
      });

    await connectDB();
    const user = await User.findOne({
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
    });
    if (!user)
      return new Response(JSON.stringify({ message: "User not found!" }), {
        status: 400,
      });

    if (method == "e" && user.emailVerified)
      return new Response(
        JSON.stringify({ message: "Your email is already verified" }),
        { status: 400 }
      );
    if (method == "w" && user.phoneVerified)
      return new Response(
        JSON.stringify({ message: "Your phone number is already verified" }),
        { status: 400 }
      );

    const res = await sendVerifcationLinks({
      method,
      ...(method == "e" ? { email } : {}),
      ...(method == "w" ? { phone } : {}),
    } as any);
    // console.log(res)

    return new Response(
      JSON.stringify({
        success: true,
        message: "Verification link sent successfully!",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    if (error?.name == "Error")
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
