import React from 'react';
import api from '../../service/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
  const [filme, setFilmes] = useState([]); //hook para esse componente Home

  useEffect(() => {

    async function loadFilmes(){
      const response = await api.get('/r-api/?api=filmes') //await: diz para esperar a resposta e entao prosseguir no codigo
      setFilmes(response.data);
    }

    loadFilmes();
  }, []);

  return (
    <div className="container">
      <div className="lista-filmes">
        {filme.map((filme) => {
          return(
            <article key={filme.id}>
              <strong> {filme.nome} </strong>
              <img src={filme.foto} alt={filme.nome} />
              <Link to={`/filmes/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}