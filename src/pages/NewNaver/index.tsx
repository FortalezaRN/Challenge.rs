import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { Header, FormNaver, Alert } from '../../components'
import Arrow from '../../assets/arrow.svg';

import './NewNaver.css';

interface Props {
  location: {
    state: object
  };
}

interface NaverData{
  job_role: string;
	admission_date: string;
	birthdate: string;
	project: string;
	name: string;
	url: string;
}

const NewNaver = ({ location }: Props) => {

  const [formData, setFormData] = useState<NaverData>({
    job_role: "",
    admission_date: "",
    birthdate: "",
    project: "",
    name: "",
    url: ""
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Criado para dar o efeito de fadeIn 
  const [delayShowModal, setDelayShowModal] = useState<boolean>(false);

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(e: FormEvent){
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    api.post('navers', formData, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then((res) => {
      setShowModal(true);
      setTimeout(() => setDelayShowModal(true), 10);
      setLoading(false);
    }).catch((er) => {
      console.error(er);
    })

  }

  function closeModal(){
    setDelayShowModal(false);
    setTimeout(() => setShowModal(false), 200);
    setFormData({
      job_role: "",
      admission_date: "",
      birthdate: "",
      project: "",
      name: "",
      url: ""
    })
  }
  
  return(
    <>
      <Header />
      <main className="container-new-naver">
        <header className="main-header">
          <Link to='/dashboard'>
            <img src={Arrow} alt="Voltar para dashboard"/>
          </Link>
          <h3>Adicionar Naver</h3>
        </header>
        <section className="container-form">
          <FormNaver 
            data={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </section>
      </main>
      {showModal && <Alert show={delayShowModal} closeModal={closeModal}/>}
    </>
  )
}

export default NewNaver;