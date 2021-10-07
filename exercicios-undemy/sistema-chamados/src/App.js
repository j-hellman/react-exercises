import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
      <ToastContainer autoClose={2500} />
    </BrowserRouter>
  )
}