import React from 'react';
import logo from '../../assets/logo.png';
const Logo = () => {
    return (
        <div className='flex items-end '>
            <img src={logo} alt="" />
            <h1 className='text-2xl font-bold -ms-2.5'>parcelFlow</h1>
        </div>
    );
};

export default Logo;