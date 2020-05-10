import React from "react"
import "../styles/About.css"

function About() {
  return (
    <div className="about">
      <h1>About</h1>
      <div className="right post">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras blandit
          ullamcorper egestas. Pellentesque sed consequat metus, a dictum nulla.
          Suspendisse potenti. Ut tristique feugiat dolor at imperdiet.
        </p>
        <img alt="cat" src="https://placekitten.com/420/280" />
      </div>
      <div className="left post">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras blandit
          ullamcorper egestas. Pellentesque sed consequat metus, a dictum nulla.
          Suspendisse potenti. Ut tristique feugiat dolor at imperdiet.
        </p>
        <img alt="cat" src="https://placekitten.com/420/280" />
      </div>
    </div>
  )
}

export default About
