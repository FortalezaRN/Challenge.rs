import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { Header, FormNaver, Alert } from '../../components'
import Arrow from '../../assets/arrow.svg';

import './EditNaver.css';

interface NaverData{
  id?: string;
  job_role: string;
	admission_date: string;
	birthdate: string;
	project: string;
	name: string;
  url: string;
}

interface Props {
  location: {
    state: {
      data: { id: string;}
    }
  };
}

const EditNaver = (props: Props) => {

  function dataAtualFormatada(time: string){
    const data = new Date(time),
        day  = data.getUTCDate().toString(),
        dayF = (day.length === 1) ? '0'+day : day,
        month  = (data.getUTCMonth()+1).toString(),
        monthF = (month.length === 1) ? '0'+month : month,
        year = data.getUTCFullYear();
    return dayF+"/"+monthF+"/"+year;
  }

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    const { id } = props.location.state.data;
    api.get(`navers/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then((res) =>{
      setFormData({
        ...res.data,
        admission_date: dataAtualFormatada(res.data.admission_date),
        birthdate: dataAtualFormatada(res.data.birthdate),
      });
      setLoading(false);
    })
  }, [props]);

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
    const {
      id,
      admission_date,
      birthdate,
      job_role,
      name,
      project,
      url
    } = formData;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1ODk2ZjY0LTQzMWQtNDk3ZS04M2Q5LTIxZWQ5MDViMTE5YiIsImVtYWlsIjoiZm9ydGFsZXphQG5hdmUucnMiLCJpYXQiOjE1OTM4MTgzNTl9.G-n27Y1aLw2biFg60dkwmS55otewgb5Ajec5Lzst8oM'
    api.put(`navers/${id}`,{
      admission_date,
      birthdate,
      job_role,
      name,
      project,
      url
    }, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then((res) => {
      setFormData({
        ...res.data,
        admission_date: dataAtualFormatada(res.data.admission_date),
        birthdate: dataAtualFormatada(res.data.birthdate),
      })
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
  }
  
  return(
    <>
      <Header />
      <main className="container-edit-naver">
        <header className="main-header">
          <Link to='/dashboard'>
            <img src={Arrow} alt="Voltar para dashboard"/>
          </Link>
          <h3>Editar Naver</h3>
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
      {showModal && <Alert show={delayShowModal} choice="update" closeModal={closeModal}/>}
    </>
  )
}

export default EditNaver;