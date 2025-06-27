import React, { useContext, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import AuthContext from "../../Context/AuthContext";

const navItems = [
    { name: "Home", path: "/" },
    { name: "All Plants", path: "/all-plants" },
    { name: "Add Plant", path: "/add-plants" },
    { name: "Register", path: "/register" },
    { name: "Dashboard", path: "/dashboard"},
    { name: "About", path: "/about" },
];

const menuVariants = {
    hidden: { opacity: 0, height: 0, transition: { when: "afterChildren" } },
    visible: {
        opacity: 1,
        height: "auto",
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.15,
            duration: 0.3,
            ease: "easeOut",
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

const Navbar = () => {
    const { darkMode, toggleDarkMode, logOutUser, user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogOut = () => {
        logOutUser()
            .then(() => console.log('logOut successfully'))
            .catch(error => console.log(error));
    };

    return (
        <nav
            className={`${darkMode ? "bg-gray-900 text-white" : "bg-green-900 text-white"
                } shadow-md px-6 py-4 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">

                {/* Logo */}
                <Link to="/">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 10 }}
                        className="text-xl xl:text-2xl font-bold flex items-center cursor-pointer select-none"
                    >
                        <span className="text-3xl mr-2">🌿</span> Plant Care Tracker
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex space-x-8 lg:text-[10px] xl:text-sm font-medium absolute left-1/2 transform -translate-x-1/2">
                    {navItems.filter(item => {
                        if (item.name === "Register" && user) return false;
                        if (item.name === "My Plants" && !user) return false;
                        if (item.name === "Dashboard" && !user) return false;
                        return true;
                    })
                        .map(({ name, path }) => (
                            <NavLink
                                key={name}
                                to={path}
                                data-tooltip-id="navlink-tooltip"
                                data-tooltip-content={name}
                                className={({ isActive }) =>
                                    `relative px-2 py-1 hover:text-green-300 transition duration-200 ${isActive ? "text-green-300 font-semibold" : ""}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <li>{name}</li>
                                        <motion.div
                                            layoutId="underline"
                                            initial={false}
                                            animate={{ width: isActive ? "100%" : 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="absolute bottom-0 left-0 h-[2px] bg-green-300 rounded"
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}
                </ul>

                {/* Avatar + Dark Mode + Auth (Desktop) */}
                <div className="hidden lg:flex items-center space-x-4">
                    {user && (
                        <>
                            <Link
                                to="/dashboard/my-profile"
                                data-tooltip-id="avatar-tooltip"
                                data-tooltip-content={user.displayName || user.email || "User"}
                                className="avatar mr-3"
                            >
                                <motion.div whileHover={{ scale: 1.05 }} className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                    <img src={user.photoURL} alt="User Avatar" />
                                </motion.div>
                            </Link>
                            <ReactTooltip id="avatar-tooltip" place="bottom" type={darkMode ? "light" : "dark"} effect="solid" delayShow={150} />
                        </>
                    )}

                    <button
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                        className="p-2 cursor-pointer rounded-md hover:bg-green-700 transition"
                    >
                        <motion.div
                            key={darkMode ? "sun" : "moon"}
                            initial={{ rotate: 0, scale: 1 }}
                            animate={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                        >
                            {darkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} />}
                        </motion.div>
                    </button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogOut}
                        className="cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-green-700 hover:bg-green-600 text-white transition-all ease-out duration-300"
                    >
                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative">
                            {user ? "Log Out" : <Link to="/login">Login</Link>}
                        </span>
                    </motion.button>
                </div>

                {/* Hamburger Button */}
                <button
                    className="cursor-pointer lg:hidden focus:outline-none hover:text-green-300 transition"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <motion.div
                        key={isOpen ? "close" : "open"}
                        initial={{ rotate: 0, scale: 1 }}
                        animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.2 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </motion.div>
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                        className={`lg:hidden mt-4 overflow-hidden ${darkMode ? "bg-gray-900 text-white" : "bg-green-900 text-white"} rounded-lg shadow-lg border border-green-700`}
                    >
                        <ul className="flex flex-col space-y-2 px-4 pt-4 pb-2 text-base font-medium">
                            {navItems.map(({ name, path }) => (
                                <NavLink
                                    key={name}
                                    to={path}
                                    onClick={() => setIsOpen(false)}
                                    data-tooltip-id="navlink-tooltip"
                                    data-tooltip-content={name}
                                    className={({ isActive }) =>
                                        `block w-full px-3 py-2 rounded-md transition ${isActive
                                            ? "bg-green-700 text-green-200 font-semibold"
                                            : "hover:bg-green-800 hover:text-green-100"
                                        }`
                                    }
                                >
                                    <motion.li variants={itemVariants}>{name}</motion.li>
                                </NavLink>
                            ))}
                        </ul>

                        <hr className="border-green-700 mx-4 my-3" />

                        <div className="px-4 pb-4 space-y-3">
                            <div className="flex items-center justify-between">
                                {user && (
                                    <Link
                                        to="/my-profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center space-x-2"
                                    >
                                        <motion.div whileHover={{ scale: 1.05 }} className="w-10 h-10 rounded-full ring-2 ring-green-300 overflow-hidden">
                                            <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
                                        </motion.div>
                                        <span className="text-sm">{user.displayName || "My Profile"}</span>
                                    </Link>
                                )}

                                <button
                                    onClick={() => {
                                        toggleDarkMode();
                                        setIsOpen(false);
                                    }}
                                    aria-label="Toggle dark mode"
                                    className="p-2 rounded-md hover:bg-green-800 transition"
                                >
                                    <motion.div
                                        key={darkMode ? "sun-mobile" : "moon-mobile"}
                                        initial={{ rotate: 0, scale: 1 }}
                                        animate={{ rotate: 360, scale: 1.2 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {darkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} />}
                                    </motion.div>
                                </button>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    if (user) handleLogOut();
                                    setIsOpen(false);
                                }}
                                className="w-full text-center rounded-md bg-green-700 hover:bg-green-600 px-4 py-2 text-white transition"
                            >
                                {user ? "Log Out" : <Link to="/login">Login</Link>}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tooltips */}
            <ReactTooltip id="navlink-tooltip" place="bottom" type={darkMode ? "light" : "dark"} effect="solid" delayShow={150} />
        </nav>
    );
};

export default Navbar;
