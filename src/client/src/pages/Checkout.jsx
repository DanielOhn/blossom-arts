import React, { useState, useEffect } from "react"
import "../styles/Checkout.css"

import CheckoutForm from "../components/CheckoutForm"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY)

function Checkout() {
  const [cart, setCart] = useState(localStorage.getItem("cart"))
  const [secret, setSecret] = useState()
  const [prices, setPrices] = useState()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (!cart) setCart(localStorage.getItem("cart"))

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
      })
      .catch((err) => {
        console.log(err)
      })
  }, [cart])

  const cartListing = Object.keys(JSON.parse(cart)).map((i) => {
    let cartCopy = JSON.parse(cart)

    console.log(prices)

    let product = cartCopy[i].productName
    let img = cartCopy[i].productImage
    let qt = cartCopy[i].qt

    return (
      <tr>
        <td>
          <img src={img}></img>
        </td>
        <td>{product}</td>
        <td>1.00</td>
        <td>{qt}</td>
        <td>{(qt * 1.0).toFixed(2)}</td>
      </tr>
    )
  })

  return (
    <div className="checkout">
      <div className="checkout-details">
        <h1 className="primary">Checkout</h1>
        <hr className="primary" />

        {cart && (
          <table className="cart">
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Qt.</th>
              <th>Total</th>
            </tr>
            {cartListing}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>$3.00</td>
            </tr>
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
