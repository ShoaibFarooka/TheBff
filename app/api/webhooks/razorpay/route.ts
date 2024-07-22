
// import type {  } from 'razorpay'
import Razorpay, { validateWebhookSignature } from 'razorpay';

// razorpay webhook
const relevantEvents = new Set([
    'subscription.charged',
    'subscription.activated',
    'subscription.charged',
    'subscription.pending',
    'subscription.halted',
    'subscription.cancelled',
    // 'subscription.paused',
    // 'subscription.resumed',
])

export async function POST(req: Request) {
    try {

        const body = await req.json()
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET

        const isValid = validateWebhookSignature(JSON.stringify(body), req.headers.get('X-Razorpay-Signature') || '', secret || '')

        // console woth a right tick mark
        console.log(`✅ Webhook signature is valid: ${isValid}`)

        if (!isValid) {
            console.error('❌ Invalid webhook signature.');
            return new Response('Invalid signature', { status: 400 })
        }

        if (!relevantEvents.has(body.event)) {
            console.log(`🔔❌ Irrelevant event: ${body.event}`)
            return new Response('Irrelevant event', { status: 200 })
        }

        console.log(`🔔 Webhook received: ${body.event}`)

        // handle the event
        switch (body.event) {
            case 'subscription.charged':
                // handle subscription charged event
                break;
            case 'subscription.activated':
                // handle subscription activated event
                break;
            case 'subscription.pending':
                // handle subscription pending event
                break;
            case 'subscription.halted':
                // handle subscription halted event
                break;
            default:
                console.log(`🔔❌ Unhandled event: ${body.event}`)
                return new Response('Unhandled event', { status: 200 })
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err: any) {
        console.error(`❌ Webhook Error:`, err);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
}

export const GET = async () => {
    // create a new plan
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || '',
        key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    })

    const res = await razorpay.plans.create({ ...plan })

    return new Response(JSON.stringify(res), { status: 200 })
}