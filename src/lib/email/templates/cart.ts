// an email template to send email notification tp admin when a user adds something to cart

import { Plan } from "@/types/subscription"
import { User } from "@/types/user"

type UserType = Pick<User, 'name' | 'email' | 'phone'>

const adminCartNotificationTemplate = (
    { items, user }:
        {
            items: Pick<Plan, '_id' | 'name'>[],
            user: UserType
        }
) => {

    return `
<!DOCTYPE html>
<html>
<head>  
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Cart Notification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td>
                <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="background-color: #007bff; color: #ffffff; text-align: center; padding: 20px; border-radius: 5px 5px 0 0;">
                            <h1 style="margin: 0; font-size: 24px;">
                                ${user.name} has added items to cart.
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; color: #333333;">
                            <p style="font-size: 16px; line-height: 1.5;">Dear Admin Team,</p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                A new cart update has been received. Please review the details below:
                            </p>
                            <ul>
                                <li style="font-size: 16px; line-height: 1.5;">User Name: ${user.name}</li>
                                <li style="font-size: 16px; line-height: 1.5;">Email: ${user.email}</li>
                                <li style="font-size: 16px; line-height: 1.5;">Phone: ${user.phone}</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; color: #333333;">
                            <h2 style="font-size: 20px;">Items:</h2>

                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr>
                                        <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Plan Name</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Plan Id</th>
                                    </tr>
                                </thead>
                                ${items.map(item => `
                                    <tr>
                                        <td style="padding: 8px; border: 1px solid #ccc;">
                                            ${item.name}
                                        </td>
                                        <td style="padding: 8px; border: 1px solid #ccc;">
                                            ${String(item._id)}
                                        </td>
                                `).join('')}
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f4f4f4; color: #777777; text-align: center; padding: 20px; font-size: 14px; border-radius: 0 0 5px 5px;">
                            <p style="margin: 0;">&copy; ${new Date().getFullYear()} TheBFF. All rights reserved.</p>
                            <p style="margin: 0;">
                            Transfigure Fitness Solutions Private Limited
                            <br />M007 Logix Blossom Greens, Sector 143,
                            <br />Noida, UP, 201305
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
}



export { adminCartNotificationTemplate }

// sendEmail({
//     to: '',
//     subject: 'New Cart Notification',
//     html: adminCartNotificationTemplate({
//         items: [{ _id: '123', name: 'Plan 1' }, { _id: '456', name: 'Plan 2' }],
//         user: {
//             name: 'Affan',
//             email: '',
//             phone: '1234567890'
//         }
//     })
// })