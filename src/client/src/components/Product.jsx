import React, { useState, useEffect } from "react"
import axios from "axios"

import "../styles/Fonts.css"
import "../styles/Product.css"

// Don't call loadstripe
// Don't want to load more than u have too

const Product = ({ match }) => {
  const [product, setProduct] = useState()
  const [price, setPrice] = useState()
  const [qt, setqt] = useState(1)

  useEffect(() => {
    axios.get(`/products/${match.params.id}`).then((results) => {
      setProduct(results.data[0])
      setPrice(results.data[1])
    })
  }, [])

  // To get the price for products, you need to add it to metadata on Stripe API.
  const addProduct = () => {
    let prod = {
      productID: product.id,
      productName: product.name,
      productImage: product.images[0],
      priceID: price.id,
      qt: qt,
    }

    let cart = []

    if (localStorage.getItem("cart"))
      cart = JSON.parse(localStorage.getItem("cart"))

    if (!updateProduct(cart, prod)) {
      cart.push(prod)
    }

    localStorage.setItem("cart", JSON.stringify(cart))
  }

  const updateProduct = (cart, prod) => {
    let bool = false

    cart.map((item, i) => {
      if (item.productID === prod.productID) {
        item.qt = qt
        bool = true
      }
    })

    return bool
  }

  const subQt = () => {
    let update = qt - 1

    if (update <= 0) {
      update = 1
      alert("Can't go below 1.")
    }

    setqt(update)
  }

  const addQt = () => {
    let update = qt + 1

    setqt(update)
  }

  return (
    <div className="product">
      {product && price && (
        <>
          <img alt={product.name} src={product.images[0]} />
          <div className="details">
            <div className="details-header">
              <h1 className="secondary">{product.name}</h1>
              <hr />
              <p className="primary">{product.description}</p>
            </div>
            <div className="product-price">
              <p className="light">${(price.unit_amount / 100).toFixed(2)}</p>
              <p className="primary">Qt. {qt}</p>
              <button className="heavy" onClick={addQt}>
                +
              </button>
              <button className="heavy" onClick={subQt}>
                -
              </button>
              <button className="heavy" onClick={addProduct}>
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Product
