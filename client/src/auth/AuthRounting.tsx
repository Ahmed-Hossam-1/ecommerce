import { Navigate, Outlet } from 'react-router-dom';
import { getRole, isLoggedIn } from '../utils/returnCookie';

const AuthRounting = ({ allowedRole }: { allowedRole: string[] }) => {
  return isLoggedIn() ? (
    allowedRole.includes(getRole()) ? (
      <Outlet />
    ) : (
      <h1>Access Denied</h1>
    )
  ) : (
    <Navigate to="/signin" replace={true} />
  );
};

export default AuthRounting;
