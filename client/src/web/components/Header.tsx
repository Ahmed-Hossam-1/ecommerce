import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import ChangeLang from '../../components/ChangeLang';
import DarkmodeBTN from '../../components/DarkmodeBTN';

const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!isNavOpen);
  const navRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md flex flex-col sm:flex-row justify-between items-center p-4">
      <div className="flex justify-between items-center w-full">
        <img className="w-[150px] h-auto" src="/images/header-logo.png" alt="logo" />
        <button
          className="sm:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100 transition duration-200"
          onClick={toggleNav}
        >
          <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} />
        </button>
      </div>

      <div
        ref={navRef}
        className={`fixed top-[75px] left-0 w-full bg-white sm:static sm:flex sm:flex-row sm:items-center sm:w-auto transition-transform transform ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
      >
        <form className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 p-4 sm:p-0 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <select className=" bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-md py-2 px-4 w-full sm:w-48">
              <option className="border-none bg-yellow-200">Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <input
            className="border border-gray-300 rounded-r-md px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[350px]"
            type="text"
            placeholder="Search..."
          />
        </form>

        <div className="flex justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 p-4 sm:p-0">
          <ChangeLang />
          <DarkmodeBTN />
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition duration-200">
            <FontAwesomeIcon icon={faCartShopping} className="text-gray-700" />
          </div>
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition duration-200">
            <FontAwesomeIcon icon={faUser} className="text-gray-700" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
