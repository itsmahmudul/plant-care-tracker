import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/UI/Footer';
import Navbar from '../Components/UI/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-116px)]'>
                <div className='min-h-screen-2xl mx-auto px-8 md:px-12 lg:px-16 xl:px-24'>
                    <Outlet />
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;