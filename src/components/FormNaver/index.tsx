import React, { FormEvent, ChangeEvent } from 'react';
import { Input, Button } from '../../components';

import './FormNaver.css'

interface FormProps {
  data: {
    job_role: string;
    admission_date: string;
    birthdate: string;
    project: string;
    name: string;
    url: string;
  };
  loading?: boolean;
  handleSubmit: ((e: FormEvent) => void);
  handleChange: ((e: ChangeEvent<HTMLInputElement>) => void);
}

const FormNaver = ({ handleSubmit, handleChange, data, loading = false }: FormProps) => {
  const { 
    job_role,
    admission_date,
    birthdate,
    project,
    name,
    url
  } = data;

  return(
    <form onSubmit={handleSubmit} className="form-naver">
      <Input 
        type="text"
        name="name"
        label="Nome"
        placeholder="Nome"
        value={name}
        onChange={handleChange}
      />
      <Input 
        type="text"
        name="job_role"
        label="Cargo"
        value={job_role}
        placeholder="Cargo"
        onChange={handleChange}
      />
      <Input 
        type="text"
        name="birthdate"
        label="Idade"
        value={birthdate}
        placeholder="Idade"
        onChange={handleChange}
      />
      <Input 
        type="text"
        name="admission_date"
        label="Tempo de empresa"
        value={admission_date}
        placeholder="Tempo de empresa"
        onChange={handleChange}
      />
      <Input 
        type="text"
        name="project"
        label="Projetos que participou"
        value={project}
        placeholder="Projetos que participou"
        onChange={handleChange}
      />
      <Input 
        type="text"
        name="url"
        label="URL da foto do Naver"
        value={url}
        placeholder="URL da foto do Naver"
        onChange={handleChange}
      />
      <div className="field">
        <Button
          type="submit"
          loading={loading}
        >
          Salvar
        </Button>
      </div>
    </form>
  )
}

export default FormNaver;