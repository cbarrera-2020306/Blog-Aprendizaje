
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-text">
          Blog de Aprendizaje
        </span>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
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
            <Link className="nav-link" to="/curso/PRACTICA-SUPERVISADA">Práctica Supervisada</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
