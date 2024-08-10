# TheBFF

<!--


 -->

## Environment Variables

```
MONGO_URI - MongoDB URI
REVALIDATE_TOKEN - Revalidate Token (Used fir revalidating the data in the cache)

HYGRAPH_ENDPOINT - Hygraph Endpoint (Used for fetching the data from Hygraph)

RAZORPAY_WEBHOOK_SECRET - Razorpay Webhook Secret
RAZORPAY_KEY_ID - Razorpay Key ID
RAZORPAY_KEY_SECRET - Razorpay Key Secret

EMAIL_USER - Email User
EMAIL_PASS - Email Password
```

<br />

## Data Management

### Plans

- Add/Update/Delete Plans in the list in the seeders/data/plans.json file
- Run `pnpm seed:plans` to seed the plans

### Classes

- Add/Update/Delete Classes in the list in the seeders/classes.tsx file
- Each class should have a list of programIds which are the ids of the <a href="#programs">programs</a> that the class is associated with.
- Run `pnpm seed` or `pnpm seed classes` to seed the classes

### Coaches

<blockquote>
Register on calendly.com and create a new event for each coach. Copy the link of the event and genrate an access token from the link below:<br />
<a href="https://calendly.com/integrations/api_webhooks">https://calendly.com/integrations/api_webhooks</a>
</blockquote>
<br />

- Add/Update/Delete Coaches in the list in the seeders/coaches.tsx file
- Run `pnpm seed` or `pnpm seed coaches` to seed the coaches

### Programs

- Add/Update/Delete Programs in the list in the seeders/programs.tsx file
- Run `pnpm seed` or `pnpm seed programs` to seed the programs
