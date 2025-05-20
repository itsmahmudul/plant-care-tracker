import React, { useContext, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../../Context/AuthContext";

const navItems = [
    { name: "Home", path: "/" },
    { name: "All Plants", path: "/all-plants" },
    { name: "Add Plant", path: "/add-plants" },
    { name: "My Plants", path: "/my-plants" },
    { name: "Register", path: "/register" },
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
    const { darkMode, toggleDarkMode } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav
            className={`${darkMode ? "bg-gray-900 text-white" : "bg-green-900 text-white"
                } shadow-md px-6 py-4 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">
                {/* Logo with entrance animation and hover scale */}
                <Link to="/">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 10 }}
                        className="text-2xl font-bold flex items-center cursor-pointer select-none"
                    >
                        <span className="text-3xl mr-2">🌿</span> Plant Care Tracker
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex space-x-8 text-sm font-medium absolute left-1/2 transform -translate-x-1/2">
                    {navItems.map(({ name, path }) => (
                        <NavLink
                            key={name}
                            to={path}
                            className={({ isActive }) =>
                                `relative px-2 py-1 hover:text-green-300 transition duration-200 ${isActive ? "text-green-300 font-semibold" : ""
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <li>{name}</li>
                                    {/* Animated underline for active link */}
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

                {/* Desktop Login + Dark Mode Toggle */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Dark Mode Toggle Button */}
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
                            {darkMode ? (
                                <Sun size={20} className="text-yellow-300" />
                            ) : (
                                <Moon size={20} />
                            )}
                        </motion.div>
                    </button>

                    <Link to="/login">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(34,197,94,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md transition cursor-pointer"
                        >
                            Login
                        </motion.button>
                    </Link>
                </div>

                {/* Hamburger Button with rotation animation */}
                <button
                    className="cursor-pointer md:hidden focus:outline-none hover:text-green-300 transition"
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

            {/* Mobile menu with AnimatePresence */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                        className={`md:hidden mt-4 overflow-hidden ${darkMode ? "bg-gray-900 text-white" : "bg-green-900 text-white"
                            } rounded-md`}
                    >
                        <ul className="flex flex-col space-y-3 text-sm font-medium pt-2">
                            {navItems.map(({ name, path }) => (
                                <NavLink
                                    key={name}
                                    to={path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `px-4 py-2 hover:text-green-300 transition ${isActive ? "text-green-300 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <motion.li variants={itemVariants}>{name}</motion.li>
                                </NavLink>
                            ))}
                        </ul>

                        <div className="mt-4 px-4 flex justify-between items-center">
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(34,197,94,0.6)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                                >
                                    Login
                                </motion.button>
                            </Link>

                            {/* Dark Mode Toggle Mobile */}
                            <button
                                onClick={() => {
                                    toggleDarkMode();
                                    setIsOpen(false);
                                }}
                                aria-label="Toggle dark mode"
                                className="cursor-pointer ml-4 p-2 rounded-md hover:bg-green-700 transition"
                            >
                                <motion.div
                                    key={darkMode ? "sun-mobile" : "moon-mobile"}
                                    initial={{ rotate: 0, scale: 1 }}
                                    animate={{ rotate: 360, scale: 1.2 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {darkMode ? (
                                        <Sun size={20} className="text-yellow-300" />
                                    ) : (
                                        <Moon size={20} />
                                    )}
                                </motion.div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
