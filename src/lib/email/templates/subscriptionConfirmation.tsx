const subscriptionConfirmationTemplate = ({
  plans,
  totalAmount
}: {
  plans: { name: string; startDate: string; endDate: string }[];
  totalAmount: number;
}) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Confirmation</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
      <tr>
        <td>
          <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="background-color: #007bff; color: #ffffff; text-align: center; padding: 20px; border-radius: 5px 5px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">Your Subscription(s) is/are Confirmed!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; color: #333333;">
                <p style="font-size: 16px; line-height: 1.5;">Hello,</p>
                <p style="font-size: 16px; line-height: 1.5;">
                    Thank you for subscribing to our service. Your subscription(s) is/are now active.
                </p>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr>
                      <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Plan</th>
                      <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Start Date</th>
                      <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${plans.map((plan) => `
                      <tr>
                        <td style="padding: 8px; border: 1px solid #ccc;">${plan.name}</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">${plan.startDate}</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">${plan.endDate}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>

                <p style="font-size: 16px; line-height: 1.5;">
                  <b>Total Amount:</b> ${totalAmount}
                </p>

                <p style="font-size: 16px; line-height: 1.5;">
                  To access your subscription or manage your account, please visit our website: <a href="${process.env.NEXT_PUBLIC_APP_URL}">${process.env.NEXT_PUBLIC_APP_URL}</a>
                </p>
                <p style="font-size: 16px; line-height: 1.5;">
                  Thank you,<br>The BFF Team
                </p>
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
  `;
};


// a template to send notification to admin team informing about a new subscription
const adminNotificationTemplate = ({
  user,
  plans,
  coupon,
  totalAmount
}: {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  plans: { name: string; startDate: string; endDate: string; amount: number }[];
  coupon?: string;
  totalAmount: number;
}) => {
  const subTotal = plans.reduce((total, plan) => total + plan.amount, 0);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Subscription Notification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td>
        <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background-color: #007bff; color: #ffffff; text-align: center; padding: 20px; border-radius: 5px 5px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">New Subscription Received</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px; color: #333333;">
              <p style="font-size: 16px; line-height: 1.5;">Dear Admin Team,</p>
              <p style="font-size: 16px; line-height: 1.5;">
                A new subscription has been received. Please review the details below:
              </p>
              <ul>
                <li style="font-size: 16px; line-height: 1.5;">Subscriber Name: ${user.name}</li>
                <li style="font-size: 16px; line-height: 1.5;">Phone: ${user.phone}</li>
                <li style="font-size: 16px; line-height: 1.5;">Email: ${user.email}</li>
              </ul>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr>
                  <h3 style="font-size: 20px; line-height: 1.5;">Subscription Details</h3>
                  </tr>
                  <tr>
                    <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Plan</th>
                    <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Start Date</th>
                    <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">End Date</th>
                    <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${plans.map((plan) => `
                    <tr>
                      <td style="padding: 8px; border: 1px solid #ccc;">${plan.name}</td>
                      <td style="padding: 8px; border: 1px solid #ccc;">${plan.startDate}</td>
                      <td style="padding: 8px; border: 1px solid #ccc;">${plan.endDate}</td>
                      <td style="padding: 8px; border: 1px solid #ccc;">${plan.amount}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #333333;">
                <p style="font-size: 16px; line-height: 1.5;">
                    <b>Sub Total:</b> ${subTotal}
                </p>

                ${coupon ? `
                    <p style="font-size: 16px; line-height: 1.5;">
                        <b>Coupon Code:</b> ${coupon}
                    </p>
                    ` : ''
    }

                <p style="font-size: 16px; line-height: 1.5;">
                    <b> Total Amount:</b> ${totalAmount}
                </p>

                
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #333333;">
              <p style="font-size: 16px; line-height: 1.5;">
                Please take necessary actions to process this subscription.
              </p>
              <p style="font-size: 16px; line-height: 1.5;">
                Thank you,<br>The BFF Team
              </p>
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
</html>`
}


export { adminNotificationTemplate, subscriptionConfirmationTemplate };
