import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';

import Spinner from '../../assets/spinner.svg';

import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: string;
  loading?: boolean;
  white?: boolean;
}

const Button:FunctionComponent<ButtonProps>= ({ children, loading = false, white=false, ...shared  }) => {
  return(
    <button 
      {...shared}
      className={`btn-primary ${(white) ? "btn-white" : ""}`}
    >
      {!loading && children}
      {loading && <img src={Spinner} alt="Carregando" />}
    </button>
  )
}


Button.defaultProps = {
  type: 'button',
}

export default Button;