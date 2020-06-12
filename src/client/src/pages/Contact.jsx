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
          type="text"
          placeholder="We would love your feedback!"
        ></textarea>

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Contact
