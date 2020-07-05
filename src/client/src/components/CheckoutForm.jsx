import React, { useState, useEffect } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
// import { loadStripe } from "@stripe/stripe-js"

import "../styles/CheckoutForm.css"

const BillingDetailsFields = () => {
  return (
    <div className="FormGroup">
      <input
        name="name"
        label="Name"
        type="text"
        placeholder="Jane Doe"
        required
      />
      <input
        name="email"
        label="Email"
        type="email"
        placeholder="jane.doe@example.com"
        required
      />
      <input
        name="address"
        label="Address"
        type="text"
        placeholder="185 Berry St. Suite 550"
        required
      />
      <input
        name="city"
        label="City"
        type="text"
        placeholder="San Francisco"
        required
      />
      <input
        name="state"
        label="State"
        type="text"
        placeholder="California"
        required
      />
      <input name="zip" label="ZIP" type="text" placeholder="94103" required />
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

  useEffect(() => {}, [])

  const handleChange = async (event) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  useEffect(() => {}, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)

    if (!stripe || !elements) {
      return
    }

    // const billingDetails = {
    //   name: event.target.name.value,
    //   email: event.target.email.value,
    //   address: {
    //     city: event.target.city.value,
    //     line1: event.target.address.value,
    //     state: event.target.state.value,
    //     postal_code: event.target.zip.value,
    //   },
    // }

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
      <button disabled={processing || disabled || success}>Order</button>
    </form>
  )
}

export default CheckoutForm
