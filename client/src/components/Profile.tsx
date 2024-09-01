import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUserQuery } from "../features/users/api/userSlice";
import Cookies from "universal-cookie";
import PopupInfo from "./PopupInfo";

const Profile = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cookie = new Cookies();
  const { pathname } = useLocation();
  const nav = useNavigate();

  const handleLogout = () => {
    cookie.remove("token");
    nav("/signin");
  };

  const { data: currentUser } = useCurrentUserQuery();

  return (
    <div className="relative cursor-pointer" ref={dropdownRef}>
      <div
        className={`${
          isDropdownOpen &&
          "border w-7 h-7 flex justify-center items-center rounded-full"
        } `}
      >
        <FontAwesomeIcon
          icon={faUser}
          className="text-gray-700 dark:text-gray-300"
          onClick={() => {
            toggleDropdown();
          }}
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 dark:bg-gray-700 ">
          <div
            onClick={togglePopup}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
          >
            Profile
          </div>
          {(currentUser?.user?.role === "admin" ||
            currentUser?.user?.role === "seller") && (
            <Link
              to={pathname.startsWith("/admin_page") ? "/" : "/admin_page"}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
            >
              {pathname.startsWith("/admin_page")
                ? "Go Website"
                : "Go Dashboard"}
            </Link>
          )}
          <div
            onClick={handleLogout}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
          >
            Logout
          </div>
        </div>
      )}

      {/* Popup Info */}
      {isPopupOpen && <PopupInfo setPopupOpen={setPopupOpen} />}
    </div>
  );
};

export default Profile;
