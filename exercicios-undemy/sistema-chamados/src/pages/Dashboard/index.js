
import './dashboard.css'
import { useState } from "react";
import Header from '../../components/Header';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiPlus } from 'react-icons/fi';

export default function Dashboard() {

  return(
    <div>
      <Header />
      
      <div className="content">
        <Title name="Chamados">
          <FiMessageSquare size={25} />
        </Title>

        <div className="container dashboard">
          <span>Nenhum chamado registrado...</span>
          <Link>
            <FiPlus size={25} />
            Novo chamado
          </Link>

        </div>



      </div>

    </div>
  )
}