import React, { useState, useEffect } from "react"
import axios from "axios"

import "../styles/Fonts.css"

// Idea
// 1 - Get Products from Stripe
// 2 - Include Metadata for Slugs
// 3 - Compare name from frontend to backend to retreive Product

const Product = ({ match }) => {
  const [product, setProduct] = useState()

  useEffect(() => {
    axios.get(`/products/${match.params.id}`).then((res) => {
      console.log(res.data)

      setProduct(res.data)
    })
  }, [])

  return (
    <div>
      {product && (
        <>
          <h1 className="secondary">{product.name}</h1>
          <p className="primary">{product.description}</p>
        </>
      )}
    </div>
  )
}

export default Product

/* <StripeCheckout
<StripeCheckout
  stripeKey={process.env.REACT_APP_PUBLISH_KEY}
  token={handleToken}
  name={prod.attributes.name}
  billingAddress
  shippingAddress
  amount={prod.price}
>
  <button onClick={() => handleClick(prod)} className="button">
    buy this! c:
  </button>
</StripeCheckout>; */

// function handleClick(prod) {
//   console.log(prod)
//   setProduct(prod)
// }

// async function handleToken(token) {
//   console.log(token)

//   const response = await axios.post("/checkout", {
//     token,
//     product,
//   })
//   const { status } = response.data

//   if (status === "success") alert("Success!  Check email for details.")
//   else
//     alert(
//       "An issue has occurred!  Please try again later or contact support."
//     )
// }
