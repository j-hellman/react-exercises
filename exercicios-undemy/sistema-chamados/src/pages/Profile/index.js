
import './profile.css';
import { useState, useContext } from 'react';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';


export default function Profile() {
  const { user, signOut, exiting, setUser, storageUser } = useContext(AuthContext);
  const [nome, setNome] = useState(user && user.nome); //Se tiver User, insere o nome dele
  const [email, setEmail] = useState(user && user.email); //O '&&' diz como 'entao'
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  async function handleSave(e) {
    e.preventDefault();

    //Faz o update apenas do Nome
    if (imageAvatar === null && nome !== '') {
      //Update no Firebase
      await firebase.firestore().collection('users')
      .doc(user.uid)
      .update({
        nome: nome
      })
      .then(()=>{
        //Update nas demais areas
        let data = {
          ...user,
          nome: nome
        }
        setUser(data);
        storageUser(data);
      })
    }

  }

  return (
    <div>
      <Header />

      <div className="content">
        {/* Titulo da pagina*/}
        <Title name='Meu perfil'>
          <FiSettings size={25} />
        </Title>

        {/* Informacoes do usuario */}
        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <span>
              {/* Icone de carregar a imagem */}
                <FiUpload color="#FFF" size={25} />
              </span>

              {/* Input para escolher a imagem a ser carregada */}
              <input type="file" accept="image/*" /><br/>
              { avatarUrl === null ?
                <img src={avatar}  width="250" height="250" alt="Foto perfil usuario" />
                :
                <img src={avatarUrl} width="250" height="250" alt="Foto perfil usuario" />
              }
            </label>

            {/* Inputs */}
            <label>Nome</label>
            <input type="text" value={nome} onChange={ (e) => setNome(e.target.value) }/>

            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>

        {/* Botao SAIR */}
        <div className="container">
          <button className="logout-btn" onClick={() => signOut()}> {exiting ? 'Saindo...' : 'Sair'} </button>
        </div>

      </div>
    </div>
  )
}