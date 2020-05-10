import React, { useState, useEffect } from "react"

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
      {products &&
        Object.keys(products).map((i) => {
          let product = products[i]

          return <p key={product.id}>{product.name}</p>
        })}
      {!products &&
        <p>
          No products at this time :(
        </p>
      }
    </div>
  )
}

export default Home
