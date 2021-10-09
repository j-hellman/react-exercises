//Context para autenticacao.
//Vai disponibilizar em todas as paginas as informacoes do usuario: foto, nome etc

import { useState, useEffect, createContext} from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false); //Utilizado para colocar info 'carregando' no botao/ou qq outro lugar
  const [loading, setLoading] = useState(true)


  return(
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider