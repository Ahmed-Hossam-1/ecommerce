import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../utils/returnCookie';

const RequierBack = () => {
  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequierBack;
