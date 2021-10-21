
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiHome } from 'react-icons/fi';

export default function Dashboard() {

  return(
    <div>
      <Header />
      
      <div className="content">
        <Title name="Chamados">
          <FiHome size={25} />
        </Title>
      </div>

    </div>
  )
}