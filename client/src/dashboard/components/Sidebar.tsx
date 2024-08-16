import { FC } from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinksSidebar } from './Links';
import { Link } from 'react-router-dom';

interface Tprops {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<Tprops> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed h-[100vh] flex flex-col items-center pt-5 bg-background transition-all duration-300 ${
        isSidebarOpen ? 'w-[18%]' : 'w-[5%]'
      }`}
    >
      {/* Logo */}
      <Link
        to="/admin_page"
        className={`flex justify-center items-center bg-gray-300 rounded-full h-fit py-2 mb-10
          ${isSidebarOpen ? 'px-4 w-[100px] h-[100px]' : 'px-2 w-[50px] h-[50px]'}`}
      >
        <img src="/images/header-logo.png" className="w-[80px]" alt="logo" />
      </Link>
      {/* Links */}
      <div className="flex flex-col items-center space-y-8">
        {LinksSidebar.map((link, index) => (
          <Link
            to={link.link}
            key={index}
            className={`h-fit py-2 bg-white flex justify-center items-center rounded-lg transition-all duration-300 ${
              isSidebarOpen ? 'px-4 w-[200px]' : 'px-4 w-fit'
            }`}
          >
            <FontAwesomeIcon className="text-[13px]" icon={link.icon} />
            {isSidebarOpen && <span className="ml-2">{link.title}</span>}
          </Link>
        ))}
      </div>
      {/* Toggle Button */}
      <div
        className="flex items-center justify-center w-[40px] mt-10 h-[40px] bg-white rounded-full cursor-pointer"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} />
      </div>
    </aside>
  );
};

export default Sidebar;
