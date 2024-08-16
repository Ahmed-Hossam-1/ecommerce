import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';

const HeaderSearch = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Choose Category');
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleOptionSelect = (option: string) => {
    setSelectedCategory(option);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const handleSearch = () => {
    console.log(`Searching for "${searchTerm}" in category "${selectedCategory}"`);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 p-4 sm:p-0 w-full sm:w-auto">
      <div ref={dropdownRef} className="relative w-full sm:w-48">
        <button
          onClick={toggleDropdown}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md py-2 px-4 w-full flex items-center justify-between"
        >
          {selectedCategory}
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <button
              onClick={() => handleOptionSelect('Category 1')}
              className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none text-left"
            >
              Category 1
            </button>
            <button
              onClick={() => handleOptionSelect('Category 2')}
              className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none text-left"
            >
              Category 2
            </button>
            <button
              onClick={() => handleOptionSelect('Category 3')}
              className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none text-left"
            >
              Category 3
            </button>
          </div>
        )}
      </div>
      <input
        className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[350px]"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') handleSearch();
        }}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default HeaderSearch;
