import React from "react";
import logo from "../assets/images/J97.png";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full bg-white text-black h-[100px] flex items-center px-10 border-gray-200 shadow-md">
      {/* LOGO */}
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-16" />
      </div>

      {/* NAVIGATION - Dịch sang phải */}
      <nav className="flex flex-grow justify-center space-x-20 font-semibold ml-20">
        <a href="/adidas" className="text-black text-xl hover:text-gray-600 transition-all">
          Adidas
        </a>
        <a href="/nike" className="text-black text-xl hover:text-gray-600 transition-all">
          Nike
        </a>
        <a href="/vans" className="text-black text-xl hover:text-gray-600 transition-all">
          Vans
        </a>
      </nav>

      {/* SEARCH AND BUTTON GROUP */}
      <div className="flex items-center space-x-6">
        {/* SEARCH BAR */}
        <div className="relative w-[250px]">
          <input
            type="text"
            placeholder="Search"
            className="p-3 text-black border border-gray-300 rounded-3xl pl-10 w-full focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* BUTTON GROUP (Account, Cart) */}
        <div className="flex space-x-4">
        <Link
      to="/login"
      className="flex items-center space-x-2 p-2 text-black hover:text-gray-600 transition-all"
    >
      <FaUserCircle className="text-2xl" />
      <span>Account</span>
      </Link>

          <button className="flex items-center space-x-2 p-2 text-black hover:text-gray-600 transition-all">
            <FaShoppingCart className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
