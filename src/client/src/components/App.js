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
      <div className="header">
        <h1>Blossom Arts</h1>
        <h2>A & Y</h2>
        <ul className='nav'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
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
