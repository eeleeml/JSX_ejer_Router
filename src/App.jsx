import { useState } from 'react'

import './App.css'

import { Card, Button, Navbar, Container, Nav } from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom";


function App() {

  const estiloNavbar = {
    backgroundColor: '#f8f9fa',
    paddingLeft: '50px',
    paddingRight: '50px',
    borderBottom: '5px solid #dee2e6'
  };

  return (
    <>
      <Navbar style={estiloNavbar} expand="lg" className="bg-body-tertiary">
        <Container>
          <Link className="navbar-brand" to="/">Academia online</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/cursos">Cursos</Link>
              <Link className="nav-link ms-3" to="/admin">Admin</Link>
              <Link className="nav-link ms-3" to="/login">Login</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br />
      <Container>
        <Outlet />
      </Container>


    </>
  )
}

export default App
