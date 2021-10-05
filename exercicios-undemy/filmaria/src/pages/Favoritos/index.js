import './favoritos.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Favoritos(){
  const [filmes, setFilmes] = useState([]);

  useEffect(()=>{
    const minhaLista = localStorage.getItem('filmes'); //Dentro de 'minhaLista' ficarão todos os filmes do 'localStorage'em string
    setFilmes(JSON.parse(minhaLista) || []); //Transforma em JSON o que estava em string
  }, []);

  function handleDelete(id){
    let filtroFilmes = filmes.filter((item) => { //filter faz uma leitura do que existe no arquivo
      return(item.id !== id);
    }); 

    setFilmes(filtroFilmes); //Atualiza a pagina de filmes favoritos
    localStorage.setItem('filmes', JSON.stringify(filtroFilmes)); //Atualiza o localStorage

    //Substitui o alert
    toast.success('Filme excluido com sucesso')
  }

  
  return(
    <div id="meus-filmes">
      <h1>Meus filmes favoritos</h1>

      {/* Mensagem em caso de lista favoritos vazia*/}
      {filmes.length === 0 && <span>Você não possui filmes salvos :( </span>}
      
      <ul>
        {filmes.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.nome}</span>
              <div>
                <Link to={`/filmes/${item.id}`}>Ver detalhes</Link>
                <button onClick={ () => handleDelete(item.id) } >Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}