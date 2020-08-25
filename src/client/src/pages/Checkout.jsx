import React, { useState, useEffect } from "react"
import "../styles/Checkout.css"

import CheckoutForm from "../components/CheckoutForm"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY)

function Checkout() {
  const [cart] = useState(
    localStorage.getItem("cart") ? localStorage.getItem("cart") : {}
  )
  const [secret, setSecret] = useState()
  const [prices, setPrices] = useState()
  const [total, setTotal] = useState()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: cart,
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setSecret(data.clientSecret)
        setPrices(data.prices)
        setTotal(data.total)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [cart])

  const cartListing = Object.keys(JSON.parse(cart)).map((i) => {
    let cartCopy = JSON.parse(cart)

    let product = cartCopy[i].productName
    let img = cartCopy[i].productImage
    let qt = cartCopy[i].qt

    let price = 0

    if (prices) price = prices[i].unit_amount / 100

    return (
      <tbody key={i}>
        <tr>
          <td>
            <img alt={product} src={img}></img>
          </td>
          <td>{product}</td>
          <td>${price.toFixed(2)}</td>
          <td>{qt}</td>
          <td>${(qt * price).toFixed(2)}</td>
        </tr>
      </tbody>
    )
  })

  return (
    <div className="checkout">
      <div className="checkout-details">
        <h1 className="primary">Checkout</h1>
        <hr className="primary" />

        {cart && prices && (
          <table className="cart">
            <tbody>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Qt.</th>
                <th>Total</th>
              </tr>
            </tbody>
            {cartListing}
            {total && (
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>${(total / 100).toFixed(2)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        )}
      </div>

      <div className="payment">
        <h1 className="primary">Payment</h1>
        <hr className="primary" />
        <Elements stripe={stripePromise}>
          <CheckoutForm secret={secret} />
        </Elements>
      </div>
    </div>
  )
}

export default Checkout
