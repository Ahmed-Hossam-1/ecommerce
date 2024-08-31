import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import DarkmodeBTN from "../../components/DarkmodeBTN";
import HeaderSearch from "./HeaderSearch";
import Profile from "../../components/Profile";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/storeHooks";

const Header = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  return (
    <header className="fixed w-full z-50 bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center transition-all duration-300">
      {/* Logo */}
      <Link to="/">
        <img className="w-36 h-auto" src="/images/header-logo.png" alt="logo" />
      </Link>

      {/* Search */}
      <HeaderSearch />

      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <DarkmodeBTN />
        <Link to="/cart" className="relative">
          {cartItems?.length > 0 && (
            <span className="absolute -top-4 -right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-gray-700 dark:text-gray-300"
          />
        </Link>
        <Profile />
      </div>
    </header>
  );
};

export default Header;
