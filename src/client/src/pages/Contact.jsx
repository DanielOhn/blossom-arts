import React, { useState } from "react"
import "../styles/Contact.css"

import QASection from "../components/QASection"

function Contact() {
  // const [name, setName] = useState()
  // const [email, setEmail] = useState()
  // const [subject, setSubject] = useState()
  // const [content, setContent] = useState()
  // const [url] = useState("http://localhost:3001/")

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
    <div className="contact-page">
      <div className="faq">
        <h1 className="primary">FAQ</h1>
        <hr className="primary" />

        <div className="faq-section">
          <QASection
            question="How long does it take for the product to be delivered?"
            answer="It usually takes around 2 week until you recieve your product if you live within the United States."
          />
          <QASection
            question="One of your products is out of stock.  When will you get more?"
            answer="It usually takes a while for us to restock on certain products since everything is made by hand.  
            Expect it to restock in about 3 weeks time depending on the popularity of the product."
          />
          <QASection
            question="Why is Yvette a dumb brat?"
            answer="Wouldn't we all like to know the answer to this one."
          />
        </div>
      </div>
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
    </div>
  )
}

export default Contact
