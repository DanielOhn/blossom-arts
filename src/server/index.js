import Stripe from 'stripe';

const stripe = new Stripe(process.env.SK_TEST_KEY);

(async () => {
  const customer = await stripe.customers.create({
    email: 'customer@example.com',
  });

  console.log(customer.id);
})();