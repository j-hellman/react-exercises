
import { useState } from 'react'; //Para ter estados
import { Link } from 'react-router-dom';

import './signin.css';
import logo from '../../assets/logo.png'

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); //Para evitar que a pagina sofra Refresh
    alert('Clicou');
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="Logo Sistema"/>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*********" value={password} onChange={ (e) => setPassword(e.target.value) }/>
          <button type="submit">Acessar</button> {/*Botao esta dentro do Form, entao pode usar o type=Submit */}
        </form>

        <Link to="/register">Criar uma conta</Link> {/*Usa o Link pq evita que a pagina sofra Refresh */}
      </div>
    </div>
  )
}

export default SignIn