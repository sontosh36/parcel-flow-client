import React from 'react';
import Logo from '../../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authImg from '../../assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto px-5'>
            <Logo/>
            <div className='flex items-center gap-8 py-10'>
                <div className='flex-1'>
                    <Outlet/>
                </div>
                <div className='flex-1 border bg-pink-100'>
                    <img src={authImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;