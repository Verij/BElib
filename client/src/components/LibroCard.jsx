import React from 'react'
import { useLibros } from '../context/LibrosContext'
import { Link } from 'react-router-dom';

export const LibroCard = ({libro}) => {


  const {deleteLibro} = useLibros();

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md border-slate-100 border-2'>
      <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>{libro.titulo}</h1>
            <div className='flex g flex-col border-2'>
              <button className='bg-rose-700' onClick={() => {deleteLibro(libro._id)}}>Quitar libro</button>
{/* Utilizare un link para reutilizar el formulario de crear libro pero para editar */}
              <Link to={`/libros/${libro._id}`} className='bg-indigo-400 text-center'>Editar</Link>
            </div>
      </div>
          <p className='text-slate-300'>{libro.genero}</p>
          <p>Libro creado en el dia {new Date(libro.lanzamiento).toLocaleDateString()}</p>
    </div>
  )
}
