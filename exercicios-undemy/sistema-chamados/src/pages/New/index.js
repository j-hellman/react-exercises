
import './new.css'
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiEdit2 } from 'react-icons/fi'

export default function New() {
  return (
    <div>
      <Header />

      <div className='content'>
        {/* Titulo da Pagina */}
        <Title name='Novo Chamado'>
          <FiEdit2 size={25} />
        </Title>

        <div className='container'>
          <form className="form-profile">
            <label>Cliente:</label>
            <select>
              <option>Sujeito</option>
            </select>
            <label>Assunto</label>
            <select>
              <option>Suporte</option>
            </select>

            <label>Status</label>
            <p>
              <input type="radio" id="emAberto" name="status-cham" value="emAberto" />
              <label for="emAberto">Em aberto</label>

              <input type="radio" id="atendido" name="status-cham" value="atendido" />
              <label for="atendido">Atendido</label>

              <input type="radio" id="emProgresso" name="status-cham" value="emProgresso" />
              <label for="emProgresso">Em progresso</label>
            </p>

            <label>Complemento</label>
            <textarea>
              Digite um complemento aqui...
            </textarea>

            <button type="submit">Salvar</button>
          </form>
        </div>


      </div>
    </div>
  )
}