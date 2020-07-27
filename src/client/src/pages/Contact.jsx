import React from "react"
import "../styles/Contact.css"

import Header from "../components/Header"

function Contact() {
  return (
    <div className="contact">
      <h1 className="primary">Contact Us</h1>
      <hr className="primary" />

      <p className="primary">
        We are constantly trying to improve our services and products for our
        customers. Any feedback on where we can improve, comments, and
        suggestions would be appreciated!
      </p>
      <form className="contact-form">
        <input className="name" placeholder="Your Name" type="text" />
        <input className="email" placeholder="Your Email" type="text" />
        <textarea
          type="text"
          className="text"
          placeholder="We would love your feedback!"
        ></textarea>

        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Contact
