"use server"
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '@/models/user'
import { cookies } from 'next/headers'
import nodemailer from 'nodemailer'
import type { User as UserType } from '@/types/user'
import '@/lib/db'

// methods to login, register, and authenticate users


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // === add this === //
    tls : { rejectUnauthorized: false }
});

const getRoleObject = (role: UserType['role']) => ['coach', 'admin'].includes(role) ? { role } : {}

// authenticate
export async function authenticate( role: UserType['role'] = 'user' ) {
    try {
        const cookie = cookies()
        const token = cookie.get('token')
        if (!token) return { success: false, message: 'No token found' }

        const decoded = jwt.verify(token.value, process.env.JWT_SECRET! || 'secret') as any
        if (!decoded) return { success: false, message: 'Invalid token' }

        if(decoded.role !== role) return { success: false, message: 'Role mismatch' }

        return { success: true, user: decoded }

    } catch (error: any) {
        if(error instanceof JsonWebTokenError) return {success: false, message: 'Token expired'}
        console.error(error)
        return {success: false}
    }
}


// login
export async function login({email, password, role = 'user'} : {email: string, password: string, role?: UserType['role']}) {
    // const user = await db.users.findOne({ email })
    try {
        const user = await User.findOne({ email })
        if (!user) return { success: false, message: 'User not found' }

        if(user.role !== role) return { success: false, message: 'Role mismatch' }

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return { success: false, message: 'Incorrect password' }
        
        if (!user.verified) return { success: false, message: 'Please verify your email to login. Check your email for login.' }

        const token = jwt.sign({ email: user.email, name: user.name, phone: user.phone, ...getRoleObject(role) }, process.env.JWT_SECRET! || 'secret')

        // set token in cookie for 30 days
        const cookie = cookies()
        cookie.set('token', token, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        
        return { success: true }
        // return { success: true, token, user }
    } catch (error) {
        console.error(error)
        return {success: false}
    }
}


// register
export async function register(
    { email, password, name, phone, callbackUrl ='/' } :
    { email: string, password: string, name: string, phone?: string, callbackUrl?: string }
) {
    try {
        // check if user already exists, if so return error, else create user, hash password, send verification email, and return success
        const exist = await User.findOne({ email })
        if (exist) return { success: false, message: 'User already exists' }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            email, password: hashedPassword, name, phone, role: 'user'
        })
        await user.save()

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET! || 'secret', { expiresIn: '1hr' })

        const url = `${process.env.BASE_URL || 'http://localhost:3000'}/auth/verify?token=${token}${callbackUrl ? '&cb=' + callbackUrl : ''}`
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verify your account',
            html: `Please click this link to verify your account: <a href="${url}">${url}</a>`
        }

        await transporter.sendMail(mailOptions)

        return { success: true }

    } catch (error) {
        console.error(error)
        return {success: false}
    }
}


export const addSuperUser = async (
    { email, password, name, phone, role = 'admin' } :
    { email: string, password: string, name: string, phone?: string, callbackUrl?: string, role: UserType['role'] }
) => {
    try{
        
        const auth = await authenticate('admin')
        if(!auth.success) return { success: false, message: auth.message ?? 'Not authorized' }

        const exist = await User.findOne({ email })
        if (exist) return { success: false, message: 'User already exists' }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            email, password: hashedPassword, name, phone, role, emailVerified: true, phoneVerified: true
        })
        await user.save()

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
                <p>Click <a href="${(process.env.BASE_URL ?? 'http://localhost:3000')}">here</a> to login</p>    
            `
        }

        await transporter.sendMail(mailOptions)

        return { success: true }

    } catch (error) {
        console.error(error)
        return { success: false }
    }
}


// verify email
export async function verifyEmail(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET! || 'secret') as any
        const user = await User.findOne({ email: decoded.email })
        if (!user) return { success: false, message: 'User not found' }

        user.emailVerified = true
        await user.save()

        return { success: true }
    } catch (error) {
        console.error(error)
        return {success: false}
    }
}

export async function verifyPhone(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET! || 'secret') as any
        const user = await User.findOne({ phone: decoded.phone })
        if (!user) return { success: false, message: 'User not found' }

        user.phoneVerified = true
        await user.save()

        return { success: true }
    } catch (error) {
        console.error(error)
        return {success: false}
    }
}



// reset password
// take email and send reset password email
export async function resetPassword(
    {newPass, token} :
    {newPass: string, token: string}
) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET! || 'secret') as any
        const user = await User.findOne({ email: decoded.email })
        if (!user) return { success: false, message: 'User not found' }

        const hashedPassword = await bcrypt.hash(newPass, 10)
        user.password = hashedPassword
        await user.save()

        return { success: true }

    } catch (error) {
        console.error(error)
        return {success: false, message: 'Error resetting password'}
    }
}


// send reset password email
// take email and send reset password email
export async function sendResetPasswordEmail(
    { email } : { email: string }
) {
    try {
        const user = await User.findOne({ email })
        if (!user) return { success: false, message: 'User not found' }

        // create token for 10 minutes
        const token = jwt.sign({ email }, process.env.JWT_SECRET! || 'secret', { expiresIn: '10m' })

        const url = `${process.env.BASE_URL}/auth/reset-password/${token}`
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset your password',
            html: `Please click this link to reset your password: <a href="${url}">${url}</a>`
        }

        await transporter.sendMail(mailOptions)

        return { success: true }
    } catch (error) {
        console.error(error)
        return {success: false, message: 'Error sending reset password email'}
    }
}

