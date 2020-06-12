import React, { useState, useEffect } from "react"
import { Link, Route } from "react-router-dom"

import axios from "axios"

import Product from "../components/Product"
import Slugify from "../components/Slugify"

const Products = ({ match }) => {
  const [products, setProducts] = useState({})

  useEffect(() => {
    axios.get("/products").then((res) => {
      setProducts(res.data.data)
    })
  }, [])

  const listProducts = Object.keys(products).map((i) => {
    let product = products[i]
    let name = product.attributes.name

    return (
      <li key={product.id}>
        <Link to={`${match.url}/${Slugify(name)}`}>{name}</Link>
      </li>
    )
  })

  return (
    <div>
      <Route path={`${match.url}/:name`} render={() => <Product />} />

      <ul>{products && listProducts}</ul>
    </div>
  )
}

export default Products
