
import './dashboard.css'
import { useState } from "react";
import Header from '../../components/Header';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiPlus } from 'react-icons/fi';

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);

  return(
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
          </>
        )}

      </div>
    </div>
  )
}