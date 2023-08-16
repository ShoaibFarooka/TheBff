const template = ({
    name, email, message
}: {
    name: string, email: string, message: string
}) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Request Received</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
                <td style="padding: 20px; background-color: #f7f7f7;">
                    <h2>User Request Received</h2>
                    <p>Hello,</p>
                    <p>A new contact request has been received from a user:</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td style="padding: 10px;">
                                <strong>User Name:</strong>
                            </td>
                            <td style="padding: 10px;">
                                ${name}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">
                                <strong>Email Address:</strong>
                            </td>
                            <td style="padding: 10px;">
                                ${email}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">
                                <strong>Message:</strong>
                            </td>
                            <td style="padding: 10px;">
                                ${message}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 20px; background-color: #333; color: #fff;">
                    <p>&copy; ${new Date().getFullYear()} TheBFF. All rights reserved.</p>
                </td>
            </tr>
        </table>
    
    </body>
    </html>
    
    `
}

export default template;