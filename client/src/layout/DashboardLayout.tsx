import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../dashboard/components/Sidebar';
import Navbar from '../dashboard/components/Navbar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex justify-between h-[100vh]">
      {/* Sidebar */}
      <div>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content (Outlet) */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-[82%]' : 'w-[95%]'}`}>
        <Navbar />
        <main className="py-[20px] px-[30px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
