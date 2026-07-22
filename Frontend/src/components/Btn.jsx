import React from 'react'

const Btn = ({
text,
  type = "button",
  onClick,
  className = "",
  disabled = false,}) => {
  return (
    
    <button type={type} onClick={onClick} className={className} disabled={disabled}>{text}</button>
  )
}

export default Btn;
