const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = 3001

const stripe = require("stripe")(process.env.SK_TEST_KEY)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

const getPrices = (items) => {
  let finalPrices = []

  Object.keys(items).map((i) => {
    let item = items[i]

    stripe.prices.retrieve(item.price, (e, price) => {
      // console.log(price.unit_amount, item.qt)
      if (price) {
        finalPrices.push(price.unit_amount)
      } else {
        return finalPrices
      }
    })
  })

  return finalPrices
}

app.post("/create-payment-intent", async (req, res) => {
  // console.log(req.body)
  let prices = getPrices(req.body)
  let total = 50

  console.log(prices)

  for (let i = 0; i < prices.length; i++) {
    total += prices[i] * req.body[i].qt
  }

  console.log(total)

  const paymentIntent = await stripe.paymentIntents
    .create({
      amount: total,
      currency: "usd",
    })
    .catch((err) => {
      console.log(err)
    })

  res.send({
    clientSecret: paymentIntent.client_secret,
    prices: prices,
  })
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
