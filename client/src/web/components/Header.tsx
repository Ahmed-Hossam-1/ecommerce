import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import DarkmodeBTN from "../../components/DarkmodeBTN";
import HeaderSearch from "./HeaderSearch";
import Profile from "../../components/Profile";

const Header = () => {
  // <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} />

  return (
    <header className="bg-white shadow-md p-4 flex justify-around">
      {/* logo */}
      <div>
        <img className="w-36 h-auto" src="/images/header-logo.png" alt="logo" />
      </div>
      {/* seacrh */}
      <HeaderSearch />
      {/* nav */}
      <div className="flex justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 p-4 sm:p-0">
        <DarkmodeBTN />
        <FontAwesomeIcon icon={faCartShopping} className="text-gray-700" />
        <Profile />
      </div>
    </header>
  );
};

export default Header;
