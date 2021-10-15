
import { useState, useContext } from 'react'; //Para ter estados
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import './signin.css';
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault(); //Para evitar que a pagina sofra Refresh
    
    if(email == '' || password == '')
      toast.warn('Favor preencher os campos corretamente.');
    else 
      signIn(email, password)
  }

  return (
    //Layout visivel ao usuario
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="Logo Sistema"/>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*********" value={password} onChange={ (e) => setPassword(e.target.value) }/>
          <button type="submit">{loadingAuth ? 'Carregando..' : 'Acessar'}</button> {/*Botao esta dentro do Form, entao pode usar o type=Submit */}
        </form>

        <Link to="/register">Crie uma conta</Link> {/*Usa o Link pq evita que a pagina sofra Refresh */}
      </div>
    </div>
  )
}

export default SignIn