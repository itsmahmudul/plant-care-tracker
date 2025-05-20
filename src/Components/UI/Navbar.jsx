import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", path: "/" },
    { name: "All Plants", path: "/all-plants" },
    { name: "Add Plant", path: "/add-plants" },
    { name: "My Plants", path: "/my-plants" },
    { name: "Register", path: "/register" },
    { name: "About", path: "/about" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Animation variants for the mobile menu container
    const menuVariants = {
        hidden: { opacity: 0, height: 0, transition: { when: "afterChildren" } },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
                duration: 0.3,
            },
        },
    };

    // Animation variants for individual menu items
    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <nav className="bg-green-900 text-white shadow-md px-6 py-4 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">

                {/* Logo with hover scale */}
                <Link to="/">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
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
                                `hover:text-green-300 transition duration-200 ${isActive ? "text-green-300 font-semibold" : ""
                                }`
                            }
                        >
                            <li>{name}</li>
                        </NavLink>
                    ))}
                </ul>

                {/* Desktop Login */}
                <div className="hidden md:flex">
                    <Link to="/login">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md transition cursor-pointer"
                        >
                            Login
                        </motion.button>
                    </Link>
                </div>

                {/* Hamburger Button with rotation animation */}
                <button
                    className="md:hidden focus:outline-none hover:text-green-300 transition"
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

            {/* Mobile menu with AnimatePresence for mount/unmount animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                        className="md:hidden mt-4 overflow-hidden"
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

                        <div className="mt-4 px-4">
                            <Link to="/login">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
