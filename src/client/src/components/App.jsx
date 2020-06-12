import React from "react"
import "../styles/App.css"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import axios from "axios"

import Flower from "../icons/flower"
import black_logo from "../icons/logos/ba_logo_black.png"

import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Product from "../components/Product"
import Products from "../pages/Products"

function App({ match }) {
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
    <div className="App">
      <Router>
        <div className="logo">
          <img src={black_logo} />
          <Flower />
        </div>
        <div className="navbar">
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route path="/about" exact render={() => <About />} />
            <Route path="/contact" exact render={() => <Contact />} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/:name" exact render={() => <Product />} />
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
