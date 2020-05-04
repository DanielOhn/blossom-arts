const stripe = require("stripe")(process.env.SK_TEST_KEY);

stripe.customers
  .create({
    email: "customer@example.com",
  })
  .then((customer) => console.log('customer id: ' + customer.id))
  .catch((err) => console.error(err));
