
import './header.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png'; //Importa a imagem padrao avatar
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'; //Importa os icones

export default function Header() {
  const { user } = useContext(AuthContext); //Disponibiliza a variavel User 

  return (
    <div className="sidebar">
      <div>
        {/* Imagem Avatar */}
        <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto avatar" />
      </div>
      
      <Link to="/dashboard">
        <FiHome color="#FFF"size={24} /> {/*Usando icones*/}
        Chamados
      </Link>
      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        Clientes
      </Link>
      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        Configurações
      </Link>
    </div>
  )
}