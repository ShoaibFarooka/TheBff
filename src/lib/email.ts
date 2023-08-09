import { createTransport } from 'nodemailer'

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

type EmailOptions = {
    to: string;
    subject: string;
} & (
    { text?: undefined; html: string } | { text: string; html?: string } | { text: string; html: string }
)

export const sendEmail = async (props: EmailOptions) => {
    try {

        const info = await transporter.sendMail({
            from: `"TheBFF" <${process.env.EMAIL_USER}>`,
            ...props
        })

        return { success: true, message: "Email sent successfully", info }


    } catch (error: any) {
        throw new Error(error.message ?? "Something went wrong")   
    }
}