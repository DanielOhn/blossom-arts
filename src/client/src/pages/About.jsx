import React from "react"
import "../styles/About.css"
import "../styles/Fonts.css"

import Header from "../components/Header"

function About() {
  return (
    <div className="about">
      <Header
        title="About Us"
        subtitle="Welcome"
        bg="https://placekitten.com/1000/1000"
      />
      <div className="posts">
        <div className="right post">
          <div className="text">
            <span />
            <h4 className="primary">Pellentesque sed consequat</h4>
            <p className="secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              blandit ullamcorper egestas. Pellentesque sed consequat metus, a
              dictum nulla. Suspendisse potenti. Ut tristique feugiat dolor at
              imperdiet.
            </p>
          </div>
          <img alt="cat" src="https://placekitten.com/420/280" />
        </div>
        <div className="left post">
          <div className="text">
            <span />
            <h4 className="primary">Pellentesque sed consequat</h4>
            <p className="secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              blandit ullamcorper egestas. Pellentesque sed consequat metus, a
              dictum nulla. Suspendisse potenti. Ut tristique feugiat dolor at
              imperdiet.
            </p>
          </div>
          <img alt="cat" src="https://placekitten.com/420/280" />
        </div>
        <div className="right post">
          <div className="text">
            <span /> <h4 className="primary">Pellentesque sed consequat</h4>
            <p className="secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              blandit ullamcorper egestas. Pellentesque sed consequat metus, a
              dictum nulla. Suspendisse potenti. Ut tristique feugiat dolor at
              imperdiet.
            </p>
          </div>
          <img alt="cat" src="https://placekitten.com/420/280" />
        </div>
      </div>
    </div>
  )
}

export default About
