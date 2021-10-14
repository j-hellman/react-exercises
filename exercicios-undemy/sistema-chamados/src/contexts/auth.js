//Contexto de autenticacao.
//Vai disponibilizar em todas as paginas as informacoes do usuario: foto, nome etc
//Assim como informar se o usuario esta signed or nao

import { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false); //Utilizado para colocar info 'carregando' no botao/ou qq outro lugar
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    function loadStorage(){
      const storageUser = localStorage.getItem('SistemaUser'); //Verifica se tem usuario logado
      if (storageUser) {
        setUser(JSON.parse(storageUser)); //JSON.parse converte de volta para objeto, pois os dados recebidos do servidor vem como string
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, [])

  //LOGIN do usuario
  async function signIn(email, password) {
    setLoadingAuth(true);

    //Login do usuario no Auth()
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( async (value) => {
      let uid = value.user.uid;

      const userProfile = await firebase.firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        avatarUrl: userProfile.data().avatarUrl,
        email: value.user.email
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);

      //Mensagem Bem-vindo
      toast.success(`Bem-vindo(a) novamente, ${data.nome}!`);
    })

    .catch((error) => {
      console.log(error);
      toast.error('Ops, algo deu errado!', {position: toast.POSITION.TOP_CENTER})
      setLoadingAuth(false);
    })
  }

  //CADASTRO do usuario
  async function signUp(email, password, nome) {
    setLoadingAuth(true);
    
    //Cadastro do usuario no Auth()
    await firebase.auth().createUserWithEmailAndPassword(email, password) 
    .then( async (value) => {
      let uid = value.user.uid;

      //Cadastro no banco Firestore
      await firebase.firestore().collection('users') 
      .doc(uid).set({ //Cria um doc com uid passando nome e avatar
        nome: nome,
        avatarUrl: null
      })
      .then( () => {
        let data = {
          uid: uid,
          nome: nome,
          email: value.user.email,
          avatarUrl: null
        };
        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        
        //Mensagem Bem-vindo
        toast.success(`Seja bem-vindo(a) à plataforma, ${data.nome}!`)
      })
    })

    //Em caso de algum error
    .catch((error) => { 
      console.log(error);
      toast.error('Ops, algo deu errado!', {position: toast.POSITION.TOP_CENTER})
      setLoadingAuth(false);
    })
  }

  //Salva o item no localStorage
  function storageUser(data) {
    localStorage.setItem('SistemaUser', JSON.stringify(data));
  }

  //LOGOUT do usuario
  async function signOut() {
    await firebase.auth().signOut()
    localStorage.removeItem('SistemaUser'); //Apagar no localStorage
    setUser(null);
    toast.info('Usuário(a) deslogado com sucesso!')
  }

  return(
    <AuthContext.Provider value={{ 
      //Disponibiliza para todos as informacoes passadas pelo value
      signed: !!user, 
      user, 
      loading,
      signIn, 
      signUp, 
      signOut,
      loadingAuth
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider


//Provider: fornece os dados do contexto, bem como as suas mudancas