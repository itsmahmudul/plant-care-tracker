import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-green-900 text-white shadow-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">

                {/* Logo */}
                <Link to='/'>
                    <div className="text-2xl font-bold flex items-center">
                        <span className="text-3xl mr-2">🌿</span> Plant Care Tracker
                    </div>
                </Link>

                {/* Centered Navigation */}
                <ul className="hidden md:flex space-x-8 text-sm font-medium absolute left-1/2 transform -translate-x-1/2">
                    <NavLink to='/'>
                        <li className="hover:text-green-300 transition">Home</li>
                    </NavLink>
                    <NavLink to='/'>
                        <li className="hover:text-green-300 transition">All Plants</li>
                    </NavLink>
                    <NavLink to='/'>
                        <li className="hover:text-green-300 transition">Add Plant</li>
                    </NavLink>
                    <NavLink to='/'>
                        <li className="hover:text-green-300 transition">My Plants</li>
                    </NavLink>
                    <NavLink to='/'>
                        <li className="hover:text-green-300 transition">Register</li>
                    </NavLink>
                    <NavLink to='/'>
                        <li className="hover:text-green-300 transition">About</li>
                    </NavLink>
                </ul>

                {/* Right Aligned Login Button */}
                <div className="hidden md:flex">
                    <Link>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md transition cursor-pointer">
                            Login
                        </button>
                    </Link>
                </div>

                {/* Hamburger Icon for Mobile */}
                <button
                    className="md:hidden focus:outline-none cursor-pointer hover:text-green-200"
                    onClick={toggleMenu}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 space-y-3 text-sm font-medium">
                    <ul className="space-y-3">
                        <NavLink to='/'>
                            <li className="hover:text-green-300 transition">Home</li>
                        </NavLink>
                        <NavLink to='/'>
                            <li className="hover:text-green-300 transition">All Plants</li>
                        </NavLink>
                        <NavLink to='/'>
                            <li className="hover:text-green-300 transition">Add Plant</li>
                        </NavLink>
                        <NavLink to='/'>
                            <li className="hover:text-green-300 transition">My Plants</li>
                        </NavLink>
                        <NavLink to='/'>
                            <li className="hover:text-green-300 transition">Register</li>
                        </NavLink>
                        <NavLink to='/'>
                            <li className="hover:text-green-300 transition">About</li>
                        </NavLink>
                    </ul>
                    <button className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition">
                        Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
