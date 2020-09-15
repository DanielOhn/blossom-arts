import React, { useState } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"

import "../styles/CheckoutForm.css"

const BillingDetailsFields = () => {
  return (
    <div className="FormGroup">
      <input
        className="name"
        name="name"
        label="Name"
        type="text"
        placeholder="Full Name"
        required
      />
      <input
        className="email"
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        className="address"
        name="address"
        label="Address"
        type="text"
        placeholder="Adderss"
        required
      />
      <input
        className="city"
        name="city"
        label="City"
        type="text"
        placeholder="City"
        required
      />
      <input
        className="state"
        name="state"
        label="State"
        type="text"
        placeholder="State"
        required
      />
    </div>
  )
}

const cardStyle = {
  style: {
    base: {
      display: "flex",
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

function CheckoutForm({ secret }) {
  const [success, setSuccess] = useState("")
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState("")
  const [disabled, setDisabled] = useState(true)

  const stripe = useStripe()
  const elements = useElements()

  const handleChange = async (event) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)

    if (!stripe || !elements) {
      return
    }

    const result = await stripe.confirmCardPayment(secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: event.target.name.value,
        },
      },
    })

    if (result.error) {
      setProcessing(false)
      console.log(result)
      alert("error! " + result)
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setError(null)
        setProcessing(false)
        setSuccess(true)
        alert("success!")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <BillingDetailsFields />
      <CardElement options={cardStyle} onChange={handleChange} />
      <button
        className="btn primary heavy"
        disabled={processing || disabled || success}
      >
        Order
      </button>
    </form>
  )
}

export default CheckoutForm
