import React from "react"
import "../styles/App.css"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"

function App() {
  return (
    <div className="App">
      <Router>
        <div className="header">
          <h1>Blossom Arts</h1>
          <h2>A & Y</h2>
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact"> Contact</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/about" extact render={() => <About />} />
            <Route path="/contact" extact render={() => <Contact />} />
            {/* <Route path="/product/:slug" extact render={() => <Product />} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App

//TODO
// List Products DONE 
// Create Product
// Edit Product
// Delete Product
// View Product DO THIS 

// CRUD for Customers
