
import './dashboard.css'
import { useState, useEffect } from "react";
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'; // Biblioteca para icones
import { format } from 'date-fns'; // Bublioteca para Datas

// Referencia para nao precisar ficar copiando toda a linha do codigo
const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true); //Para enquanto estiver carregando a pagina
  const [loadingMore, setLoadingMore] = useState(false); //Para o botao 'carregar mais'
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [showPostModal, setShowPostModal] = useState(false); //Para a funcao do botao Search
  const [detail, setDetail] = useState(); //Para a funcao do botao Search


  useEffect(() => {

    // Chamando a fucao fora do useEffect pra fica disponivel pra qualquer outra funcionalidade
    async function loadChamados() {
      await listRef.limit(5) // O limit serve para limitar a quantidade que aparece na lista, nesse caso limitando em 05
        .get()
        .then((snapshot) => { //O snapshot é o nome dado ao que se recebe na solicitacao Get do servidor
          updateState(snapshot);
        })

        .catch((err) => {
          console.log('Ops, deu algum erro.', err);
          setLoadingMore(false);
        })

      setLoading(false);
    }

    loadChamados();
  }, []);


  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      snapshot.forEach((doc) => {
        //Coloca agora o que vc quer dentro da lista
        lista.push({
          id: doc.id,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          assunto: doc.data().assunto,
          status: doc.data().status,
          complemento: doc.data().complemento,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy')
        })
      })

      const lastDoc = snapshot.docs[snapshot.docs.length - 1]; //Pegando o ultimo documento buscado
      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);

    } else
      setIsEmpty(true);

    setLoadingMore(false);
  }

  // Botao Buscar Mais
  async function handleMore() {
    setLoadingMore(true);

    await listRef.startAfter(lastDocs).limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot);
      })
  }

  // Botao Search
  function togglePostModal(item) {
    setShowPostModal(!showPostModal); //trocando o valor boolean
    setDetail(item);
  }


  // Renderizacao condicional para carregando chamados...
  if (loading) {
    return (
      <div>
        <Header />

        <div className="content">
          <Title name="Chamados">
            <FiMessageSquare size={25} />
          </Title>
        </div>

        <div className="container dashboard">
          <span>Buscando chamados...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Chamados">
          <FiMessageSquare size={25} />
        </Title>

        {/*Verificacao se ja existe algum chamado */}
        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>

        ) : (
          <> {/*FRAGMENT: tag que serve para nao precisar ter nenhuma estilizacao */}
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table>
              {/* Cabecalho da tabela */}
              <thead>
                {/* Linha do cabecalho */}
                <tr>
                  {/* Colunas da tabela */}
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>

              {/* Corpo da tabela */}
              <tbody>
                {chamados.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* Dados da linha */}
                      <td data-label="Cliente">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="Status">
                        <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>{item.status}</span>
                      </td>
                      <td data-label="Cadastrado">{item.createdFormated}</td>
                      <td data-label="#">
                        <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => togglePostModal(item)} >
                          <FiSearch color="#FFF" size={17} />
                        </button>
                        <Link className="action" style={{ backgroundColor: '#F6a935' }} to={`/new/${item.id}`} >
                          <FiEdit2 color="#FFF" size={17} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Mensagem: Buscando dados... (ao clicar no botao Buscar mais) */}
            {/* {loadingMore && <h3 style={{ textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>} */}

            {/* Botao loadMore - So vai aparecer se obedecer a condicional abaixo */}
            {!isEmpty &&
              <button className="btn-more" onClick={handleMore}>
                {loadingMore ? "Buscando dados..." : "Buscar mais"}
              </button>
            }
          </>
        )}
      </div>

      {/* Botao Search */}
      {showPostModal && (
        <Modal
          conteudo={detail}
          close={togglePostModal}
        />
      )}
    </div>
  )
}