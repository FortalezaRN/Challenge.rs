import React from 'react';

import Close from '../../assets/close.svg';
import Trash from '../../assets/trash.svg';
import Pencil from '../../assets/pencil.svg';

import './Modal.css';

interface Props {
  show: boolean;
  data: {
    id: string,
    name: string;
    admission_date: string;
    job_role: string;
    user_id: string;
    project: string;
    birthdate: string;
    url: string;
  }
  closeModal?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  deleteNaver?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void); 
  editNaver?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void); 
}


const Modal = ({ show, editNaver, deleteNaver, closeModal, data}: Props) => {
  function calculateTime(time: string) { 
    const convertTime = new Date(time)
    const ms = Date.now() - convertTime.getTime();
    const age = new Date(ms);
    return (age.getUTCFullYear() - 1970);
  }

  function companyTime(time: Number){
    if(time < 1)
      return "menos de um ano de empresa";
    if(time === 1)
      return "1 ano de empresa";
    return `${time} anos de empresa`
  }

  return(
    <div className={`modal ${(show) ? 'show-modal' : ''}`}>
      <div className="modal-container">
        <div className="modal-img">
          <img src={data.url} alt={data.name}/>
        </div>
        <div className="modal-info-container">
          <div className="modal-info">
            <h3>{data.name}</h3>
            <h4 className="font-normal">{data.job_role}</h4>
            <h4>Idade</h4>
            <h4 className="font-normal">{calculateTime(data.birthdate)} anos</h4>
            <h4>Tempo de empresa</h4>
            <h4 className="font-normal">{companyTime(calculateTime(data.admission_date))}</h4>
            <h4>Projetos que participou</h4>
            <h4 className="font-normal">{data.project}</h4>
          </div>
          <div className="modal-btns">
            <button onClick={deleteNaver}>
              <img src={Trash} alt="Excluir"/>
            </button>
            <button onClick={editNaver}>
              <img src={Pencil} alt="Editar"/>
            </button>
          </div>
        </div>
        <span className="btn-close">
          <button onClick={closeModal}>
            <img src={Close} alt="Fechar Alert"/>
          </button>
        </span>
      </div>
    </div>
  )
}

export default Modal;