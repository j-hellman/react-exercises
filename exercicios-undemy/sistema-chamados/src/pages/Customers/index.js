
import './customers.css';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Customers() {
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cadastrando, setCadastrando] = useState(false);

  function handleAdd(e) {
    e.preventDefault();

    //Inputs nomeFantasia, cnpj, endereco
    const fnomeFant = document.getElementById('fnomeFant');
    const fcnpj = document.getElementById('fcnpj');
    const fendereco = document.getElementById('fendereco');

    //Checagem dos inputs
    if (nomeFantasia == '' && cnpj == '' && endereco == '') {
      toast.warn('Favor preencher os campos corretamente');
      fnomeFant.focus(); //Cursor do mouse
    } else if (nomeFantasia == '') {
      toast.warn('Favor preencher o campo Nome Fantasia');
      fnomeFant.focus();
    } else if (cnpj == '') {
      toast.warn('Favor preencher o campo CNPJ');
      fcnpj.focus();
    } else if (endereco == '') {
      toast.warn('Favor preencher o campo Endereço');
      fendereco.focus();
    } else 
      addCustomer(nomeFantasia, cnpj, endereco);
    
    //Cadastro cliente no Firestore
    async function addCustomer(nomeFantasia, cnpj, endereco) {
      setCadastrando(true);
      await firebase.firestore().collection('customers')
      .add({ //Vai adicionar um customer com ID aleatorio
        nomeFantasia: nomeFantasia,
        cnpj: cnpj,
        endereco: endereco
      })
      .then(() => {
        setNomeFantasia('');
        setCnpj('');
        setEndereco('');
        fnomeFant.focus();
        toast.info('Empresa cadastrada com sucesso.');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao cadastrar essa empresa.');
      })
      setCadastrando(false);
    }
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Clientes">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
            <label>Nome Fantasia</label>
            <input type="text" id="fnomeFant" placeholder="Nome da sua empresa" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />

            <label>CNPJ</label>
            <input type="text" id="fcnpj" placeholder="Seu CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

            <label>Endereço</label>
            <input type="text" id="fendereco" placeholder="Endereço da empresa" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

            <button type="submit">{cadastrando ? 'Cadastrando...' : 'Cadastrar'}</button>
          </form>
        </div>

      </div>
    </div>
  )
}