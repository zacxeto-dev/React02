
import { Link, useNavigate } from 'react-router-dom'
import FiltroCategoria from './FiltroCategoria'
import { useEffect, useState } from 'react'
import { BsCartPlusFill } from "react-icons/bs";
import { formatCurrency, formatNumber } from '../util/funciones';


const Header = ({carrito, eliminarDelCarrito, vaciarCarrito, enviarPedido, actualizarCantidad}) => {

    const [total, setTotal] = useState(0);

    // Calcular total cada vez que cambia el carrito
    useEffect(() => {
        const suma = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
        setTotal(suma);
    }, [carrito]);
    const [txtBuscar, setTxtBuscar] = useState("")
    const manejoTxt = (e) => {
        setTxtBuscar(e.target.value)
    } 
    

const manejoEnvio = (event) => {
        event.preventDefault();
        if (!txtBuscar.trim()) {
            alert("Por favor, ingresa un término de búsqueda.");
            return;
        }
        navigate('/busquedas', {
             state: txtBuscar.trim(),
        });
        setTxtBuscar(''); // Opcional: limpiar el input después de enviar

    };

  return (
    <>
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
                Categorias
            </a>
            <ul className="dropdown-menu">
                <FiltroCategoria/>
            </ul>
            </li>
            <li className="nav-item">
            <Link to={"/nosotros"} className="nav-link" href="#">Nosotros</Link>
            </li>
        </ul>
        <form className="d-flex" role="search" onSubmit={manejoEnvio}>
            <input value={txtBuscar} onChange={manejoTxt} className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
        {carrito.length > 0 &&(
                        <button 
                            className="btn btn-outline-warning me-2" 
                            type="button" data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasRight" 
                            aria-controls="offcanvasRight">
                            <div className="d-flex justify-content-between align-items-center gap-2">
                                <BsCartPlusFill />  <span className="badge bg-danger m-1">{carrito.length}</span>
                            </div>
                        </button>
                    )}
        </div>
    </div>

    

    </nav>

    <div>
  
  <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
    </div>
    <div className="offcanvas-body">
      {carrito.length === 0 ? (
                    <p className="text-center">Tu carrito está vacío</p>
                ) : (
                    <>
                        {carrito.map((item, index) => (
                       
                            <div key={index} className='card mb-3'>
                                <div className='card-header p-0 text-center'>
                                    <img src={item.thumbnail} alt={item.title} className="img-fluid mb-2"  />
                                </div>
                                <div className='card-body text-center'>
                                    <p className='fs-4'><strong>{item.title}</strong></p> 
                                    <p className='text-warning fw-bold'>Precio: ${formatCurrency(item.price)} x {item.cantidad} = ${formatCurrency((item.price * item.cantidad).toFixed(2))}</p>
                                </div>
                                <div className='card-footer text-center'>
                                <div className="d-flex justify-content-center gap-3">
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                    >
                                        + Agregar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                    >
                                        - Restar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => eliminarDelCarrito(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                                </div>
                            </div>


                     
                           
                        ))}
                        <hr />
                        <div className="text-end">
                            <p><strong>Total Productos:</strong> {formatNumber(carrito.reduce((acc, item) => acc + item.cantidad, 0))}</p>
                            <p><strong>Total a Pagar:</strong> ${formatCurrency(total.toFixed(2))}</p>
                        </div>
                        <div className="mt-3">
                            <button
                                className="btn btn-danger w-100 mb-2"
                                onClick={vaciarCarrito}
                            >
                                Vaciar Carrito
                            </button>
                            <button onClick={enviarPedido} className="btn btn-primary w-100">
                            📤 Enviar Pedido
                            </button>
                        </div>
                    </>
                )}
    </div>
  </div>
  </div>


 </>
  )
}

export default Header 
          