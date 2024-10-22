import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode'

const RequireAuth = ({ allowedRoles }) => {
   const { auth } = useAuth();
   const location = useLocation();

   const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined

   const roles = decoded?.roles || []

   console.log("Auth role find: ", auth)

   const hasAccess = roles.some(role => allowedRoles?.includes(role));

   if (hasAccess) {
      return <Outlet />;
    }

    if (auth?.accessToken) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  
    return <Navigate to="/signin" state={{ from: location }} replace />;
}

export default RequireAuth;