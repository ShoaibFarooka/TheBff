import { getURL } from "@/lib/helpers"
import { companyAndAdress } from "./shared"

// welcome email template
export const welcomeEmailTemplate = ({
    name
}: {
    name: string
}) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to TheBFF</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td>
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                        <tr>
                            <td style="background-color: #007bff; color: #ffffff; text-align: center; padding: 20px; border-radius: 5px 5px 0 0;">
                                <h1 style="margin: 0; font-size: 24px;">Welcome to TheBFF</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; color: #333333;">
                                <p style="font-size: 16px; line-height: 1.5;">Dear ${name},</p>
                                <p style="font-size: 16px; line-height: 1.5;">
                                    Welcome to TheBFF! We are thrilled to have you on board.
                                </p>
                                <p style="font-size: 16px; line-height: 1.5;">
                                    You can now access your account and explore our services at <a href=${getURL()} style="color: #007bff; text-decoration: none;">TheBFF</a>.
                                </p>
                                <p style="font-size: 16px; line-height: 1.5;">
                                    If you have any questions, feel free to reach out to us at befitnessfrenzy@gmail.com or call us at +91 8289031810.
                                </p>
                            </td>
                        </tr>
                        ${companyAndAdress}
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>   
    `
}


// an email template to notify admin when a user registers
export const registrationNotification = ({
    name, email, phone
}: {
    name: string, email: string, phone: string
}) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New User Registration</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td>
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                        <tr>
                            <td style="background-color: #007bff; color: #ffffff; text-align: center; padding: 20px; border-radius: 5px 5px 0 0;">
                                <h1 style="margin: 0; font-size: 24px;">New User Registration</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px 20px 5px 20px; color: #333333;">
                                <p style="font-size: 16px; line-height: 1.5;">Dear Admin Team,</p>
                                <p style="font-size: 16px; line-height: 1.5;">
                                    A new user has registered. Please review the details below:
                                </p>
                                <ul>
                                    <li style="font-size: 16px; line-height: 1.5;">Name: ${name}</li>
                                    <li style="font-size: 16px; line-height: 1.5;">Email: ${email}</li>
                                    <li style="font-size: 16px; line-height: 1.5;">Phone: ${phone}</li>
                                </ul>

                                <p style="font-size: 16px; line-height: 1.5;">
                                    Please reach out to the user to welcome them to TheBFF.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 20px 20px 20px; color: #333333;">
                                <p style="font-size: 16px; line-height: 1.5; color: #777777;">
                                    Thank you, <br />
                                    TheBFF Team
                                </p>
                            </td>
                        </tr>
                        ${companyAndAdress}
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>`
}