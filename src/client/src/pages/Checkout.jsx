import React, { useState, useEffect } from "react"
import axios from "axios"

import "../styles/Checkout.css"

import CheckoutForm from "../components/CheckoutForm"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY)

function Checkout() {
  const [cart, setCart] = useState(localStorage.getItem("cart"))
  const [secret, setSecret] = useState()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (!cart) setCart(localStorage.getItem("cart"))

    var purchase = {
      items: [{ id: "xl-tshirt" }],
    }

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
      })
  }, [])

  return (
    <div className="checkout">
      {cart && (
        <div className="cart">
          <p>Cart goes here...</p>
        </div>
      )}

      <div className="payment">
        <Elements stripe={stripePromise}>
          <CheckoutForm secret={secret} />
        </Elements>
      </div>
    </div>
  )
}

export default Checkout
