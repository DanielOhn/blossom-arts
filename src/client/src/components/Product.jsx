import React, { useState, useEffect } from "react"
import axios from "axios"

import "../styles/Fonts.css"
import CheckoutForm from "./CheckoutForm"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY)

// Don't call loadstripe
// Don't want to load more than u have too

const Product = ({ match }) => {
  const [product, setProduct] = useState()
  const [price, setPrice] = useState()
  const [secret, setSecret] = useState()

  useEffect(() => {
    function getProduct() {
      return axios.get(`/products/${match.params.id}`)
    }

    function getPaymentIntent() {
      return axios.get(`/create-payment-intent`)
    }

    Promise.all([getProduct(), getPaymentIntent()]).then((results) => {
      setProduct(results[0].data[0])
      setPrice(results[0].data[1])
      setSecret(results[1].data.clientSecret)
    })
  }, [])

  // async function handleToken(token) {
  //   console.log(token)

  //   const response = await axios.post("/checkout", {
  //     token,
  //     product,
  //     price,
  //   })
  //   const { status } = response.data

  //   if (status === "success") alert("Success! Check email for details.")
  //   else
  //     alert("An issue has occurred! Please try again later or contact support.")
  // }

  return (
    <div>
      {product && price && (
        <>
          <h1 className="secondary">{product.name}</h1>
          <p className="primary">{product.description}</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm secret={secret} />
          </Elements>
        </>
      )}
    </div>
  )
}

export default Product
