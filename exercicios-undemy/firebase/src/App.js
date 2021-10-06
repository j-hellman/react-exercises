
import './app.css'
import firebase from './services/firebaseConnection';
import { useState } from 'react';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  // ***** Funcao botao adicionar *****
  async function handleAdd(){ 

    //Acessa qual a collection
    await firebase.firestore().collection('posts')
    
    // ********* PARA QUANDO VOCE QUER CRIAR UM ID ALEATORIO ***********
    .add({
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('Dados cadastrados com sucesso');
      
      //Limpa os campos apos o cadastro com sucesso
      setTitulo('');
      setAutor('');
    })
    .catch((erro)=>{
      console.log('Algo deu errado: ' + erro);
    })

    /* ********* PARA QUANDO O ID É FIXO ***********
    //Acessa qual o doc (ou ID) que voce quer adicionar
    .doc('12345') 
    
    //Diz qual campo voce quer adicionar
    .set({
      titulo: titulo, //o primeiro 'titulo' é do banco de dados. O segundo é do useState
      autor: autor
    })

    //Set é uma promisse, entao retorna .then(para caso de sucesso) e o .catch(para caso erro)
    .then(()=>{
      console.log('Dados cadastrados com sucesso');
      
      //Limpa os campos apos o cadastro com sucesso
      setTitulo('');
      setAutor('');
    })

    .catch((erro)=>{
      console.log('Algo deu errado: ' + erro);
    })
    */
  }


  // ***** Funcao botao buscarPost *****
  async function buscarPost(){
    await firebase.firestore().collection('posts')
    .doc('123')

    //O get vai buscar esses dados para mim. Tambem é uma promisse, devolvendo o .then e o .catch
    .get()
    .then((snapshot)=>{
      setTitulo(snapshot.data().titulo);
      setAutor(snapshot.data().autor);
    })
    .catch((erro)=>{
      console.log('Deu algum erro' + erro);
    })
  }


  return (
    <div className="container">
      <h1>Firebase + JS</h1>

      <label>Título: </label>
      <textarea type="text" value={titulo} onChange={ (e) => setTitulo(e.target.value) } /> <br/>

      <label>Autor: </label>
      <input type="text" value={autor} onChange={ (e) => setAutor(e.target.value) } /> <br/>

      <button onClick={ handleAdd }>Cadastrar</button>
      <button onClick={ buscarPost }>Buscar Post</button>
    </div>
  );
}

export default App;
