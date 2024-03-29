import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

//
import App from './App'
import './i18n'
import './index.css'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_HOST

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
