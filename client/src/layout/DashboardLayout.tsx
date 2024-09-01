import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/components/Sidebar";
import Navbar from "../dashboard/components/Navbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex justify-between h-full min-h-[100vh] dark:bg-thirdbgDark700">
      {/* Sidebar */}
      <div>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      {/* Main Content (Outlet) */}
      <div
        className={`transition-all duration-300 dark:bg-thirdbgDark700 ${
          isSidebarOpen ? "w-[85%] lg:w-[82%]" : "w-[90%] lg:w-[90%]"
        }`}
      >
        <Navbar />
        <main className="py-[20px] px-[30px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
