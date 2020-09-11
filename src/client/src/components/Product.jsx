import React, { useState, useEffect } from "react"
import axios from "axios"

import "../styles/Fonts.css"
import "../styles/Product.css"

import Plus from "../icons/plus"
import Minus from "../icons/minus"

// Don't call loadstripe
// Don't want to load more than u have too

const Product = ({ match }) => {
  const [product, setProduct] = useState()
  const [skus, setSkus] = useState()
  const [qt, setqt] = useState(1)

  useEffect(() => {
    axios.get(`/products/${match.params.id}`).then((results) => {
      console.log(results.data)

      setSkus(results.data)
      setProduct(results.data[0])
    })
  }, [])

  const addProduct = () => {
    let prod = {
      productID: product.id,
      productName: product.attributes.name,
      price: product.price,
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

  const changeProduct = (num) => {
    setProduct(skus[num])
  }

  const addQt = () => {
    let update = qt + 1

    setqt(update)
  }

  const subQt = () => {
    let update = qt - 1

    if (update <= 0) {
      update = 1
      alert("Can't go below 1.")
    }

    setqt(update)
  }

  return (
    <div className="product">
      {product && (
        <>
          <img alt={product.name} src={product.image} />
          <div className="details">
            <div className="details-header">
              <h1 className="secondary">{product.attributes.name}</h1>
              <hr />
              <button className="light" onClick={() => changeProduct(0)}>
                Purple
              </button>
              <button className="light" onClick={() => changeProduct(1)}>
                White
              </button>
              <button className="light" onClick={() => changeProduct(2)}>
                Blue
              </button>
            </div>
            <div className="product-price">
              <p className="light">${(product.price / 100).toFixed(2)}</p>

              <Minus onClick={subQt} />
              <p className="primary">Qt. {qt}</p>
              <Plus onClick={addQt} />

              <button className="heavy add-cart" onClick={addProduct}>
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
