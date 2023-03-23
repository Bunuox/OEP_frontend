import React, { useState } from 'react'
import './input.css'


function Input({type, placeholder}) {
  return (
    <input 
    className="input" 
    placeholder={placeholder} 
    type={type}
    />
  )
}

export default Input