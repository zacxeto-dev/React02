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


const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/inicio" element={<Inicio/>} />
          <Route path="/laptop" element={<Laptop/>} />
          <Route path="/movil" element={<Movil/>} />
          <Route path="/nosotros" element={<Nosotros/>} />
          <Route path="/categorias/:cat" element={<Categorias/>} />
          <Route path="/motos" element={<Motos/>} />
          <Route path="*" element={<Error404/>} />
          <Route path="/detalle/:id/:titulo" element={<Detalle/>} />

          

        </Routes>
        <Footer/>
      </div>
    
    </BrowserRouter>
  )
}

export default App