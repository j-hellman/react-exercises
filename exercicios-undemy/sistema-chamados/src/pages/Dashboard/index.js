
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiHome } from 'react-icons/fi';

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return(
    <div>
      <Header />
      
      <div className="content">
        <Title name="Chamados">
          <FiHome size={25} />
        </Title>

        <button onClick={() => signOut()}>Fazer Logout</button>
      </div>


    </div>
  )
}