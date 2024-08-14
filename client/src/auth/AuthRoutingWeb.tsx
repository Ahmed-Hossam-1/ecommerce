import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../utils/returnCookie';

const AuthRoutingWeb = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/signin" replace={true} />;
};

export default AuthRoutingWeb;
