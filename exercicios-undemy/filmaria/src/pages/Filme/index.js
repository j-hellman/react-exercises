import './filme-info.css';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../service/api';
import { toast } from 'react-toastify'

export default function Filme(){
  const { id } = useParams();
  const history = useHistory(); //Função que mexe com a parte de history do navegador
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true); //Mensagem "Carregando o filme" para o usuário

  useEffect(() => {
    async function loadFilme() {
      const response = await api.get(`/r-api/?api=filmes/${id}`);

      //Para checar se o site existe
      if (response.data.length === 0) { 
        history.replace('/'); //Redireciona para a Home
        return;
      }

      setFilme(response.data);

      //Tira o Loading quando o filme é carregado
      setLoading(false); 
    }

    loadFilme();

    return() => {
      console.log('Componente Desmontado')
    }

  }, [history, id]);

  //Função para salvar filme favoritos
  function salvaFilme(){ 

    //Busca no 'localStorage' do navegador os filmes salvos
    const minhaLista = localStorage.getItem('filmes');

    //Transforma em JSON pois o arquivo vem em String
    let filmesSalvos = JSON.parse(minhaLista) || []; // [] é para se a resposta vier vazia

    //Verifica se já existe o filme salvo no navegador
    const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id ); //SOME devolve true ou false

    if (hasFilme){
      //Substitui o 'alert'
      toast.info('Você já possui esse filme salvo', {
        //Exemplo de algumas configurações para o Toast
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); 

      //Para a execução do filme aqui...
      return; 
    }

    //Para salvar
    filmesSalvos.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
     
    //Substitui o 'alert'
    toast.success('Filme salvo com sucesso!');
  }

  //Se o Loading estiver no valor "true" cai dentro desse "if"
  if (loading) { 
    return(
      <div className="filme-info">
        <h1>Carregando o filme...</h1>
      </div>
    );
  }

  return(
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome} />
      <h3>Sinopse</h3>
      {filme.sinopse}

      <div className="botoes">
        <button onClick={ salvaFilme }>Salvar</button>
        <button>
          <a href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`} target="_blank">
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}