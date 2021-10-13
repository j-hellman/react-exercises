
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import logo from '../../assets/logo.png';

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault(); //Para evitar que a pagina sofra Refresh
    
    if(nome !== '' && email !== '' && password !== '') {
      signUp(email, password, nome) //O signUp vem do context Auth
    }
  }

  return ( 
    //Layout visivel ao usuario
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="Logo Sistema"/>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <input type="text" placeholder="Nome" value={nome} onChange={ (e) => setNome(e.target.value) }/>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*********" value={password} onChange={ (e) => setPassword(e.target.value) }/>
          <button type="submit">Cadastrar</button> {/*Botao esta dentro do Form, entao pode usar o type=Submit */}
        </form>

        <Link to="/">Já tem uma conta? Entre aqui</Link> {/*Usa Link pq evita que a pagina sofra Refresh */}
      </div>
    </div>

  )
}

export default SignUp