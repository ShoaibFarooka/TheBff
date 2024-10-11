"use server";
import "@/lib/db";
import { connectDB } from "@/lib/db";
import { User } from "@/models";
import { UserRole, User as UserType } from "@/types/user";
import bcrypt from "bcryptjs";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { cookies } from "next/headers";
import { cache } from "react";
import { baseUrl } from "./config";
import { sendEmail, transporter } from "./email";
import emailVerificationTemplate from "./email/templates/emailVerification";
import { registrationNotification, welcomeEmailTemplate } from "./email/templates/user";
import { devLog, getURL } from "./helpers";
import { logger } from "./logger";

// methods to login, register, and authenticate users
const secret = process.env.JWT_SECRET! || "secret";

// function to verify JWT token
function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, secret) as {
      [key: string]: string | number;
    };
    return decoded;
  } catch (error) {
    return null;
  }
}

const getSuperUserRoleObject = (role: UserRole) =>
  [UserRole.ADMIN, UserRole.COACH, UserRole.USER].includes(role)
    ? { role }
    : {};

export type Auth = {
  success: boolean;
  user?: {
    _id: string;
    email: string;
    name: string;
    phone: string;
    role: UserRole;
  };
  unAuthenticated?: boolean;
  message?: string;
};

// authenticate
export const authenticate = cache(
  async (role: UserRole | UserRole[] = UserRole.USER)
    : Promise<Auth> => {
    try {
      const cookie = cookies();
      const token = cookie.get("token");
      if (!token)
        return {
          success: false,
          unAuthenticated: true,
          message: "No token found",
        };

      const decoded = jwt.verify(token.value, secret) as any;
      if (!decoded)
        return {
          success: false,
          unAuthenticated: true,
          message: "Invalid token",
        };

      if (Array.isArray(role) && !role.includes(decoded.role))
        return { success: false, message: "Role mismatch" };
      if (decoded.role !== role)
        return { success: false, message: "Role mismatch" };

      return { success: true, user: decoded };
    } catch (error: any) {
      if (error instanceof JsonWebTokenError)
        return { success: false, message: "Token expired" };
      console.error(error);
      return { success: false, unAuthenticated: true };
    }
  }
);

