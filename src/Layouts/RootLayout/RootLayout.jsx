import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayout;