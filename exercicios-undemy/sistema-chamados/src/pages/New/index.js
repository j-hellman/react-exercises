
import './new.css'
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi'

export default function New() {

  function handleRegister(e) {
    e.preventDefault();
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
            <select>
              <option key={1} value={1}>
                Sujeito
              </option>
            </select>

            <label>Assunto</label>
            <select>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input type="radio" id="emAberto" name="status-cham" value="emAberto" checked/>
              <label for="emAberto">Em aberto</label>

              <input type="radio" id="emProgresso" name="status-cham" value="emProgresso" />
              <label for="emProgresso">Em progresso</label>

              <input type="radio" id="atendido" name="status-cham" value="atendido" />
              <label for="atendido">Atendido</label>
            </div>

            <label>Complemento</label>
            <textarea type="text" placeholder="Adicione um complemento (opcional)..." />

            {/* Botao Salvar */}
            <button type="submit">Salvar</button>
          </form>
        </div>


      </div>
    </div>
  )
}