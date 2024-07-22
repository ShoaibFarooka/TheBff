// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { authenticate } from '@/lib/auth';
import { getURL } from '@/lib/helpers';
import { createOrRetrieveCustomer } from '@/lib/stripe';
import { stripe } from '@/lib/stripeClient';
import { Error } from 'mongoose';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const auth = await authenticate()

      const user = auth.user;
      // const supabase = createRouteHandlerClient<Database>({ cookies });
      // const {
      //   data: { user }
      // } = await supabase.auth.getUser();

      if (!user) throw new Error('Could not get user');
      const customer = await createOrRetrieveCustomer({
        // id: user._id || '',
        email: user.email || '',
        phone: user.phone || ''
      });

      if (!customer) throw new Error('Could not get customer');
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${getURL()}/dashboard`
      });

      return new Response(JSON.stringify({ url }), {
        status: 200
      });
    } catch (err: any) {
      console.log(err);
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
