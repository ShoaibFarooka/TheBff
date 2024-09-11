# Setup

- Install nodejs on your system <a href="https://nodejs.org">https://nodejs.org/en</a>
- Install pnpm <a href="https://pnpm.io/installation">https://pnpm.io/installation</a>
- Clone the repo <a href="https://github.com/cyncept/thebff">https://github.com/cyncept/thebff</a>
- Navigate to the directory and run `pnpm install` to install the dependencies.
- Create a `.env` file in the root directory and add the environment variables.
- Run `pnpm dev` to start the server in development mode.
- Run `pnpm build` to build the project. And `pnpm start` to start the server in production mode.

# Environment Variables

```
MONGO_URI - MongoDB URI
REVALIDATE_TOKEN - Revalidate Token (Used fir revalidating the data in the cache)

HYGRAPH_ENDPOINT - Hygraph Endpoint (Used for fetching the data from Hygraph)

RAZORPAY_SECRET - Razorpay Webhook Secret
RAZORPAY_KEY_ID - Razorpay Key ID
RAZORPAY_KEY_SECRET - Razorpay Key Secret

EMAIL_USER - Email User
EMAIL_PASS - Email Password
```

<br />

# Data Management

## Plans

- Add/Update/Delete Plans in the list in the seeders/data/plans.json file
- The amount should be in the smallest currency (paisa) unit. For example, 1000 for ₹10.00
- When updating prices in plans.json, make sure to remove the "id" field from the plan object, and set it to `""`

```json
// @example
{
  "programId": "dance",
  "item": {
    "name": "Dance Standard 1 Month",
    "amount": 265000,
    "currency": "INR"
  },
  "period": "monthly",
  "interval": 1,
  "id": "", // this should be empty string when creating a new plan or updating the price
  "features": ["Feature 1", "Feature 2", "Feature 3"]
}
```
- Run `pnpm seed plans` to seed the plans
- amount is in paisa

## Classes

- Add/Update/Delete Classes in the list in the seeders/classes.tsx file
- Each class should have a list of programIds which are the ids of the <a href="#programs">programs</a> that the class is associated with.
- Run `pnpm seed` or `pnpm seed classes` to seed the classes

## Coaches

<blockquote>
Register on calendly.com and create a new event for each coach. Copy the link of the event and genrate an access token from the link below:<br />
<a href="https://calendly.com/integrations/api_webhooks">https://calendly.com/integrations/api_webhooks</a>
</blockquote>
<br />

- Add/Update/Delete Coaches in the list in the seeders/coaches.tsx file
- Run `pnpm seed` or `pnpm seed coaches` to seed the coaches

## Programs

- Add/Update/Delete Programs in the list in the seeders/programs.tsx file
- Run `pnpm seed` or `pnpm seed programs` to seed the programs


