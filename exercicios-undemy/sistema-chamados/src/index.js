import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

ReactDOM.render(  
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

  //ReactDOM => É o encarregado de fazer o meio de campo entre o JSX e o HTML da pagina
  //funcao Render => Só recebe um componente por vez (nesse caso o App), ou uma array de componentes. 
  // Mas no caso de array para o Render() teriamos que inserir IF's no codigo, o que complicaria demais.
  // Para facilitar isso, foi criada uma biblioteca React-router, justamente para gerenciar o render() 

