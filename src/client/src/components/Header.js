import React from 'react'

import '../styles/Header.css'

function Header(props) {

  return (
    <div className='header' style={{ backgroundImage: `url(${props.bg})`}}>
      <span />
      <h2>{props.subtitle}</h2>
      <h1>{props.title}</h1>
    </div>
  )
}

export default Header