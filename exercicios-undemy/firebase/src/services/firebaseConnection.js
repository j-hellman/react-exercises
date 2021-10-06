
import firebase from 'firebase/app'; //Importa a biblioteca Firebase
import 'firebase/firestore';  //Importa o banco de dados

//Codigo copiado do banco de dados do Firebase
let firebaseConfig = {
  apiKey: "AIzaSyCDo6k5J7vjPhyq6UR22u5d0W1O8dSjQxo",
  authDomain: "pratica1-a572b.firebaseapp.com",
  projectId: "pratica1-a572b",
  storageBucket: "pratica1-a572b.appspot.com",
  messagingSenderId: "1010297702295",
  appId: "1:1010297702295:web:6d12ca95d1c6c45d1e26d2",
  measurementId: "G-QYNKQTDVDR"
};

//Condicional para verificar se já existe um firebase iniciado antes de iniciar um novo
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;