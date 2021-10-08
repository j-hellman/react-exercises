
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './signup.css';
import logo from '../../assets/logo.png'

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert('Clicou');
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="Logo Sistema"/>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <input type="text" placeholder="Nome" value={nome} onChange={ (e) => setNome(e.target.value) }/>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*********" value={senha} onChange={ (e) => setSenha(e.target.value) }/>
          <button type="submit">Cadastrar</button> {/*Botao esta dentro do Form, entao pode usar o type=Submit */}
        </form>

        <Link to="/">Já possuo uma conta!</Link> {/*Usa o Link pq evita que a pagina sofra Refresh */}
      </div>
    </div>

  )
}

export default SignUp