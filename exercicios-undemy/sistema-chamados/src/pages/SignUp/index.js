
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import logo from '../../assets/logo.png';
import { toast } from 'react-toastify';

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault(); //Para evitar que a pagina sofra Refresh

    //Inputs nome, email, password
    const fnome = document.getElementById("fnome");
    const femail = document.getElementById("femail");
    const fpassword = document.getElementById("fpassword");

    //Checagem dos inputs
    if (nome == '' && email == '' && password == '') {
      toast.warn('Favor preencher os campos corretamente.');
      fnome.focus(); //Cursor do mouse
    } else if (nome == '') {
      toast.warn('Favor preencher o campo Nome.');
      fnome.focus();
    } else if (email == '') {
      toast.warn('Favor preencher o campo Email.');
      femail.focus();
    } else if (password == '') {
      toast.warn('Favor preencher o campo Senha.');
      fpassword.focus();
    } else
      signUp(email, password, nome); //O signUp vem do context Auth
    //
  }

  return (
    //Layout visivel ao usuario
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="Logo Sistema" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <input type="text" id="fnome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="text" id="femail" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" id="fpassword" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button> {/*Botao esta dentro do Form, entao pode usar o type=Submit */}
        </form>

        <Link to="/">Já possui cadastro?</Link> {/*Usa Link pq evita que a pagina sofra Refresh */}
      </div>
    </div>

  )
}

export default SignUp