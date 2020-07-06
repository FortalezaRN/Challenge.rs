import React, { ChangeEvent } from 'react';

import './Input.css'

interface InputProps{
  type: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  onChange(e: ChangeEvent<HTMLInputElement>): any;
}

const Input= ({ onChange, type, name, label, placeholder, value}: InputProps) => {
  return(
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input 
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input;