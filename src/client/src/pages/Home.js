import React, { useState, useEffect } from "react"
import "../styles/Home.css"

import axios from "axios"

function Home() {
  const [products, setProdcuts] = useState()

  useEffect(() => {
    axios.get("/products").then((res) => {
      setProdcuts(res.data.data)
    })
  })
  return (
    <div className="home">
      <h3>Products</h3>
      <div className="sku-cards">
        {products &&
          Object.keys(products).map((i) => {
            let product = products[i]
            let price = product.price / 100

            return (
              <div className="sku-card">
                <img alt={product.attributes.name} src={product.image} />

                <div className="overlay">
                  <p className="name" key={product.id}>
                    {product.attributes.name}
                  </p>
                  <div className="sku-info">
                    <small>${price}</small>
                    <button></button>
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
