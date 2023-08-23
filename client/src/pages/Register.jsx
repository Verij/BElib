import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



function Register() {


  const {register, handleSubmit, formState:{
    errors
  }} = useForm();
  //traigo del context
  const {signUp, isAuthenticated, errors: errorAuth} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    //aca es para cuando este autenticado, me va a navegar a la ruta de libros
    if(isAuthenticated) navigate('/libros')
  },[isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signUp(values)
      });


  return (
    <div className="flex h-screen items-center justify-center">

    <div className="bg-zinc-900 max-w-md w-full p-6 rounded-md" >

      <h1 className="flex justify-center p-4 text-3xl ">Register</h1>

      {/* mapea los errores y me los muestra */}
      {/* Esta validacion esta hecha desde el backend en la carpeta de schemas. Verifica cosas como la longitud del nombre, del email, etc */}
      {errorAuth.map((error, i) => (
        <p className="bg-yellow-200 text-black" key={i}>{error}</p>
      ))}
      {/* Aca en el submit manda los datos del usuario y los traslada a un POST con axios para que tome el endpoint en el backend. Es decir, esta haciendo lo mismo que se hace en postman por ejemplo pero desde un form desde mi pagina */}
      <form className='flex flex-col justify-center py-10 px-20 gap-4' onSubmit={onSubmit}>

        <input type="text" {...register("username", {required: true})} 
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"
        placeholder="Username"/>
        {/* aca es para verificar si el nombre del usuario existe, que te pida nombre, etc en un cartelito rojo*/}
        {
          errors.username && <p className="bg-red-500">Se requiere nombre de usuario</p>
        }
        <input type="email" {...register("email", {required: true})} 
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2" placeholder="Email"/>


        {
          errors.email && <p className="bg-red-500">Se requiere email de usuario</p>
        }

        
        <input type="password" {...register("password", {required: true})} 

        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2" placeholder="Password"/>

        {
          errors.password && <p className="bg-red-500">Se requiere nombre de usuario</p>
        }

        <div className="flex justify-center">
        <button className='border-2 border-[#8FBC8B] rounded-lg p-1 hover:bg-[#8FBC8B] hover:border-zinc-700 hover:text-black w-2/3' type="submit">
          Log in
        </button>
        </div>
      </form>
            <p className="w-full text-center my-3">¿Ya tenés cuenta? <Link to="/login" className="text-blue-300">Sign in</Link></p>
    </div>
    </div>
  )
}

export default Register