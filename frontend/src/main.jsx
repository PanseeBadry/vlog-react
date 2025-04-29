import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { LoginProvider } from './assets/contexts/loginContext.jsx'
import { RegisterProvider } from './assets/contexts/registerContext.jsx'
import { AuthProvider } from './assets/contexts/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>

<LoginProvider>

  <RegisterProvider>
  <App />
  </RegisterProvider>
</LoginProvider>
</AuthProvider>



</BrowserRouter>
   
)
