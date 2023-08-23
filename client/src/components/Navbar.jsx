import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function Navbar() {

  //si ya esta logeado (es decir autenticado), no se va a ver el login y register para que parezca mas limpio
  const { isAuthenticated, logOut, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between items-center p-5 px-10 rounded-lg xl:flex-row md:flex-col sm:flex-col sm:gap-8 max-sm:flex-col max-sm:p-10">
      <div className='border-r-4 py-6 max-xl:border-b-4 max-xl:border-r-0 max-xl:my-6 max-xl:py-1'><Link to='/'>
          <h3 className='text-5xl px-2'>
              <span className='text-orange-600'>Hoja</span>Lib
          </h3>
          </Link></div>
      <div><h1 className='text-4xl xl:block max-sm:hidden '>Bienvenido a tu catalogo de libros</h1></div>
      <div className='flex flex-col justify-between h-36 w-80'>
      <div className='flex flex-col gap-5'>
      {/* si esta autenticado, que lo mande a libros. Podria hacerlo sin el autenticated solo poniendo /libros pero prefiero que lo corrobore por las dudas */}

    <ul className="flex gap-x-2 justify-between px-2 py-1">
      {isAuthenticated ? (
        <>


      <li>
        Bienvenido <span className='bg-[#8FBC8B] rounded-lg px-2 text-center' >{user.username}</span>
      </li>

      <li className='border-2 border-[#8FBC8B] rounded-lg p-1 hover:bg-[#8FBC8B] hover:border-none hover:text-black'><Link to='/' onClick={() => {logOut()}}>Cerrar sesión</Link></li>
        </>
      ) : (
        <>
      <li className='border-2 border-[#8FBC8B] rounded-lg p-1 hover:bg-[#8FBC8B] hover:border-zinc-700 hover:text-black'>
        <Link to='login'>Login</Link>
      </li>
      <li className='border-2 border-[#8FBC8B] rounded-lg p-1 hover:bg-[#8FBC8B] hover:border-zinc-700 hover:text-black'>
        <Link to='register'>Register</Link>
      </li>
        </>
      )}

    </ul>

    </div>
    <div className='flex flex-col gap-1 w-240 '>
        <Link to='agregar-libro'> <h2 className="text-2xl text-center font-bold border-2 border-[#FFA41B] hover:bg-[#FFA41B] p-1 hover:border-zinc-700 mid-w-240">Agregar libro</h2></Link>
          <Link className="" to={
        isAuthenticated ? "/libros" : "/login"
      }>
        
      <h2 className="text-2xl text-center font-bold border-2 border-[#FFA41B] hover:border-zinc-700 hover:bg-[#FFA41B] p-1 ">Tus libros aca</h2>
      </Link>
      </div>
      </div>
    </nav>
  )
}

export default Navbar;