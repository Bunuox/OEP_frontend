import React from 'react'
import './input.css'

function Input({type, placeholder, onChange}) {
  return (
    <input className="input" placeholder={placeholder} onChange={onChange} type={type}/>
  )
}

export default Input