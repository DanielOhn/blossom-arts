import React, { useState, useEffect } from "react"
import "../styles/Checkout.css"

import CheckoutForm from "../components/CheckoutForm"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import ClearCart from "../icons/clearCart"
import RemoveItem from "../icons/removeItem"
import Plus from "../icons/plus"
import Minus from "../icons/minus"

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY)

function Checkout() {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? localStorage.getItem("cart") : null
  )
  const [secret, setSecret] = useState()
  const [prices, setPrices] = useState()
  const [total, setTotal] = useState()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: cart,
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setSecret(data.clientSecret)
        setPrices(data.prices)
        setTotal(data.total)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [cart])

  const clearCart = () => {
    localStorage.removeItem("cart")
    window.location.reload(false)
  }

  const removeItem = (name) => {
    Object.keys(JSON.parse(cart)).map((i) => {
      let copy = JSON.parse(cart)
      let result = copy.filter((prod) => prod.productName !== name)

      result.length !== 0
        ? localStorage.setItem("cart", JSON.stringify(result))
        : localStorage.removeItem("cart")

      window.location.reload(true)
    })
  }

  const addQt = (name) => {
    let result = []

    JSON.parse(cart).forEach((prod) => {
      if (prod.productName === name) {
        prod.qt++
      }

      result.push(prod)
    })

    setCart(JSON.stringify(result))
  }

  const subQt = (name) => {
    let result = []

    JSON.parse(cart).forEach((prod) => {
      if (prod.productName === name) {
        if (prod.qt === 1) {
          alert("Can't go below 1")
        } else {
          prod.qt--
        }
      }

      result.push(prod)
    })

    setCart(JSON.stringify(result))
  }

  const cartListing = Object.keys(cart ? JSON.parse(cart) : {}).map((i) => {
    let cartCopy

    cart ? (cartCopy = JSON.parse(cart)) : (cartCopy = {})

    let product = cartCopy[i].productName
    let img = cartCopy[i].productImage
    let qt = cartCopy[i].qt

    let price = 0

    if (prices) price = prices[i].unit_amount / 100

    return (
      <tbody key={i}>
        <tr>
          <td>
            <img alt={product} src={img}></img>
          </td>
          <td>{product}</td>
          <td>${price.toFixed(2)}</td>
          <td>
            <Minus onClick={() => subQt(product)} />
            <span>{qt}</span>
            <Plus onClick={() => addQt(product)} />
          </td>
          <td>${(qt * price).toFixed(2)}</td>
          <td>
            <RemoveItem onClick={() => removeItem(product)} />
          </td>
        </tr>
      </tbody>
    )
  })

  return (
    <div className="checkout">
      <div className="checkout-details">
        <h1 className="primary">Checkout</h1>
        <hr className="primary" />
        {cart && prices && (
          <>
            <table className="cart">
              <tbody>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qt.</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </tbody>
              {cartListing}
              {total && (
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>${(total / 100).toFixed(2)}</td>
                    <td>
                      <ClearCart onClick={clearCart} />
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </>
        )}
        {!cart && <p>No items in cart, feel free to browse our products!</p>}
      </div>
      {secret && (
        <div className="payment">
          <h1 className="primary">Payment</h1>
          <hr className="primary" />
          <Elements stripe={stripePromise}>
            <CheckoutForm secret={secret} />
          </Elements>
        </div>
      )}
    </div>
  )
}

export default Checkout
