
import { useState } from 'react'; //Para ter estados
import { Link } from 'react-router-dom';

import './signin.css';
import logo from '../../assets/logo.png'


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <div className="container-center">
        <div className="login">
          <div className="logo-area">
            <img src={logo} alt="Logo Sistema" />
          </div>

          <form>
            <h1>Entrar</h1>
            <input type="text" placeholder="email@email.com" />
            <input type="password" placeholder="*********" />
            <button type="submit">Acessar</button>
          </form>

          <Link to="/register">Criar uma conta</Link> {/*Usa o Link pq evita que a pagina sofra Refresh */}

        </div>
      </div>

    </div>
  )
}

export default SignIn