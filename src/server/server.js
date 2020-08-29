const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
const port = 3001

const stripe = require("stripe")(process.env.SK_TEST_KEY)
const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({ origin: "http://localhost:3000" }))

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

app.post("/contact", (req, res) => {
  const msg = {
    to: "ba_testing@zohomail.com",
    from: "ba_testing@zohomail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "Wow, we managed to send an email.",
  }

  sgMail
    .send(msg)
    .then(() => {
      res.redirect("/")
    })
    .catch((err) => {
      console.log(err.response.body)
    })
})

app.post("/create-payment-intent", async (req, res) => {
  let prices = req.body

  const getPrices = await getTotal(prices)

  let total = getPrices.reduce((accum, value) => {
    const findQt = prices.find((val, index) => {
      return val.priceID === value.id
    })
    return accum + value.unit_amount * findQt.qt
  }, 0)

  const paymentIntent = await stripe.paymentIntents
    .create({
      amount: total,
      currency: "usd",
      receipt_email: "ohndaniel@gmail.com",
    })
    .catch((err) => {
      console.log(err)
    })

  res.send({
    clientSecret: paymentIntent.client_secret,
    prices: getPrices,
    total: total,
  })
})

async function getTotal(prices) {
  const getPrices = Object.keys(prices)

  return Promise.all(
    getPrices.map((i) => {
      let item = prices[i]
      return stripe.prices.retrieve(item.priceID)
    })
  ).then((data) => data)
}

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
