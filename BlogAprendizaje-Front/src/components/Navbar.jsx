import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  " id='navbar1'>      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/curso/TALLER">Taller</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/curso/TECNOLOGIA">Tecnología</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/curso/PRACTICA-SUPERVISADA">Práctica-Supervisada</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
