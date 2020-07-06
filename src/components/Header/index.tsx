import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import './Header.css';

const Header= () => {
  function logout(){
    localStorage.removeItem('token');
  }
  return(
    <header className="container-header">
      <div className="header">
      <Link to="/dashboard">
          <img src={Logo} alt="Logo Nave.rs"/>
        </Link>
        <Link to="/" onClick={logout}>
          Sair
        </Link>
      </div>
    </header>
  )
}

export default Header;