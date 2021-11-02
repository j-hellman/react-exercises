
import './new.css'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi'

export default function New() {
  const [customers, setCustomers] = useState([]); //Array para a lista de customers baixada do servidor
  const [loadCustomers, setLoadCustomers] = useState(true); //Loading para enquanto carrega lista customers
  const [customerSelected, setCustomerSelected] = useState(0); //Para registrar a escolha do usuario na lista de customers
  const [assunto, setAssunto] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [complemento, setComplemento] = useState('');

  const { user } = useContext(AuthContext);

  // Vai carregar toda hora que abrir a pagina Novo Chamado
  useEffect(() => {
    async function loadCustomers() {
      await firebase.firestore().collection('customers')
        .get()
        .then((snapshot) => { 
          //O snapshot é o nome dado ao que se recebe na solicitacao Get do servidor
          let lista = [];

          snapshot.forEach((doc) => {
            //Coloca agora o que vc quer dentro da lista
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia
            })

            // Verificacao para ver se tem algum cliente cadastrado ou nao
            if (lista.length === 0) {
              console.log('Nenhum cliente cadastrado');
              setCustomers([{id:'1', nomeFantasia: 'CLIENTE LOJA'}]) //Cliente ficticio
              setLoadCustomers(false);
              return; //Para nao deixar ir para baixo
            }

            setCustomers(lista);
            setLoadCustomers(false);
          });

        })
        .catch((error) => {
          console.log('Deu algum erro!', error);
          setCustomers([{id: '1', nomeFantasia: ''}]) //Cliente ficticio. Passa manualmente para nao dar algum tipo de erro no app, pois pode dar algum bug
          setLoadCustomers(false);
        })

    }

    loadCustomers();

  }, []);

  function handleRegister(e) {
    e.preventDefault();
  }

  //Chama quando troca a opcao Assunto
  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }

  //Chama quando troca a opcao de Status
  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  //Chama quando troca a opcao Cliente
  function handleChangeCustomers(e) {
    setCustomerSelected(e.target.value);
  }

  return (
    <div>
      <Header />

      <div className='content'>
        {/* Titulo da Pagina */}
        <Title name='Novo Chamado'>
          <FiPlusCircle size={25} />
        </Title>

        <div className='container'>
          <form className="form-profile" onSubmit={handleRegister}>

            <label>Cliente</label>
            <select value={customerSelected} onChange={handleChangeCustomers}>
              {/* As opcoes serao preenchidas de acordo com a lista baixada do servidor */}
              {customers.map((item, index) => {
                return(
                  <option key={item.id} value={index}> 
                    {item.nomeFantasia}
                  </option>
                )
              })}
            </select>

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input type="radio" id="Aberto" name="status-cham" value="Aberto" onChange={handleOptionChange} checked={status === 'Aberto'} />
              <label for="Aberto">Em aberto</label>

              <input type="radio" id="Progresso" name="status-cham" value="Progresso" onChange={handleOptionChange} checked={status === 'Progresso'} />
              <label for="Progresso">Em progresso</label>

              <input type="radio" id="Atendido" name="status-cham" value="Atendido" onChange={handleOptionChange} checked={status === 'Atendido'} />
              <label for="Atendido">Atendido</label>
            </div>

            <label>Complemento</label>
            {/* Ja passa o Value direto para a useState complemento, sem precisar de uma funcao pois nao tem outras opcoes, somente o complemento msm */}
            <textarea type="text" placeholder="Adicione um complemento (opcional)..." value={complemento} onChange={(e) => setComplemento(e.target.value)} />

            {/* Botao Salvar */}
            <button type="submit">Salvar</button>
          </form>
        </div>


      </div>
    </div>
  )
}