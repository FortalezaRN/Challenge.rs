import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api'

import { Input, Button } from '../../components';
import Logo from '../../assets/logo.svg';

import './Login.css';

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(e: FormEvent){
    e.preventDefault();

    api.post('users/login', formData).then(res => {
        const { token } = res.data;
        localStorage.setItem('token', token);
        history.push("/dashboard")
        return;
    })
  }

  return(
    <section className="container-login">
      <main className="login">
        <img src={Logo} alt="Logo Nave.rs"/>
        <form onSubmit={handleSubmit}>
          <Input 
            type="email"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            onChange={handleChange}
          />
          <Input 
            type="password"
            name="password"
            label="Senha"
            placeholder="Senha"
            onChange={handleChange}
          />
          <Button
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </main>
    </section>
  )
}

export default Login;