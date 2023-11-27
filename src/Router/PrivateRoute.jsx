import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth()
  const location = useLocation()

  if (loading){
    return <p className="text-center text-7xl text-one font-bold pt-32">Loading</p>
  }
  if(user){
    return children;
  }
  return <Navigate state={location.pathname} to={'/login'} replace></Navigate>;
};

export default PrivateRoute;

// change the path name of loading image
// change the src of img tag
// change the path of to in the Navigate tag
// change the use context if you use custom hook