import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import AuthProvider from './contexts/auth';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
        <ToastContainer autoClose={2500} />
      </BrowserRouter>
    </AuthProvider>
  )
}

//O BrowserRouter informa para a aplicacao que a partir de onde ele é chamado teremos um roteamento de componentes
//O AuthProvider vai envolver todo o sistema para disponibilizar as informacoes de forma global, ou seja, em qualquer ponto do site pode ter acesso as info do usuario, nome etc