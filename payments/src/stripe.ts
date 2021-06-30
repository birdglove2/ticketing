import Stripe from 'stripe';

// export const stripe = new Stripe(process.env.STRIPE_KEY!, {
//   apiVersion: '2020-08-27',
// });

export const stripe = new Stripe(
  'sk_test_51IAFExLdCs2WfPMHNjAKIVQnJjanrkqiIAPPdJ0OhAyv3H2rPI0fobtkCFtTXhgtr1F2ymRs3t9YiY7sQ4YgXgb000W18eVz9N',
  {
    apiVersion: '2020-08-27',
  }
);
