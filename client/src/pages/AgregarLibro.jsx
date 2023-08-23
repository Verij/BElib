import {useForm} from 'react-hook-form';
import { useLibros } from '../context/LibrosContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


function AgregarLibro() {

//el set value me va a poner los valores del libro en los campos al momento de editarlo
  const {register, handleSubmit, setValue} = useForm();
  const {createLibro, getLibro,  updateLibro} = useLibros();
  const navigate = useNavigate();
  //utilizare un useparams para obtener un objeto de los datos de la url, que va a ser la id para poder editar el libro
  const params = useParams();

  //cada vez que carga la aplicacion, me va a mostrar el objeto con el libro
  useEffect(()=>{
    async function cargarLibro(){
    if(params.id) {
      const libro = await getLibro(params.id);
      console.log(libro);
      setValue('titulo', libro.titulo);
      setValue('genero', libro.genero);
    }
    }
    cargarLibro();

  }, []);



  //crea el libro una vez hecho el submit y te manda a tus libros
  const onSubmit = handleSubmit((data) => {
    if(params.id){
      updateLibro(params.id, data)
    } else { 
      createLibro(data);
      }
      navigate('/libros');
  });



  return (
    <div className="bg-zing-800 max-w-md w-full p-12 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="titulo">Título</label>
        <input type ="text" placeholder="Title"
        {...register("titulo")}
        className="w-full bg-zinc-600 text-white px-5 py-3 rounded-md"
        />
        <label htmlFor="genero">Genero</label>
        <input placeholder="genero"
        {...register("genero")}
        className="w-full bg-zinc-600 text-white px-5 py-3 m-1 rounded-md"
        />

        <label htmlFor="fecha">Fecha</label>
        <input className="w-full bg-zinc-600 text-white px-5 py-3 m-1 rounded-md"
        type="date" {...register('date')}/>
          <button className='bg-indigo-500 p-2 rounded-md'>
            Agregar
          </button>
        </form>
    </div>
  )
}

export default AgregarLibro