import React from "react"

import axios from "axios"

const Product = ({ match }) => {
  return (
    <div>
      <p>Hello</p>
    </div>
  )
}

export default Product

/* <StripeCheckout
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
