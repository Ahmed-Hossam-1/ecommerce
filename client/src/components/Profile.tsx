import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Profile = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  const cookie = new Cookies();
  const { pathname } = useLocation();
  const nav = useNavigate();

  const handleLogout = () => {
    cookie.remove('token');
    cookie.remove('role');
    nav('/signin');
  };

  return (
    <div className="relative cursor-pointer" ref={dropdownRef}>
      <FontAwesomeIcon icon={faUser} className="text-gray-700" onClick={toggleDropdown} />

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Profile
          </Link>
          {cookie.get('role') == 'admin' && (
            <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              {pathname == '/admin_page' ? 'Go WebSite' : 'Go Dashboard'}
            </Link>
          )}
          <div onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
