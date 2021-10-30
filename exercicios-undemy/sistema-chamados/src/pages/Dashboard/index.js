
import './dashboard.css'
import { useState } from "react";
import Header from '../../components/Header';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';

export default function Dashboard() {
  const [chamados, setChamados] = useState([1]);

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
                <tr> {/* Linha do cabecalho */}
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
                <tr>
                  {/* Dados da linha */}
                  <td data-label="Cliente">Sujeito</td>
                  <td data-label="Assunto">Suporte</td>
                  <td data-label="Status">
                    <span className="badge" style={{backgroundColor:'#5cb85c'}}>Em aberto</span>
                  </td>
                  <td data-label="Cadastrado">29/10/2021</td>
                  <td data-label="#">
                    <button className="action" style={{backgroundColor: '#3583f6'}}>
                      <FiSearch color="#FFF" size={17} />
                    </button>
                    <button className="action" style={{backgroundColor: '#F6a935'}}>
                      <FiEdit2 color="#FFF" size={17} />
                    </button>
                  </td>
                </tr>
              </tbody>

            </table>
          </>
        )}

      </div>
    </div>
  )
}