import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DarkmodeBTN from "../../components/DarkmodeBTN";
import HeaderSearch from "./HeaderSearch";
import Profile from "../../components/Profile";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/storeHooks";
import { useState } from "react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="fixed w-full z-50 bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center transition-all duration-300">
      {/* Logo */}
      <Link to="/">
        <img className="w-28 h-auto" src="/images/logo1.png" alt="logo" />
      </Link>

      {/* Toggle Button for Mobile Navigation */}
      <button
        className="lg:hidden text-gray-700 dark:text-gray-300"
        onClick={toggleNav}
      >
        <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} />
      </button>

      {/* Search */}
      <div className="hidden lg:block">
        <HeaderSearch />
      </div>

      {/* Navigation */}
      <div className="lg:flex items-center space-x-4 hidden">
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

      {/* mobile */}
      {isNavOpen && (
        <nav className="lg:hidden absolute top-[100px] left-0 w-full h-[250px] md:h-[150px] bg-white dark:bg-gray-800 flex flex-col items-center justify-center space-y-4">
          <HeaderSearch />
          <div className="flex items-center gap-5">
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
        </nav>
      )}
    </header>
  );
};

export default Header;
