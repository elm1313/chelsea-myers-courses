import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'npm:stripe@14.14.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
  'Content-Type': 'application/json',
};

const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeKey) {
  throw new Error('Required environment variable STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
  typescript: true,
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error(`Method ${req.method} not allowed`);
    }

    const { courseId } = await req.json();
    if (!courseId) {
      throw new Error('Missing courseId in request body');
    }

    let amount;
    switch (courseId) {
      case 'bundle':
        amount = 55000; // $550.00
        break;
      case 'quantum':
        amount = 39900; // $399.00
        break;
      case 'communication':
        amount = 19900; // $199.00
        break;
      case 'dental':
        amount = 160000; // $1,600.00
        break;
      default:
        throw new Error(`Invalid course ID: ${courseId}`);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        courseId,
      },
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error('Request processing error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 400,
        headers: corsHeaders,
      }
    );
  }
});