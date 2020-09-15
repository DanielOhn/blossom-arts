import React from "react"
import "../styles/Home.css"

import Heart from "../icons/heart"
import Puzzle from "../icons/puzzle"
import Pencil from "../icons/pencil"

function Home() {
  return (
    <div className="home">
      <div className="cover">
        <div className="image"></div>
        <div className="title small">
          <h1>BLOSSOM BY EVE</h1>
        </div>
        <div className="title large">
          <p>WHERE CREATIVITY COMES TO LIFE</p>
        </div>
      </div>
      <div className="icons">
        <div className="icon">
          <Heart />
          <h3>Lorem</h3>
          <p>This is a full sentence that goes here.</p>
        </div>
        <div className="icon">
          <Puzzle />
          <h3>Lorem</h3>
          <p>This is a full sentence that goes here.</p>
        </div>
        <div className="icon">
          <Pencil />
          <h3>Lorem</h3>
          <p>This is a full sentence that goes here.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
