
import './new.css'
import { useState, useEffect } from 'react';
import Customers from '../Customers';
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi'

export default function New() {
  const [assunto, setAssunto] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [complemento, setComplemento] = useState('');

  function handleRegister(e) {
    e.preventDefault();
  }

  //Chama quando troca a opcao Assunto
  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }

  //Chama quando troca a opcao de Status
  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  return (
    <div>
      <Header />

      <div className='content'>
        {/* Titulo da Pagina */}
        <Title name='Novo Chamado'>
          <FiPlusCircle size={25} />
        </Title>

        <div className='container'>
          <form className="form-profile" onSubmit={handleRegister}>

            <label>Cliente</label>
            <select>
              <option key={1} value={1}>
                Sujeito
              </option>
            </select>

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input type="radio" id="Aberto" name="status-cham" value="Aberto" onChange={handleOptionChange} checked={status === 'Aberto'} />
              <label for="Aberto">Em aberto</label>

              <input type="radio" id="Progresso" name="status-cham" value="Progresso" onChange={handleOptionChange} checked={status === 'Progresso'} />
              <label for="Progresso">Em progresso</label>

              <input type="radio" id="Atendido" name="status-cham" value="Atendido" onChange={handleOptionChange} checked={status === 'Atendido'} />
              <label for="Atendido">Atendido</label>
            </div>

            <label>Complemento</label>
            {/* Ja passa o Value direto para a useState complemento, sem precisar de uma funcao pois nao tem outras opcoes, somente o complemento msm */}
            <textarea type="text" placeholder="Adicione um complemento (opcional)..." value={complemento} onChange={(e) => setComplemento(e.target.value)} />

            {/* Botao Salvar */}
            <button type="submit">Salvar</button>
          </form>
        </div>


      </div>
    </div>
  )
}