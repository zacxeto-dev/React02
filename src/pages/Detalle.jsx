import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatCurrency } from "../util/funciones";

const API = "https://dummyjson.com/products/";

const Detalle = () => {
  const parametros = useParams();
  const [datos, setDatos] = useState([]); //datos: Almacena los productos recibidos de la API.
  const [loading, setLoading] = useState(true); //loading: Indica si la carga está en progreso (para mostrar un spinner).
  const [error, setError] = useState(null); //error: Guarda el mensaje de error si la petición falla.
  const navigate = useNavigate();
  const URI = API + parametros.id;

  const getDatos = async () => {
    try {
      const response = await fetch(URI);
      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }
      const data = await response.json();
      setDatos(data);
      // console.log("Mostrar Datos del API")
      // console.log(data)
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, []);
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando Productos...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al Cargar los Productos</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
        {/* Botón Volver */}
            <div className="d-flex justify-content-end mb-3">
                <button onClick={() => navigate(-1)} className="btn btn-secondary">
                    ← Volver
                </button>
            </div>
            
      <h4 className="text-center py-4">
        Detalle del Producto {parametros.titulo}
      </h4>
      <div className="row">
        <div className="col-md-4">
          <img src={datos.thumbnail} alt={datos.title} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <p className="fs-5">{datos.title}</p>
          <p>
            <b>Categoria: </b> {datos.category}
            <br />
            <b>Marca: </b>
            {datos.brand}
            <br />
            <b>Existencia: </b>
            {datos.stock}
          </p>
          <p>{datos.description}</p>
          <p className="fs-3 text-warning">
            <b>Precio: </b>
            {formatCurrency(datos.price)}$
          </p>
        </div>
      </div>

        <div className="row">
            {datos.reviews.map((item) => (
                <div className="col-md-6 mb-2">
                   <div className="card ">
                <p>Comentario: {item.comment}</p>
                <p>Puntuacion: {item.rating}</p>
                <p>Fecha: {item.date}</p>
                <p>Nombre del usuario: {item.reviewerName}</p>
                <p>Correo del usuario: {item.reviewerEmail}</p>
                
            </div> 
                </div>
            
        ))}
        </div>
        

    </div>
  );
};

export default Detalle;
