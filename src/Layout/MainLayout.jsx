import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/UI/Footer';
import Navbar from '../Components/UI/Navbar';
import AuthContext from '../Context/AuthContext';

const MainLayout = () => {

    const { darkMode } = useContext(AuthContext);

    return (
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"
        }`}>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-116px)]'>
                <div className=''>
                    <Outlet />
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;