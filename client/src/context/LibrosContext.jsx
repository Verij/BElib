import { createContext, useContext, useState } from "react";
import { createLibroRequest, deleteLibrosRequest, getLibroRequest, getLibrosRequest, updateLibroRequest } from "../api/libros";

const LibroContext = createContext();


export const useLibros = () => {
  const context = useContext(LibroContext);
  if(!context){
    throw new Error("use Libros debe usarse dentro de un proveedor")
  }
  return context;
}

export function LibroProvider ({ children }) {

  const [errors, setErrors] = useState([]);
  const [libros, setLibros] = useState([]);

  const getLibros = async () => {
    try {
          const res = await getLibrosRequest();
    setLibros(res.data)
    } catch (error) {
      console.error(error);
    }

  };

  //funcion para obtener libro especifico, y poder editarlo por ejemplo con la funcion updateLibro luego
  const getLibro = async (id) => {
    try {
          const res = await getLibroRequest(id);
    return res.data
    } catch (error) {
      console.error(error);
    }

  };

  const updateLibro = async (id, libro) => {
    try {
      await updateLibroRequest(id, libro);
    } catch (error) {
      console.error(error);
    }

  };

  const createLibro = async (libro) => {
    try {
    const res = await createLibroRequest(libro);
    console.log(res);
    } catch (error) {

        console.log(error.response);
  setErrors(error.response.data);
    }
    

  };

  //funcion para eliminar libro, y que se actualice automaticamente la interfaz
  const deleteLibro = async (id) => {
    try {
      const res = await deleteLibrosRequest(id);
      if (res.status === 204) setLibros(libros.filter(libro => libro._id != id))
    } catch (error) {
      console.log(error);
    }
  };


  return(
    <LibroContext.Provider value={{libros, createLibro, getLibros, getLibro, updateLibro, deleteLibro, errors}}>
      {children}
    </LibroContext.Provider>
  )
}