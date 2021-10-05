// URL completa https://sujeitoprogramador.com/r-api/?api=filmes
// Base URL > https://sujeitoprogramador.com
// Rota > /r-api/?api=filmes ( traz todos os filmes )

import axios from 'axios';  //axios: biblioteca que facilita realizar requisições API

const api = axios.create({
  baseURL: 'https://sujeitoprogramador.com'
});

export default api;