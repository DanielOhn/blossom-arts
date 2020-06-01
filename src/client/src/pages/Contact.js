import React from "react"
import "../styles/Contact.css"

import Header from "../components/Header"

function Contact() {
  return (
    <div className="contact">
      <Header
        title="Feedback"
        subtitle="We Love Your"
        bg="https://placekitten.com/1000/1000"
      />
      <form className="contact-form">
        <input placeholder="name" type="text" />
        <input placeholder="email" type="text" />
        <textarea
          placeholder="We would love your feedback!"
          cols="20"
        ></textarea>
      </form>
    </div>
  )
}

export default Contact
