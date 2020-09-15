import React, { useState } from "react"

import "../styles/Payment.css"

import CheckoutForm from "../components/CheckoutForm"
import { Elements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY)

function Payment() {
  const [secret, setSecret] = useState()

  return (
    <div className="payment-intent">
      {secret && (
        <div className="payment">
          <h1 className="primary">Payment</h1>
          <hr className="primary" />
          <Elements stripe={stripePromise}>
            <CheckoutForm secret={secret} />
          </Elements>
        </div>
      )}
    </div>
  )
}

export default Payment
