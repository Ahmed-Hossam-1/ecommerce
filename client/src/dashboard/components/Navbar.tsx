import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-background h-[75px] flex justify-between items-center px-6 shadow-lg">
      <form className="relative">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          className="border border-gray-300 rounded-full w-[300px] py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Search..."
        />
      </form>

      <div className="relative" ref={dropdownRef}>
        <FontAwesomeIcon
          icon={faUser}
          className="text-gray-500 text-xl cursor-pointer hover:text-blue-500 transition duration-200"
          onClick={toggleDropdown}
        />

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Profile
            </Link>
            <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Settings
            </Link>
            <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
