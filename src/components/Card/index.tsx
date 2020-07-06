import React, { FunctionComponent, AnchorHTMLAttributes } from 'react';

import Trash from '../../assets/trash.svg';
import Pencil from '../../assets/pencil.svg';

import './Card.css'

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>{
  avatar: string;
  name: string;
  role: string;
  deleteNaver: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void); 
  editNaver: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void); 
  showModal: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void); 
}

const Card:FunctionComponent<AnchorProps> = ({
  avatar,
  name,
  role,
  deleteNaver,
  editNaver,
  showModal,
  ...shared
}) => {
  return(
    <a
      {...shared}
      className="container-card"
      onClick={showModal}
    >
      <div className="card-img">
        <img src={avatar} alt={name}/>
      </div>
      <div className="card-info">
        <h4>{name}</h4>
        <h4 className="font-normal">{role}</h4>
        <div className="card-btns">
          <button onClick={deleteNaver}>
            <img src={Trash} alt="Excluir"/>
          </button>
          <button onClick={editNaver}>
            <img src={Pencil} alt="Editar"/>
          </button>
        </div>
      </div>
    </a>
  )
}

export default Card;