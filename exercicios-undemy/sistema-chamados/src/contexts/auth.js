//Contexto de autenticacao.
//Vai disponibilizar em todas as paginas as informacoes do usuario: foto, nome etc
//Assim como informar se o usuario esta signed or nao

import { useState, useEffect, createContext} from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false); //Utilizado para colocar info 'carregando' no botao/ou qq outro lugar
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    function loadStorage(){
      const storageUser = localStorage.getItem('SistemaUser'); //Verifica se tem usuario logado
      if (storageUser) {
        setUser(JSON.parse(storageUser)); //JSON.parse converte de volta para objeto
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, [])

  return(
    <AuthContext.Provider value={{ signed: !!user, user, loading }}> {/*Vai disponibilizar para todos as informacoes passadas pelo value */}
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider


//Provider: fornece os dados do contexto, bem como as suas mudancas