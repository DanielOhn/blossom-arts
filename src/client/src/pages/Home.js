import React, { useState, useEffect } from "react"
import "../styles/Home.css"

import axios from "axios"
import Cart from "../icons/cart"
import Header from "../components/Header"
import Product from "../components/Product"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

// import StripeCheckout from "react-stripe-checkout"

function Home() {
  const [products, setProducts] = useState()

  useEffect(() => {
    axios.get("/products").then((res) => {
      setProducts(res.data.data)
    })
  }, [])

  function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, "")
    str = str.toLowerCase()

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-") // collapse dashes

    return str
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

  return (
    <div className="home">
      <Header
        title="Products"
        subtitle="Enjoy Our"
        bg="https://placekitten.com/1000/1000"
      />

      <div className="sku-cards">
        {products &&
          Object.keys(products).map((i) => {
            let product = products[i]
            let name = product.attributes.name
            let price = product.price / 100

            return (
              <div className="sku-card" key={product.id}>
                <Link to={`/product/${slugify(name)}`}>
                  <img alt={name} src={product.image} />
                </Link>
                <div className="overlay">
                  <p className="name">{name}</p>
                  <div className="sku-info">
                    <small>${price}</small>
                    <Cart />
                  </div>
                </div>
              </div>
            )
          })}
        {!products && <p>No products at this time :(</p>}
      </div>
    </div>
  )
}

export default Home
