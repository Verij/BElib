import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LibroProvider } from "./context/LibrosContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Libros from "./pages/Libros";
import AgregarLibro from "./pages/agregarLibro";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";




function App() {
  return (
    <AuthProvider>
      <LibroProvider>
        <BrowserRouter>
        <main className="container mx-auto px-10">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>

    {/* hago las rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path='/libros' element={<Libros />}/>
          <Route path='/agregar-libro' element={<AgregarLibro />}/>
        <Route path='/libros/:id' element={<AgregarLibro />}/>
        </Route>
    </Routes>
    </main>
    </BrowserRouter>
      </LibroProvider>
    </AuthProvider>
  );
}

export default App