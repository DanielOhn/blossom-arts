import React, { useState, useEffect } from "react"
import "../styles/App.css"

import axios from "axios"

function App() {
  const [products, setProducts] = useState()

  useEffect(() => {
    axios.get("/products").then((res) => {
      setProducts(res.data.data)
      console.log(res.data.data)
    })
  }, [])

  return (
    <div className="App">
      <h1>Title of Page!</h1>
      <p>Nav Bar Goes here</p>
      <div>
        <h3>Products</h3>
        {products &&
          Object.keys(products).map((i) => {
           let product = products[i]

           return <p key={product.id}>{product.name}</p>
          })}
      </div>
    </div>
  )
}

export default App

//TODO
// List Products
// Create Product
// Edit Product
// Delete Product
// View Product

// CRUD for Customers
