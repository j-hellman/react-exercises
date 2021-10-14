import React from 'react';
import Routes from './routes';
import './App.css';
import { ToastContainer } from 'react-toastify'; //Biblioteca que serve para substituir o 'alert'
import 'react-toastify/dist/ReactToastify.css'; //CSS padrao do Toastify;

export default function App() {
  return (
    <div className="app">
      <Routes />
      <ToastContainer autoClose={6000} />
    </div>
  );
}