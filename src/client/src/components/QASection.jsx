import React from "react"

import "../styles/QASection.css"

const QASection = (props) => {
  return (
    <div className="section">
      <h3 className="heavy">{props.question}</h3>
      <p className="normal light">{props.answer}</p>
    </div>
  )
}

export default QASection
