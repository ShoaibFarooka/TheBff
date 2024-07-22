// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    // 1. Destructure the price and quantity from the POST body
    const { price, quantity = 1, metadata = {} } = await req.json();

    try {
      const session = await createCheckoutSession({
        price,
        quantity,
        metadata
      });
      return new Response(JSON.stringify(session), {
        status: 200
      });
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } }),
        {
          status: 500
        }
      );
    }

  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    });
  }
}
