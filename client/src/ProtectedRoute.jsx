import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext'


function ProtectedRoute() {
  //aca verificara si el user esta autorizado e ira a su respectiva pagina
  const {loading, isAuthenticated} = useAuth();

  //si no esta autenticado, lo redireccionara
  if (loading) return <h1>cargando</h1>
  if(!loading && !isAuthenticated) return <Navigate to='login' replace/>

  return <Outlet />;
}

export default ProtectedRoute