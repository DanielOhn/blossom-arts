import React from "react"
import "../styles/Home.css"

// import Cart from "../icons/cart"

import Heart from "../icons/heart"
import Puzzle from "../icons/puzzle"
import Pencil from "../icons/pencil"

import QASection from "../components/QASection"

function Home() {
  return (
    <div className="home">
      <div className="cover">
        <div className="image"></div>
        <div className="title small">
          <h1>WELCOME</h1>
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
      <div className="faq">
        <h1>FAQ</h1>

        <div className="faq-section">
          <QASection
            question="Yes, no maybe? I don't know. Can you repeat the question?"
            answer="You're not the boss of me now, and you're not so big!"
          />
          <QASection
            question="Yes, no maybe? I don't know. Can you repeat the question?"
            answer="You're not the boss of me now, and you're not so big!"
          />
          <QASection
            question="Yes, no maybe? I don't know. Can you repeat the question?"
            answer="You're not the boss of me now, and you're not so big!"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
