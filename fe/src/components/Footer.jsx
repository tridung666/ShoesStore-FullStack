import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'; // Các biểu tượng mạng xã hội
import logo from '../assets/images/J97.png'; // Logo của trang web

const Footer = () => {
  return (
    <div className=" bg-gray-100 text-gray-700 py-6 h-[250px] mt-auto">

<div className="flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-20" />
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 text-xl">
          <a href="https://www.facebook.com/tran.tan.26047" className=" text-[30px] text-blue-600"><FaFacebook /></a>
          <a href="https://instagram.com" className=" text-[30px] text-pink-600"><FaInstagram /></a>
          <a href="https://twitter.com" className=" text-[30px] text-blue-400"><FaTwitter /></a>
          <a href="https://linkedin.com" className=" text-[30px] text-blue-700"><FaLinkedin /></a>
          <a href="https://youtube.com" className=" text-[30px] text-red-600"><FaYoutube /></a>
        </div>
      </div>


      <hr className="my-4 mx-auto border-black w-[95%] border-t-1 opacity-100" />

      {/* Footer Content */}
      <div className="flex justify-center items-center space-x-9">
        {/* Copyright */}
        <div className="text-sm">
          <span className='font-semibold text-[20px]'>Copyright © J97 Store</span>
        </div>

        {/* Links */}
        <div className="space-x-4 text-sm">
          <a href="#" className=" underline">Private Policies</a>
          <a href="#" className=" underline">Terms of Use</a>
          <a href="#" className=" underline">Cookie Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
