
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
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl); //Responsavel por mostrar no perfil
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
        .then(() => {
          //Update nas demais areas
          let data = {
            ...user,
            nome: nome
          }
          setUser(data);
          storageUser(data);
        })

    } else if (nome !== '' && imageAvatar !== null) {
      handleUpload();
    }
  }
  
    //Para o arquivo de imagem
    function handleFile(e) {
      if (e.target.files[0]) { //Caminho para a imagem
        const image = e.target.files[0];
        console.log(image)
  
        //Verificacao para o tipo de imagem
        if (image.type === 'image/jpeg' || image.type === 'image/png') {
          setImageAvatar(image);
          setAvatarUrl(URL.createObjectURL(e.target.files[0]));
  
        } else {
          alert('Envie uma imagem do tipo JPEG ou PNG');
          setImageAvatar(null);
          return null;
        }
      }
    }

  //Enviar imagem para o Firebase
  async function handleUpload() {
    const currentUid = user.uid; //Saber qual uid do usuario logado

    const uploadTask = await firebase.storage()
      .ref(`images/${currentUid}/${imageAvatar.name}`) //Onde ficará armazenado no Firebase
      .put(imageAvatar) //O que vai enviar
      .then(async () => {
        console.log('Foto enviada com sucesso');

        await firebase.storage().ref(`images/${currentUid}`)
        .child(imageAvatar.name).getDownloadURL()
        .then(async (url) => {
          let urlFoto = url;

          await firebase.firestore().collection('users')
          .doc(user.uid)
          .update({
            avatarUrl: urlFoto,
            nome: nome
          })
          .then(() => {
            let data = {
              ...user,
              avatarUrl: urlFoto,
              nome: nome
            };
            
            setUser(data);
            storageUser(data);

          })
        })
      })

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
              <input type="file" accept="image/*" onChange={handleFile} /><br />
              {avatarUrl === null ?
                <img src={avatar} width="250" height="250" alt="Foto perfil usuario" />
                :
                <img src={avatarUrl} width="250" height="250" alt="Foto perfil usuario" />
              }
            </label>

            {/* Inputs */}
            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

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