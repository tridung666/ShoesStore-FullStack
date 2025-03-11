import React from 'react';
import logo from '../assets/images/j97.png';
import { FiSearch } from 'react-icons/fi';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  return (
    <div className='flex bg-white text-white h-[100px] items-center justify-between px-6'> 

        {/* LOGO */}
        <div className='flex items-center space-x-2'>
            <img src={logo} alt="logo" className="h-100" /> 
        </div>

        {/* NAVIGATION */}
        <nav className="flex ml-8 space-x-[200px] font-semibold pl-24">
            <a href="#" className="relative text-black text-3xl 
              after:content-[''] after:absolute after:left-0 after:bottom-0 
              after:w-0 after:h-[2px] after:bg-black after:transition-all 
              hover:after:w-full hover:after:scale-x-100">
              Adidas
            </a>
            <a href="#" className="relative text-black text-3xl 
              after:content-[''] after:absolute after:left-0 after:bottom-0 
              after:w-0 after:h-[2px] after:bg-black after:transition-all 
              hover:after:w-full hover:after:scale-x-100">
              Nike
            </a>
            <a href="#" className="relative text-black text-3xl 
              after:content-[''] after:absolute after:left-0 after:bottom-0 
              after:w-0 after:h-[2px] after:bg-black after:transition-all 
              hover:after:w-full hover:after:scale-x-100">
              Vans
            </a>
        </nav>

        {/* SEARCH AND BUTTON GROUP */}
        <div className="flex items-center space-x-6 " >
          {/* SEARCH BAR */}
          <div className="relative w-[250px] max-w-xs">
            <input 
              type="text" 
              placeholder="Search" 
              className="p-3 text-black rounded-3xl focus:ring-0 focus:outline-none hover:bg-gray-300 focus:bg-gray-300 transition-colors duration-300 pl-10 w-full" 
            />
            {/* Kính lúp icon */}
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* BUTTON GROUP (Account, Cart) */}
          <div className="flex space-x-4">
            {/* Account Button */}
            <button className="flex items-center space-x-2 p-2 text-black hover:bg-gray-300 hover:text-white rounded-md transition-colors duration-300">
              <FaUserCircle className="text-2xl" /> 
              <span>Account</span>
            </button>

            {/* Cart Button */}
            <button className="flex items-center space-x-2 p-2 text-black hover:bg-gray-300 hover:text-white rounded-md transition-colors duration-300">
              <FaShoppingCart className="text-2xl" />
              {/* <span>Cart</span> */}
            </button>
          </div>
        </div>
    </div>
  );
}

export default Header;
