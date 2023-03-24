import React, { useState } from 'react'
import './input.css'


function Input({type, placeholder,onChange}) {
  return (
    <input 
    className="input" 
    placeholder={placeholder} 
    type={type}
    onChange={onChange}
    />
  )
}

export default Input