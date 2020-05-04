const stripe = require("stripe")(process.env.SK_TEST_KEY);

// Create Customers
stripe.customers
  .create({
    email: "customer@example.com",
  })
  .then((customer) => console.log('customer id: ' + customer.id))
  .catch((err) => console.error(err));


// // Create
// stripe.products.create(
//   {
//     name: 'shirt',
//     type: 'good',
//     description: 'comfy shirt',
//     attributes: ['size', 'gender'],
//   }).catch( err => console.log(err));



// List
stripe.products.list(
).then( lst => console.log(lst));


// // Delete
// stripe.products.del(
//   'prod_HDTkuwDpTVnaSf'
// )