import React, { useState, useEffect } from "react"
import "../styles/Home.css"

import axios from "axios"
import Cart from "../icons/cart"
import flower from "../images/flower-art.jpg"

function Home() {
  return (
    <div className="home">
      <div className="cover">
        <div className="title">
          <h1>WELCOME</h1>
        </div>
        <div className="text">
          <p>WHERE CREATIVITY COMES TO LIFE</p>
        </div>
      </div>
      <div className="icons"></div>
      <div className="faq"></div>
    </div>
  )
}

export default Home