// login
export async function login({
  email,
  password,
  role = UserRole.USER,
}: {
  email: string;
  password: string;
  role?: UserRole;
}) {
  // const user = await db.users.findOne({ email })
  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) return { success: false, message: "User not found" };

    // if (user.role !== role) return { success: false, message: "Role mismatch" };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { success: false, message: "Incorrect password" };

    if (!user.emailVerified)
      return {
        success: false,
        emailVerified: false,
        message:
          "Please verify your email to login. Check your email for verfication link.",
      };
    // if (!user.phoneVerified) return { success: false, phoneVerified: false, message: 'Please verify your phone number to login. Check WhatsApp for verfication link.' }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        ...getSuperUserRoleObject(role),
      },
      secret
    );

    // set token in cookie for 30 days
    const cookie = cookies();
    logger.log("Setting cookie", token);
    cookie.set("token", token, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days

    return { success: true, role: user?.role };
    // return { success: true, token, user }
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// logout
export async function logout() {
  const cookie = cookies();
  cookie.set("token", "", { maxAge: 0 });
  return { success: true };
}

// register
export async function register({
  email,
  password,
  name,
  phone,
  address,
  callbackUrl = "/",
}: {
  email: string;
  password: string;
  name: string;
  phone?: string;
  callbackUrl?: string;
  address: UserType['address']
}) {
  try {
    // check if user already exists, if so return error, else create user, hash password, send verification email, and return success
    await connectDB();
    const exist = await User.findOne({ email });
    if (exist) return { success: false, message: "User already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      role: UserRole.USER,
      address
    });

    const promises = []
    promises.push(user.save()) // save user to db

    // send verification email
    promises.push(sendVerifcationLinks({ method: "ew", email, phone: phone ?? "" }))

    // send notification to admin
    promises.push(sendEmail({
      to: process.env.EMAIL_USER!,
      subject: "New User Registration",
      html: registrationNotification({ name, email, phone: phone ?? "" })
    }))

    await Promise.all(promises)

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function registerClient({
  email,
  password,
  isDirectClient = true,
  name,
  phone,
  address,
}: {
  email: string;
  password: string;
  isDirectClient: boolean;
  name: string;
  phone?: string;
  address: UserType['address']
}) {
  try {
    console.log(email)
    console.log(password)
    // check if user already exists, if so return error, else create user, hash password, send verification email, and return success
    await connectDB();
    const exist = await User.findOne({ email });
    if (exist) return { success: false, message: "Client already exists" };

    const user = new User({
      email,
      password,
      isDirectClient,
      name,
      phone,
      role: UserRole.USER,
      address
    });

    const promises = []
    promises.push(user.save()) // save user to db

    // send notification to admin
    promises.push(sendEmail({
      to: process.env.EMAIL_USER!,
      subject: "New User Registration",
      html: registrationNotification({ name, email, phone: phone ?? "" })
    }))

    await Promise.all(promises)

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export const addSuperUser = async ({
  email,
  password,
  name,
  phone,
  role = UserRole.USER,
}: {
  email: string;
  password: string;
  name: string;
  phone?: string;
  callbackUrl?: string;
  role: UserRole;
}) => {
  try {
    const auth = await authenticate(UserRole.ADMIN);
    if (!auth.success)
      return { success: false, message: auth.message ?? "Not authorized" };

    await connectDB();
    const exist = await User.findOne({ email });
    if (exist) return { success: false, message: "User already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      role,
      emailVerified: true,
      phoneVerified: true,
    });
    await user.save();

    // notify user of account creation
    const mailOptions = {
      to: user.email,
      subject: `You've been added as ${role} in TheBff`,
      html: `
                <h1>Welcome to TheBff</h1>
                <p>You've been added as ${role} in TheBff</p>
                <p>Use the following credentials to login</p>
                <p>Email: ${user.email}</p>
                <p>Password: ${password}</p>
                <p>Click <a href="${process.env.BASE_URL ?? "http://localhost:3000"
        }">here</a> to login</p>    
            `,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

// verify email
export async function verifyEmail(token: string) {
  try {
    const decoded = verifyToken(token);
    if (!decoded || !decoded.email || !decoded.verifyEmail)
      return { success: false, message: "Invalid token" };

    await connectDB();
    const user = await User.findOne({ email: decoded.email });
    if (!user) return { success: false, message: "User not found" };

    user.emailVerified = true;

    const promises: Promise<any>[] = [user.save()];

    // send welcome email
    promises.push(sendEmail({
      to: user.email,
      subject: "Welcome to TheBff",
      html: welcomeEmailTemplate({ name: user.name }),
      text: `Welcome to TheBff, ${user.name}`
    }))

    await Promise.all(promises);

    return { success: true, message: "Email verified successfully" };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.message ?? "Error verifying email",
    };
  }
}

// verify phone
export async function verifyPhone(token: string) {
  try {
    const decoded = verifyToken(token);
    if (!decoded || !decoded.phone || !decoded.verifyPhone)
      return { success: false, message: "Invalid token" };

    await connectDB();
    const user = await User.findOne({ phone: decoded.phone });
    if (!user) return { success: false, message: "User not found" };

    user.emailVerified = true;
    await user.save();

    return { success: true, message: "Phone number verified sucessfully" };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.message ?? "Error verifying email",
    };
  }
}

// reset password
// take email and send reset password email
export async function resetPassword({
  newPass,
  token,
}: {
  newPass: string;
  token: string;
}) {
  try {
    const decoded = verifyToken(token) as any;
    if (!decoded || decoded.resetPassword !== true)
      return { success: false, message: "Invalid token" };

    const user = await User.findOne({ email: decoded.email });
    if (!user) return { success: false, message: "User not found" };

    const hashedPassword = await bcrypt.hash(newPass, 10);
    user.password = hashedPassword;
    await user.save();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error resetting password" };
  }
}

// send reset password email
// take email and send reset password email
export async function sendResetPasswordEmail(email: string) {
  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) return { success: false, message: "User not found" };

    // create token for 10 minutes
    const token = jwt.sign({ email, resetPassword: true }, secret, {
      expiresIn: "10m",
    });

    const url = `${baseUrl}/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: `Please click this link to reset your password: <a href="${url}">${url}</a>`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error sending reset password email" };
  }
}

type IParams =
  | { method: "e"; email: string }
  | { method: "w"; phone: string }
  | { method: "ew"; email: string; phone: string };
export async function sendVerifcationLinks(data: IParams) {
  try {
    const { method } = data;

    switch (method) {
      case "e":
        return await sendEmailVerificationLink(data.email);
      case "w":
        return await sendPhoneVerificationLink(data.phone);
      case "ew":
        return await Promise.all([
          sendEmailVerificationLink(data.email),
          sendPhoneVerificationLink(data.phone),
        ]);
      default:
        return { success: false, message: "Invalid method" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
}

async function sendEmailVerificationLink(email: string) {
  try {
    const emailToken = jwt.sign({ email, verifyEmail: true }, secret, {
      expiresIn: "1h",
    });
    const url = `${getURL()}/verify-token?token=${emailToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [email],
      subject: "Verify your email",
      html: emailVerificationTemplate(url),
    };

    //* Remove log
    devLog(url);

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error sending email verification link: ", error);
    return { success: false };
  }
}

async function sendPhoneVerificationLink(phone: string) {
  try {
    const phoneToken = jwt.sign({ phone, verifyPhone: true }, secret, {
      expiresIn: "1h",
    });
    const url = `${process.env.BASE_URL ?? "http://localhost:3000"
      }/verify-token?token=${phoneToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "email",
      subject: "Verify your phone",
      html: `Please click this link to verify your phone: <a href="${url}">${url}</a>`,
    };

    // await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
