import { FC } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinksSidebar } from "./Links";
import { Link } from "react-router-dom";
import { useCurrentUserQuery } from "../../features/users/api/userSlice";

interface Tprops {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<Tprops> = ({ isSidebarOpen, toggleSidebar }) => {
  const { data: currentUser } = useCurrentUserQuery({});

  return (
    <aside
      className={`fixed h-[100vh] flex flex-col items-center pt-5 bg-mainBackground dark:bg-secbgDark800 transition-all duration-300 ${
        isSidebarOpen ? "w-[15%] lg:w-[18%]" : "w-[10%] lg:w-[10%]"
      }`}
    >
      {/* Links */}
      <div className="mt-16 flex flex-col items-center space-y-8">
        {LinksSidebar.map(
          (link, index) =>
            link.role.includes(currentUser?.user?.role) && (
              <Link
                to={link.link}
                key={index}
                className={`h-fit py-2 bg-white dark:text-mainTextDark dark:bg-thirdbgDark700 flex justify-center items-center rounded-lg transition-all duration-300 ${
                  isSidebarOpen ? "px-4 w-[50px] lg:w-[200px]" : "px-4 w-[30px]"
                }`}
              >
                <FontAwesomeIcon className="text-[13px]" icon={link.icon} />
                {isSidebarOpen && (
                  <span className="ml-2 hidden lg:block">{link.title}</span>
                )}
              </Link>
            )
        )}
      </div>
      {/* Toggle Button */}
      <div
        className="flex items-center justify-center w-[40px] mt-10 h-[40px] bg-white dark:text-mainTextDark dark:bg-thirdbgDark700 rounded-full cursor-pointer"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={isSidebarOpen ? faChevronLeft : faChevronRight}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
