/* eslint-disable @typescript-eslint/no-explicit-any */
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useSearchProductsMutation } from "../../features/product/api/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../features/category/api/categorySlice";

const HeaderSearch = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Choose Category");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleOptionSelect = (option: string) => {
    setSelectedCategory(option);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }

    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setSuggestions([]);
    }
  };

  const [searchProduct] = useSearchProductsMutation();

  const performSearch = async () => {
    const res = await searchProduct({
      searchTerm: searchTerm,
      categoryId: selectedCategoryId,
    });
    if (res.data) {
      setSuggestions(res.data.products);
    }

    return res;
  };

  const handleSearch = async () => {
    const res = await performSearch();
    nav("/results-search", {
      state: { products: res?.data?.products },
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      performSearch(); // Call search without navigating
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const { data: categoryData } = useGetAllCategoriesQuery({});
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
            {categoryData.categories.map((cat) => (
              <button
                onClick={() => {
                  handleOptionSelect(cat.categoryName);
                  setSelectedCategoryId(cat.categoryId);
                }}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none text-left"
              >
                {cat.categoryName}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="relative w-full sm:w-[350px]">
        <input
          className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white  shadow-lg"
          >
            {suggestions.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none text-left dark:text-white dark:hover:bg-gray-800 dark:bg-gray-700"
              >
                {product.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      <button
        disabled={!searchTerm || selectedCategory === "Choose Category"}
        onClick={handleSearch}
        className={`bg-blue-500 text-white rounded-md px-4 py-2  focus:outline-none ${
          !searchTerm || selectedCategory === "Choose Category"
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600"
        }`}
      >
        Search
      </button>
    </div>
  );
};

export default HeaderSearch;
