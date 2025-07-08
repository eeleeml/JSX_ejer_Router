import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Cursos from './Cursos.jsx'
import CursoDetalle from './CursoDetalle.jsx'
import NotFound from './NotFound.jsx'
import Admin from './Admin.jsx'
import Perfil from './Perfil.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import Recomendar from './Recomendar.jsx'

import { LanguageContext, LanguageProvider, traducciones } from './context/LanguageContext.jsx'
import { ThemeContext, ThemeProvider, modos } from './context/ThemeContext.jsx'
import { UserContext, UserProvider } from './context/UserContext.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
    <ThemeProvider>
    <UserProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="recomendar" element={<Recomendar />} />
            <Route path="cursos" element={<Cursos />} />
            <Route path="cursos/:id" element={<CursoDetalle />} />
            <Route path="admin" element={<Admin />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </UserProvider>
    </ThemeProvider>
    </LanguageProvider>

    
  </StrictMode>,
)
