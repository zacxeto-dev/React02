import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Inicio from "./pages/Inicio"
import Laptop from "./pages/Laptop"
import Movil from "./pages/Movil"
import Nosotros from "./pages/Nosotros"
import Error404 from "./pages/Error404"
import Motos from "./pages/Motos"
import Detalle from "./pages/Detalle"
import Categorias from "./pages/Categorias"
import Busquedas from "./pages/Busquedas"
import { useState } from "react"


const App = () => {

  // creado el carrito
  const [carrito, setCarrito] = useState([]);

  // Esta función agrega un producto al carrito de compras.
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => { 
      // Ver si ya existe en el carrito
      const existe = prev.find(item => item.id === producto.id); 
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ); 
      } else {
        // Agregar nuevo producto con cantidad 1
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // 🔹 Función para eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
       setCarrito(prev => prev.filter(item => item.id !== id));
  };

  // 🔹 Función para actualizar cantidad
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };


  // 🔹 Función para vaciar carrito
  const vaciarCarrito = () => {
    const confirmacion = window.confirm("¿Está seguro de que desea vaciar el carrito?");
    if (confirmacion) {
      setCarrito([]);
    }
  };

  // 🔹 Función para enviar el pedido
  const enviarPedido = () => {
    const confirmacion = window.confirm("¿Desea finalizar la compra?");
    if (!confirmacion) return; // Sale si cancela
    // Validar carrito vacío
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        products: carrito.map((item) => ({
          id: item.id,
          quantity: item.cantidad,
        })),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Pedido creado:", data);
        alert("✅ ¡Gracias por su compra!\nID del carrito: " + data.id);
        setCarrito([]); // Vaciar SOLO si fue exitoso
      })
      .catch((error) => {
        console.error("Error al procesar la compra:", error);
        alert("❌ Error al procesar la compra:\n" + error.message);
      });
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header carrito={carrito} agregarAlCarrito={agregarAlCarrito} eliminarDelCarrito={eliminarDelCarrito} vaciarCarrito={vaciarCarrito} enviarPedido={enviarPedido} actualizarCantidad={actualizarCantidad}/>
        <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/inicio" element={<Inicio/>} />
          <Route path="/laptop" element={<Laptop carrito={carrito} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/movil" element={<Movil carrito={carrito} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/nosotros" element={<Nosotros/>} />
          <Route path="/categorias/:cat" element={<Categorias carrito={carrito} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/motos" element={<Motos carrito={carrito} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/busquedas" element={<Busquedas carrito={carrito} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="*" element={<Error404/>} />
          <Route path="/detalle/:id/:titulo" element={<Detalle/>} />

          

        </Routes>
        <Footer/>
      </div>
    
    </BrowserRouter>
  )
}

export default App