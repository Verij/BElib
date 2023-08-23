import { useEffect } from "react";
import { useLibros } from "../context/LibrosContext";
import { LibroCard } from "../components/LibroCard";

function Libros() {
  const {getLibros, libros} = useLibros();
  //que se ejecute apenas cargue el componente con un use effect
  useEffect(() =>{
    getLibros();
  }, []);
  //si no hay libros en la base del usuario que me devuelve un no hay libros
  if(libros.length == 0 ) return (<h1>no hay libros</h1>)
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {
      libros.map(libro => (
        <LibroCard libro={libro} key={libro._id} />
      ))
      }
      </div>
  )
}

export default Libros