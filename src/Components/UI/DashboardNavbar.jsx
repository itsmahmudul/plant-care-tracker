import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router';
import { LayoutDashboard, Leaf, User, Moon, Sun } from 'lucide-react';
import AuthContext from '../../Context/AuthContext';

const DashboardNavbar = () => {
    const { pathname } = useLocation();
    const { darkMode, toggleDarkMode } = useContext(AuthContext);

    const linkClass = (path) =>
        `px-4 py-2 rounded-lg transition ${
            pathname === path
                ? 'bg-green-600 text-white'
                : darkMode
                ? 'hover:bg-green-800 text-gray-300'
                : 'hover:bg-green-100 text-gray-700'
        }`;

    return (
        <div
            className={`shadow-md p-4 flex flex-col gap-2 md:min-h-screen md:w-64 
                ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-900'}`}
        >
            <NavLink to="/dashboard">
                <h2
                    className={`text-xl font-bold mb-4 cursor-pointer ${
                        darkMode ? 'text-green-300' : 'text-green-700'
                    }`}
                >
                    🌿 Plant Care Tracker
                </h2>
            </NavLink>

            {/* Dark mode toggle button */}
            <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className={`mb-4 flex items-center gap-2 px-4 py-2 rounded-lg transition 
                    ${
                        darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
            >
                {darkMode ? (
                    <>
                        <Sun size={18} />
                        Light Mode
                    </>
                ) : (
                    <>
                        <Moon size={18} />
                        Dark Mode
                    </>
                )}
            </button>

            <nav className="flex flex-col gap-2">
                <NavLink to="/dashboard" className={linkClass('/dashboard')}>
                    <LayoutDashboard size={18} className="inline mr-2" />
                    Overview
                </NavLink>
                <NavLink to="/dashboard/my-plants" className={linkClass('/dashboard/my-plants')}>
                    <Leaf size={18} className="inline mr-2" />
                    My Plants
                </NavLink>
                <NavLink to="/dashboard/my-profile" className={linkClass('/dashboard/my-profile')}>
                    <User size={18} className="inline mr-2" />
                    My Profile
                </NavLink>
            </nav>
        </div>
    );
};

export default DashboardNavbar;
