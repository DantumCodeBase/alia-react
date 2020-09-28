import React from 'react'

import './Button.scss'

export const Button = ({ type = 'button', children }) => {
  return <button type={type} className="d-button">{children}</button>
}
