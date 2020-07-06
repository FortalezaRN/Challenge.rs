import React, { useState, useEffect, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import { Header, Card, Link, Alert, Modal } from '../../components';

import './Dashboard.css';

interface Naver {
  id: string,
  name: string;
  admission_date: string;
  job_role: string;
  user_id: string;
  project: string;
  birthdate: string;
  url: string;
}

// interface Props

const Dashboard = () => {
  const history = useHistory();
  const [navers, setNavers] = useState<Naver[]>([])
  const [idSelected, setIdSelected] = useState<string>('');
  const [naverSelected, setNaverSelected] = useState<Naver>({} as Naver);
  const [showAlertDelete, setShowAlertDelete] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Criado para dar o efeito de fadeIn 
  const [delayShowAlertDialog, setDelayShowAlertDialog] = useState<boolean>(false);
  const [delayAlertDelete, setDelayAlertDelete] = useState<boolean>(false);
  const [delayShowModal, setDelayShowModal] = useState<boolean>(false);

  function updateList(){
    const token = localStorage.getItem('token');
    api.get('navers', {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then((res) =>{
      setNavers(res.data)
    })
  }

  useEffect(() => {
    updateList();
  }, [])

  function showDeleteDialog(e: MouseEvent, id: string){
    e.stopPropagation();
    setIdSelected(id);
    setShowAlertDialog(true);
    setTimeout(() => setDelayShowAlertDialog(true), 10);
  }

  function editNaver(e: MouseEvent, id: string){
    e.stopPropagation();
    const data = (navers.find(naver => (naver.id === id)));
    setNaverSelected(data as Naver);
    history.push("/edit-naver", {
      data
    })
  }

  function showModalInfo(id: string){
    setIdSelected(id);
    const data = (navers.find(naver => (naver.id === id)));
    setNaverSelected(data as Naver);
    setShowModal(true);
    setTimeout(() => setDelayShowModal(true), 10);
  }

  function closeModal(){
    setDelayShowModal(false);
    setTimeout(() => setShowModal(false), 200);
  }

  function closeAlertDialog(){
    setDelayShowAlertDialog(false);
    setTimeout(() => setShowAlertDialog(false), 200);
  }

  function closeAlertDelete(){
    closeModal();
    setDelayAlertDelete(false);
    setTimeout(() => setShowAlertDelete(false), 200);
  }

  function deleteNaver(){
    const token = localStorage.getItem('token');
    setLoading(true);
    api.delete(`navers/${idSelected}`, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then((res) =>{
      updateList();
      closeAlertDialog();
      setShowAlertDelete(true);
      setLoading(false);
      setTimeout(() => setDelayAlertDelete(true), 10);
      setIdSelected("");
    })
   
  }

  return(
    <>
      <Header />
      <main className="container-dashboard">
        <header className="main-header">
          <h1>Navers</h1>
          <Link
            data={
              {
                pathname: "/new-naver",
                state: { teste: "Ne q deu certo" }
              }
            }
          >
            Adicionar Naver
          </Link>
        </header>
        <section className="container-nevers">
          <ul>
            { navers.map(naver => (
              <li key={naver.id}>
                <Card 
                  avatar={naver.url}
                  role={naver.job_role}
                  name={naver.name}
                  deleteNaver={(e) => showDeleteDialog(e, naver.id)}
                  editNaver={(e) => editNaver(e, naver.id)}
                  showModal={() => showModalInfo(naver.id)}
                />
              </li>
            )) }
          </ul>
        </section>
      </main>
      {showModal &&
        <Modal
         show={delayShowModal}
         closeModal={closeModal}
         data={naverSelected}
         deleteNaver={(e) => showDeleteDialog(e, idSelected)}
         editNaver={(e) => editNaver(e, idSelected)}
        />
      }
      {showAlertDialog &&
        <Alert
          show={delayShowAlertDialog}
          choice="dialog" 
          onCancel={closeAlertDialog}
          loading={loading}
          onDelete={deleteNaver}
        />
      }
      {showAlertDelete &&
        <Alert
          show={delayAlertDelete}
          choice="delete"
          closeModal={closeAlertDelete}
        />
      }
    </>
  )
}

export default Dashboard;