import React from 'react'
import Routes from './routes'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <div>
      Testando
      <Routes />
      <ToastContainer autoClose={2500} />
    </div>
  )
}