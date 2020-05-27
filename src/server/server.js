// // Create Customers
// stripe.customers
//   .create({
//     email: "customer@example.com",
//   })
//   .then((customer) => console.log("customer id: " + customer.id))
//   .catch((err) => console.error(err))

// // // Create
// // stripe.products.create(
// //   {
// //     name: 'shirt',
// //     type: 'good',
// //     description: 'comfy shirt',
// //     attributes: ['size', 'gender'],
// //   }).catch( err => console.log(err));

// // // Delete
// // stripe.products.del(
// //   'prod_HDTkuwDpTVnaSf'
// // )

const express = require("express")
const app = express()
const port = 3001

const stripe = require("stripe")(process.env.SK_TEST_KEY)

// List
// const products = stripe.products.list().then((lst) => console.log(lst))

app.get("/", (req, res) => res.send("Hello World!"))

app.get("/products", (req, res) => {
  stripe.skus.list().then((lst) => res.send(lst))
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
