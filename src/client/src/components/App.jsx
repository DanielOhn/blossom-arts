import React from "react"
import "../styles/App.css"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import logo from "../images/ba-logo.png"

import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Product from "../components/Product"
import Products from "../pages/Products"
import Checkout from "../pages/Checkout"
import Payment from "../pages/Payment"

function App() {
  return (
    <div className="App">
      <Router>
        <div className="logo">
          <img alt="Background cover" className="logo-image" src={logo} />
        </div>
        <div className="navbar">
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/checkout" exact render={() => <Checkout />} />
            <Route path="/contact" exact render={() => <Contact />} />
            <Route path="/products" exact component={Products} />
            <Route
              path="/products/:id"
              exact
              render={(props) => <Product {...props} />}
            />
            <Route path="/payment" exact component={Payment} />
            <Route path="/404" exact render={() => <p>Page not found.</p>} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App

/* <Route
  path="/product/:name"
  extact
  render={(props) => <Product data={product} {...props} />}
/> */
