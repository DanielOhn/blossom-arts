import React, { useState, useEffect } from "react"
import { Link, Route } from "react-router-dom"

import axios from "axios"

import Product from "../components/Product"

const Products = ({ match }) => {
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

  return (
    <div>
      <ul>
        {products &&
          Object.keys(products).map((i) => {
            let product = products[i]
            let name = product.attributes.name
            let price = product.price / 100

            return (
              <li>
                <Link
                  to={{
                    pathname: `/${match.url}/${slugify(name)}`,
                  }}
                >
                  {name}
                </Link>
              </li>
            )
          })}
      </ul>
      <Route
        path={`${match.path}/:name`}
        render={(props) => <Product data={products} {...props} />}
      />
      <Route
        exact
        path={match.url}
        render={() => <div>Select a product...</div>}
      />
    </div>
  )
}

export default Products
