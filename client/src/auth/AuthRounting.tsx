import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/returnCookie";
import { useCurrentUserQuery } from "../features/users/api/userSlice";

const AuthRounting = ({ allowedRole }: { allowedRole: string }) => {
  const { data: currentUser } = useCurrentUserQuery();

  // if (isLoading) return <h1>Loading...</h1>;
  // if (isError) return <h1>Error</h1>;
  console.log(currentUser);

  return isLoggedIn() ? (
    allowedRole == currentUser?.user?.role ? (
      <Outlet />
    ) : (
      <h1>Access Denied</h1>
    )
  ) : (
    <Navigate to="/signin" replace={true} />
  );
};

export default AuthRounting;
