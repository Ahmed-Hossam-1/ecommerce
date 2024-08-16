import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Profile from '../../components/Profile';

const Navbar = () => {
  return (
    <nav className="bg-background h-[75px] flex justify-between items-center px-10 shadow-lg">
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

      <Profile />
    </nav>
  );
};

export default Navbar;
