
import firebase from 'firebase/compat/app'; //Biblioteca Firebase
import 'firebase/compat/auth'; //Modulo de autenticacao do Firebase

let firebaseConfig = {
  //Codigo copiado do banco de dados do Firebase
  apiKey: "AIzaSyAw4gr_3Ef5HPySV73wuZoVTrfKEq1uz14",
  authDomain: "sistema-chamados-b4bb4.firebaseapp.com",
  projectId: "sistema-chamados-b4bb4",
  storageBucket: "sistema-chamados-b4bb4.appspot.com",
  messagingSenderId: "506366140820",
  appId: "1:506366140820:web:a1300b39dfbf2b2a206f81",
  measurementId: "G-LNQ3M1WVEZ"
};

if (!firebase.apps.length) {
  //Condicional para verificar se ja existe firebase iniciado
  firebase.initializeApp(firebaseConfig);
};

export default firebase;