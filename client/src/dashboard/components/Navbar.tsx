import { Link } from "react-router-dom";
import Profile from "../../components/Profile";
import Notification from "./Notification";

const Navbar = () => {
  return (
    <nav className="bg-background h-[75px] flex justify-between items-center px-10 shadow-lg">
      {/* Logo */}
      <Link
        to="/admin_page"
        className="flex justify-center items-center bg-gray-300 rounded-full h-fit p-2"
      >
        <img src="/images/header-logo.png" className="w-[70px]" alt="logo" />
      </Link>

      <div className="flex items-center justify-center gap-6">
        <Notification />
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
