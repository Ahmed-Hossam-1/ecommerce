import { Link } from "react-router-dom";
import Profile from "../../components/Profile";
import Notification from "./Notification";
import DarkmodeBTN from "../../components/DarkmodeBTN";
import { useCurrentUserQuery } from "../../features/users/api/userSlice";

const Navbar = () => {
  const { data: currentUser } = useCurrentUserQuery();
  return (
    <nav className="bg-mainBackground h-[75px] flex justify-between items-center px-10 dark:bg-secbgDark800">
      {/* Logo */}
      <Link
        to={
          currentUser?.user?.role == "admin"
            ? "/admin_page"
            : "/admin_page/products"
        }
      >
        <img src="/images/logo1.png" className="w-20" alt="logo" />
      </Link>

      <div className="flex items-center justify-center gap-6">
        <DarkmodeBTN />
        <Notification />
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
