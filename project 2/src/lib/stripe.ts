import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing Stripe publishable key');
}

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export type StripeElementsOptions = {
  clientSecret: string;
  appearance: {
    theme: 'night';
    variables: {
      colorPrimary: string;
      colorBackground: string;
      colorText: string;
      colorDanger: string;
      fontFamily: string;
      borderRadius: string;
      spacingUnit: string;
    };
    rules: {
      '.Input': {
        backgroundColor: string;
        border: string;
      };
      '.Input:focus': {
        border: string;
        boxShadow: string;
      };
      '.Label': {
        color: string;
      };
      '.Error': {
        color: string;
        backgroundColor: string;
        borderColor: string;
      };
    };
  };
};