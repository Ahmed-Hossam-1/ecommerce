import { Link } from "react-router-dom";
import Profile from "../../components/Profile";
import Notification from "./Notification";
import DarkmodeBTN from "../../components/DarkmodeBTN";

const Navbar = () => {
  return (
    <nav className="bg-mainBackground h-[75px] flex justify-between items-center px-10 dark:bg-secbgDark800">
      {/* Logo */}
      <Link to="/admin_page">
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
