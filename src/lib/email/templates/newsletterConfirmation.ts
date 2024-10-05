const template = (url: string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirm Subscription</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

        <table width="100%" bgcolor="#f4f4f4" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td>
                    <table align="center" width="600" cellpadding="0" cellspacing="0" border="0" style="margin: 20px auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);">
                        <tr>
                            <td style="padding: 20px;">
                                <h1 style="color: #333333;">Confirm Subscription</h1>
                                <p style="color: #666666;">Thank you for subscribing to our newsletter. Please click the button below to confirm your subscription:</p>
                                <p style="text-align: center; margin-top: 30px;">
                                    <a href="${url}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 3px;">Confirm Subscription</a>
                                </p>
                                <p style="color: #666666;">
                                    If you didn't request this subscription, you can safely ignore this email. 
                                    <br /> 
                                    If you still want to subscribe click the button above.
                                </p>

                                <p style="color: #666666;">Regards,<br><b>Team TheBFF</b></p>

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


export default template