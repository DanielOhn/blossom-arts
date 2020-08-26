import React, { useState } from "react"
import "../styles/Contact.css"

function Contact() {
  // const [name, setName] = useState()
  // const [email, setEmail] = useState()
  // const [subject, setSubject] = useState()
  // const [content, setContent] = useState()
  const [url] = useState("http://localhost:3001/")

  function sendEmail() {
    fetch(`/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="contact">
      <h1 className="primary">Contact Us</h1>
      <hr className="primary" />

      <p className="primary">
        We are constantly trying to improve our services and products for our
        customers. Any feedback on where we can improve, comments, and
        suggestions would be appreciated!
      </p>
      <form action="/contact" method="POST" className="contact-form">
        <input className="name" placeholder="Your Name" type="text" />
        <input className="email" placeholder="Your Email" type="text" />
        <textarea
          type="text"
          className="text"
          placeholder="We would love your feedback!"
        ></textarea>

        <input
          className="submit"
          type="submit"
          value="Submit"
          onClick={() => sendEmail}
        />
      </form>
    </div>
  )
}

export default Contact
