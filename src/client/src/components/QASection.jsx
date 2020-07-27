import React, { useState } from "react"

const QASection = (props) => {
  const [answer, setAnswer] = useState(false)

  function showAnswer() {
    setAnswer(!answer)
  }

  return (
    <div className="section">
      <div className="question">
        <p>{props.question}</p>
        <button onClick={showAnswer}>.</button>
      </div>
      {answer && (
        <div className="answer">
          <p>{props.answer}</p>
        </div>
      )}
    </div>
  )
}

export default QASection
