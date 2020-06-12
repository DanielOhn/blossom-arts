import React from "react"

const Product = ({ match, data }) => {
  const product = data.find((p) => p.id === Number(match.params.name))
  let productData

  if (product)
    productData = (
      <div>
        <h3> hello </h3>
      </div>
    )
  else productData = <h2> Sorry. Product doesn't exist </h2>

  return (
    <div>
      <div>{productData}</div>
    </div>
  )
}

export default Product

{
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
}

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
