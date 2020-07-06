import React from 'react';

import { Button } from '../index'
import Close from '../../assets/close.svg';

import './Alert.css';

interface Props {
  show: boolean;
  choice?: "sucess" | "update" | "delete" | "dialog";
  loading?: boolean;
  onCancel?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  onDelete?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  closeModal?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const Alert = ({ show, choice = "sucess", onCancel, onDelete, closeModal, loading = false}: Props) => {
  let text, title;
  switch(choice){
    case "update":
      title="Naver atualizado";
      text="Naver atualizado com sucesso!";
      break;
    case "delete":
      title="Naver excluído";
      text="Naver excluído com sucesso!";
      break;
    case "dialog":
      title="Excluir Naver";
      text="Tem certeza que deseja excluir este Naver?";
      break;
    default:
      title="Naver criado";
      text="Naver criado com sucesso!";
  }
  return(
    <div className={`alert ${(show) ? 'show-alert' : ''}`}>
      <div className="alert-container">
        { (choice !== "dialog") &&
          <span className="btn-close">
            <button onClick={closeModal}>
              <img src={Close} alt="Fechar Alert"/>
            </button>
          </span>
        }
        <h3>{title}</h3>
        <h4 className="font-normal">{text}</h4>
        { (choice === "dialog") &&
          <div className="btn-dialog">
            <Button white onClick={onCancel}>
              Cancelar
            </Button>
            <Button onClick={onDelete} loading={loading}>
              Excluir
            </Button>
          </div>
        }
      </div>
    </div>
  )
}

export default Alert;