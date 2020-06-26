const express = require("express")
const app = express()
const port = 3001

const stripe = require("stripe")(process.env.SK_TEST_KEY)

app.get("/", (req, res) => res.send("Hello World!"))

app.get("/products", (req, res) => {
  stripe.products.list({ active: true }).then((lst) => res.send(lst))
})

app.get("/products/:id", (req, res) => {
  stripe.products.retrieve(req.params.id, (err, product) => {
    let final_product = []
    final_product.push(product)

    stripe.prices.retrieve(product.metadata.price, (e, price) => {
      final_product.push(price)

      res.json(final_product)
    })
  })
})

// app.get("/checkout", async (req, res) => {
//   const intent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: "usd",
//     // Verify your integration in this guide by including this parameter
//     metadata: { integration_check: "accept_a_payment" },
//   })

//   console.log(intent)
//   res.render("checkout", { client_secret: intent.client_secret })
// })

const calculateOrderAmount = (items) => {
  return 1400
}

app.get("/create-payment-intent", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "usd",
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
