import { createContext, useState, useContext, useEffect } from "react";
import { registerReq, loginReq, verifyTokenReq } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) {
    throw newError("useAuth must be used with an Authprovider")
  }
  return context;
};

export const AuthProvider = ({children}) => {


  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //cuando haya un error, se me cambia el state
  const [errors, setErrors] = useState([]);
  const[loading, setLoading] = useState(true);

  //funcion para el register
  const signUp = async (user) => {
try {
        const res = await registerReq(user);
        console.log(res.data);
        setUser(res.data)
        setIsAuthenticated(true);
} catch (error) {
  //aca va a entrar al message y me saca el mensaje de ahi que lo configure en el backend
  console.log(error.response);
  setErrors(error.response.data);
}
  }

  //funcion para el login

  const signIn = async (user) => {
  try {
    const res = await loginReq(user);
    console.log(res);
    setIsAuthenticated(true);
    //cuando logea, guarda los datos del usuario en el setUser
    setUser(res.data);
  } catch (error) {
    //creo un if para que solucionar el errror de map is not a function
    if (Array.isArray(error.response.data)){
      return setErrors(error.response.data);
    }
    setErrors([error.response.data.message])
  }
  }

  //funcion para cerrar sesion removiendo el token de las cookies y sacando las autenticaciones
  const logOut = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  }
//cuando cargue la aplicacion, consulta el backend y comprueba si hay una cookie
  useEffect(() => {
    async function checkLogin () {
      const cookies = Cookies.get()

    if (!cookies.token) {
      setIsAuthenticated(false);
      setLoading(false);
      return setUser(null);
    }
      try {
        const res = await verifyTokenReq(cookies.token);
        
        if(!res.data) {
        setIsAuthenticated(false)
        setLoading(false);
        setLoading(false);
        return;
        } 
        //si esta la data, que me haga la autenticacion y me setee el usuario
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        //si da un error, que me ponga los dos set de autenticacion y el usuario en false
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
      
    }
    
    checkLogin();
  }, [])

  return (
    <AuthContext.Provider value={{signUp, signIn, logOut, loading, user,isAuthenticated, errors}}>
      {children}
    </AuthContext.Provider>
  )
}