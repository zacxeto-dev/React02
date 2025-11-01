import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <a className="navbar-brand" href="#">NVIDIA</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5 p-3">
            <li className="nav-item">
            <Link to={"/inicio"} className="nav-link active" aria-current="page" href="#">Inicio</Link>
            </li>
            <li className="nav-item">
            <Link to={"/movil"} className="nav-link" href="#">Movil</Link>
            </li>
            <li className="nav-item">
            <Link to={"/laptop"} className="nav-link" href="#">Laptop</Link>
            </li>
            <li className="nav-item">
            <Link to={"/motos"} className="nav-link" href="#">Motos</Link>
            </li>
            
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
            </li>
            <li className="nav-item">
            <Link to={"/nosotros"} className="nav-link" href="#">Nosotros</Link>
            </li>
        </ul>
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
        </div>
    </div>
    </nav>

  )
}

export default Header