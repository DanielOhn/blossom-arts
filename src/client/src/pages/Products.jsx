import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import axios from "axios"

import "../styles/Fonts.css"
import "../styles/Products.css"

const Products = ({ match }) => {
  const [products, setProducts] = useState({})

  useEffect(() => {
    axios.get("/products").then((res) => {
      setProducts(res.data.data)
    })
  }, [])

  const listProducts = Object.keys(products).map((i) => {
    let product = products[i]
    let name = product.name

    return (
      <div className="product-card" key={product.id}>
        <div className="product-header">
          <img alt={name} src={product.images[0]} />
          <div className="product-detail">
            <h2 className="name">
              <Link to={`${match.url}/${product.id}`}>{name}</Link>
            </h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="products">
      <h1 className="primary">Products</h1>
      <hr className="primary" />
      {products && listProducts}
    </div>
  )
}

export default Products
