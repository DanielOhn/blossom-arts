import React, { useState, useEffect } from "react"
import axios from "axios"

import StripeCheckout from "react-stripe-checkout"

import "../styles/Fonts.css"

// Idea
// 1 - Get Products from Stripe
// 2 - Include Metadata for Slugs
// 3 - Compare name from frontend to backend to retreive Product

const Product = ({ match }) => {
  const [product, setProduct] = useState()
  const [price, setPrice] = useState()

  useEffect(() => {
    axios.get(`/products/${match.params.id}`).then((res) => {
      // console.log(res.data[1])

      setProduct(res.data[0])
      setPrice(res.data[1])
    })
  }, [])

  async function handleToken(token) {
    console.log(token)

    const response = await axios.post("/checkout", {
      token,
      product,
      price,
    })
    const { status } = response.data

    if (status === "success") alert("Success! Check email for details.")
    else
      alert("An issue has occurred! Please try again later or contact support.")
  }

  return (
    <div>
      {product && price && (
        <>
          <h1 className="secondary">{product.name}</h1>
          <p className="primary">{product.description}</p>
          <StripeCheckout
            stripeKey={process.env.REACT_APP_PUBLISH_KEY}
            token={handleToken}
            name={product.name}
            billingAddress
            shippingAddress
            amount={price.unit_amount}
          >
            <button>buy this! c:</button>
          </StripeCheckout>
        </>
      )}
    </div>
  )
}

export default Product
