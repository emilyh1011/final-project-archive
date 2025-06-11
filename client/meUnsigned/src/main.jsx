import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//We are using react-router-dom for navigating between pages
//So delete the original <StrictMode> and switch to <BrowserRouter>
createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>,
)
