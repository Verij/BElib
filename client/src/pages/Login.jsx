import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom';
import { useEffect } from "react";


function Login() {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signIn, errors: signinErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();
  
  const onSubmit = handleSubmit((data) => {
    signIn(data);
  })
//una vez que te logeas, te manda directo a tus libros verificando previamente la autenticacion
  useEffect(() => {
    if (isAuthenticated) navigate ('/libros');
  },[isAuthenticated]);
  return (
    <div className="flex h-screen items-center justify-center">

      <div className="bg-zinc-900 max-w-md w-full p-6 rounded-md">

      <h1 className="flex justify-center p-4 text-3xl ">Login</h1>

              {/* mapea los errores y me los muestra */}
          {signinErrors.map((error, i) => (
        <p className="bg-yellow-200 text-black text-center my-2" key={i}>{error}</p>
      ))}
      <form onSubmit={onSubmit} className="flex flex-col justify-center" >


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
      <p className="w-full text-center my-3">¿No tenes cuenta? <Link to="/register" className="text-blue-300">Click acá</Link></p>
      </div>
      </div>
  )
}

export default Login