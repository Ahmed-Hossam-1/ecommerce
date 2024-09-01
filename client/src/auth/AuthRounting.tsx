import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/returnCookie";
import { useCurrentUserQuery } from "../features/users/api/userSlice";

const AuthRounting = ({ allowedRole }: { allowedRole: string[] }) => {
  const { data: currentUser } = useCurrentUserQuery();

  return isLoggedIn() ? (
    allowedRole.includes(currentUser?.user?.role) ? (
      <Outlet />
    ) : (
      <h1>Access Denied</h1>
    )
  ) : (
    <Navigate to="/signin" replace={true} />
  );
};

export default AuthRounting;
