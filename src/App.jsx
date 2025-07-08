import { useState, useContext } from 'react'

import './App.css'

import { Card, Button, Navbar, Container, Nav, DropdownButton, Dropdown  } from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom";

import { LanguageContext, LanguageProvider, traducciones } from './context/LanguageContext.jsx'
import { ThemeContext, ThemeProvider, modos } from './context/ThemeContext.jsx'




function App() {


  const estiloNavbar = {
    backgroundColor: '#f8f9fa',
    paddingLeft: '50px',
    paddingRight: '50px',
    borderBottom: '5px solid #dee2e6'
  };

  const {getTranslation, setNewLanguage, getLanguage} = useContext(LanguageContext);
  const {getModo, setNewTheme, getTheme} = useContext(ThemeContext);

  const estiloModo = {
    backgroundColor: getTheme() == 'light' ? '#f8f9fa' : '#000000',
    color: getTheme() == 'light' ? '#000000'  : '#f8f9fa',
    paddingLeft: '50px',
    paddingRight: '50px',
    borderBottom: '5px solid #dee2e6'
  };


  return (
    <>
      <Navbar style={estiloNavbar} expand="lg" className="bg-body-tertiary">
        <Container>
          <Link className="navbar-brand" to="/">{getTranslation("home")}</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {<Link className="nav-link" to="/recomendar">{getTranslation("rCourses")}</Link>}
              <Link className="nav-link" to="/cursos">{getTranslation("courseList")}</Link>
              <Link className="nav-link ms-3" to="/admin">{getTranslation("admin")}</Link>
              <Link className="nav-link ms-3" to="/perfil">{getTranslation("perfil")}</Link>
              <Link className="nav-link ms-3" to="/login">{getTranslation("login")}</Link>
            </Nav>
            <Nav className="justify-content-end">
              <DropdownButton variant={getTheme() == 'light' ? 'outline-dark':'dark'} id="dropdown-item-button" title={getTheme()}  >
                <Dropdown.Item  as="button" onClick={() => { setNewTheme('light') }}>light</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => { setNewTheme('dark')}}>dark</Dropdown.Item>
              </DropdownButton>
              <DropdownButton id="dropdown-item-button" title={(getLanguage())}> 
                <Dropdown.Item as="button" onClick={() => { setNewLanguage('es') }}>es</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => { setNewLanguage('en')}}>en</Dropdown.Item>
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br />
      <Container style={estiloModo} className={getTheme()}>
        <Outlet />
      </Container>


    </>
  )
}

export default App
