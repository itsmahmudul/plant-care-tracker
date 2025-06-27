import { useContext } from 'react';
import { Outlet } from 'react-router';
import DashboardNavbar from '../Components/UI/DashboardNavbar';
import AuthContext from '../Context/AuthContext';

const DashboardLayout = () => {
  const { darkMode } = useContext(AuthContext);

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <DashboardNavbar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
