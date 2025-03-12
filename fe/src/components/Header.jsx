import React, { useState, useEffect } from "react";
import logo from "../assets/images/j97.png";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY < lastScrollY); // Ẩn khi cuộn xuống, hiện khi cuộn lên
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-white text-white h-[100px] flex items-center justify-between px-6 shadow-md z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* LOGO */}
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-16" />
      </div>

      {/* NAVIGATION */}
      <nav className="flex justify-center flex-grow space-x-16 font-semibold">
        <a 
          href="/adidas" 
          className="relative text-black text-xl cursor-pointer transition-all duration-300 
          hover:text-black after:content-[''] after:absolute after:left-0 after:bottom-0 
          after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 
          hover:after:w-full"
        >
          Adidas
        </a>
        <a 
          href="/nike" 
          className="relative text-black text-xl cursor-pointer transition-all duration-300 
          hover:text-black after:content-[''] after:absolute after:left-0 after:bottom-0 
          after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 
          hover:after:w-full"
        >
          Nike
        </a>
        <a 
          href="/vans" 
          className="relative text-black text-xl cursor-pointer transition-all duration-300 
          hover:text-black after:content-[''] after:absolute after:left-0 after:bottom-0 
          after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 
          hover:after:w-full"
        >
          Vans
        </a>
      </nav>

      {/* SEARCH AND BUTTON GROUP */}
      <div className="flex items-center space-x-6">
        {/* SEARCH BAR */}
        <div className="relative w-[250px] max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="p-3 text-black rounded-3xl focus:ring-0 focus:outline-none hover:bg-gray-300 focus:bg-gray-300 transition-colors duration-300 pl-10 w-full"
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* BUTTON GROUP (Account, Cart) */}
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 p-2 text-black hover:bg-gray-300 hover:text-white rounded-md transition-colors duration-300">
            <FaUserCircle className="text-2xl" />
            <span>Account</span>
          </button>

          <button className="flex items-center space-x-2 p-2 text-black hover:bg-gray-300 hover:text-white rounded-md transition-colors duration-300">
            <FaShoppingCart className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
