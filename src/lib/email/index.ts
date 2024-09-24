import { createTransport } from 'nodemailer';

export const transporter = createTransport({
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
    from?: string;
    to: string;
    subject: string;
    replyTo?: string;
} & (
        { text?: undefined; html: string } | { text: string; html?: string } | { text: string; html: string }
    )

type Options = {
    throwOnError?: boolean;
}

export const sendEmail = async (props: EmailOptions, options: Options = { throwOnError: true }) => {
    try {

        const info = await transporter.sendMail({
            from: `TheBFF <${process.env.EMAIL_USER}>`,
            ...props
        })

        return { success: true, message: "Email sent successfully", info }


    } catch (error: any) {
        console.log(error)
        if (options.throwOnError) throw new Error(error.message ?? "Something went wrong")
        else return { success: false, message: error.message ?? "Something went wrong" }
    }
}